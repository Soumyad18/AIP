-- Create extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

-- Reusable updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email citext UNIQUE NOT NULL,
  full_name text NULL,
  avatar_url text NULL,
  is_enterprise boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2. plans
CREATE TABLE IF NOT EXISTS plans (
  id text PRIMARY KEY,
  name text NOT NULL,
  analyses_quota_month int NOT NULL CHECK (analyses_quota_month >= 0),
  rewrites_quota_month int NOT NULL CHECK (rewrites_quota_month >= 0),
  seats_quota int NOT NULL CHECK (seats_quota >= 0),
  is_active boolean NOT NULL DEFAULT true
);

-- 3. workspaces
CREATE TABLE IF NOT EXISTS workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug citext UNIQUE NOT NULL,
  owner_user_id uuid NOT NULL REFERENCES profiles(id),
  logo_path text NULL,
  seat_limit int NOT NULL DEFAULT 1 CHECK (seat_limit > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS set_workspaces_updated_at ON workspaces;
CREATE TRIGGER set_workspaces_updated_at
BEFORE UPDATE ON workspaces
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 4. subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NULL REFERENCES profiles(id) ON DELETE CASCADE,
  workspace_id uuid NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  plan_id text NOT NULL REFERENCES plans(id),
  status text NOT NULL CHECK (status IN ('active', 'trialing', 'canceled', 'past_due')),
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT subscriptions_target_check CHECK (
    (user_id IS NOT NULL AND workspace_id IS NULL) OR 
    (user_id IS NULL AND workspace_id IS NOT NULL)
  )
);

DROP TRIGGER IF EXISTS set_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER set_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 5. workspace_members
CREATE TABLE IF NOT EXISTS workspace_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'suspended')),
  invited_by uuid NULL REFERENCES profiles(id),
  joined_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT workspace_members_workspace_user_key UNIQUE(workspace_id, user_id)
);

-- 6. resumes
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES profiles(id),
  workspace_id uuid NULL REFERENCES workspaces(id),
  original_file_name text NOT NULL,
  mime_type text NOT NULL,
  file_size_bytes int NOT NULL CHECK (file_size_bytes > 0),
  storage_bucket text NOT NULL,
  storage_path text NOT NULL,
  extracted_text text NULL,
  text_hash text NULL,
  parse_status text NOT NULL CHECK (parse_status IN ('parsed', 'failed')),
  parse_error text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL,
  CONSTRAINT resumes_storage_unique UNIQUE(storage_bucket, storage_path)
);

DROP TRIGGER IF EXISTS set_resumes_updated_at ON resumes;
CREATE TRIGGER set_resumes_updated_at
BEFORE UPDATE ON resumes
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 7. job_descriptions
CREATE TABLE IF NOT EXISTS job_descriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES profiles(id),
  workspace_id uuid NULL REFERENCES workspaces(id),
  title text NULL,
  company_name text NULL,
  content text NOT NULL,
  content_hash text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS set_job_descriptions_updated_at ON job_descriptions;
CREATE TRIGGER set_job_descriptions_updated_at
BEFORE UPDATE ON job_descriptions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 8. analyses
CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES profiles(id),
  workspace_id uuid NULL REFERENCES workspaces(id),
  resume_id uuid NOT NULL REFERENCES resumes(id),
  job_description_id uuid NOT NULL REFERENCES job_descriptions(id),
  score smallint NOT NULL CHECK (score BETWEEN 0 AND 100),
  total_keywords int NOT NULL CHECK (total_keywords >= 0),
  matched_count int NOT NULL CHECK (matched_count >= 0),
  missing_count int NOT NULL CHECK (missing_count >= 0),
  scoring_version text NOT NULL,
  status text NOT NULL CHECK (status IN ('completed', 'failed')),
  error_message text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL,
  CONSTRAINT analyses_keywords_check CHECK (matched_count + missing_count = total_keywords)
);

-- 9. analysis_keywords
CREATE TABLE IF NOT EXISTS analysis_keywords (
  id bigserial PRIMARY KEY,
  analysis_id uuid NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  keyword text NOT NULL,
  keyword_type text NOT NULL CHECK (keyword_type IN ('matched', 'missing')),
  keyword_rank int NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT analysis_keywords_unique UNIQUE(analysis_id, keyword, keyword_type)
);

-- 10. rewrite_runs
CREATE TABLE IF NOT EXISTS rewrite_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES profiles(id),
  workspace_id uuid NULL REFERENCES workspaces(id),
  model text NOT NULL,
  prompt_version text NOT NULL,
  optimized_text text NULL,
  status text NOT NULL CHECK (status IN ('completed', 'failed')),
  error_message text NULL,
  input_tokens int NULL,
  output_tokens int NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 11. templates
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  created_by uuid NULL REFERENCES profiles(id),
  name text NOT NULL,
  slug text NOT NULL,
  category text NULL,
  description text NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT templates_workspace_slug_unique UNIQUE(workspace_id, slug)
);

DROP TRIGGER IF EXISTS set_templates_updated_at ON templates;
CREATE TRIGGER set_templates_updated_at
BEFORE UPDATE ON templates
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 12. template_versions
CREATE TABLE IF NOT EXISTS template_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  version_number int NOT NULL CHECK (version_number > 0),
  engine_type text NOT NULL,
  engine_schema jsonb NOT NULL DEFAULT '{}'::jsonb,
  detected_variables text[] NOT NULL DEFAULT '{}',
  target_ats_score smallint NULL CHECK (target_ats_score BETWEEN 0 AND 100),
  created_by uuid NULL REFERENCES profiles(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT template_versions_unique UNIQUE(template_id, version_number)
);

-- 13. resume_outputs
CREATE TABLE IF NOT EXISTS resume_outputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES profiles(id),
  workspace_id uuid NULL REFERENCES workspaces(id),
  analysis_id uuid NULL REFERENCES analyses(id),
  template_version_id uuid NULL REFERENCES template_versions(id),
  input_context jsonb NOT NULL DEFAULT '{}'::jsonb,
  output_text text NULL,
  output_format text NOT NULL CHECK (output_format IN ('txt', 'pdf', 'docx')),
  status text NOT NULL CHECK (status IN ('completed', 'failed')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_analyses_owner_user_id_created_at ON analyses(owner_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analyses_workspace_id_created_at ON analyses(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_keywords_analysis_id_type ON analysis_keywords(analysis_id, keyword_type);
CREATE INDEX IF NOT EXISTS idx_resumes_owner_user_id_created_at ON resumes(owner_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rewrite_runs_analysis_id_created_at ON rewrite_runs(analysis_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_outputs_owner_user_id_created_at ON resume_outputs(owner_user_id, created_at DESC);

-- Seed Data (Upsert)
INSERT INTO plans (id, name, analyses_quota_month, rewrites_quota_month, seats_quota, is_active)
VALUES 
  ('starter', 'Starter', 3, 3, 1, true),
  ('pro', 'Pro', 100000, 100000, 1, true),
  ('enterprise', 'Enterprise', 1000000, 1000000, 25, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  analyses_quota_month = EXCLUDED.analyses_quota_month,
  rewrites_quota_month = EXCLUDED.rewrites_quota_month,
  seats_quota = EXCLUDED.seats_quota,
  is_active = EXCLUDED.is_active;

-- RLS Requirements
-- 1. Enable RLS on all public tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewrite_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_outputs ENABLE ROW LEVEL SECURITY;

-- 2. Helper SQL Functions
CREATE OR REPLACE FUNCTION is_workspace_member(p_workspace_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = p_workspace_id
      AND user_id = auth.uid()
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_workspace_admin(p_workspace_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = p_workspace_id
      AND user_id = auth.uid()
      AND status = 'active'
      AND role IN ('admin', 'owner')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Policies baseline

-- profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- plans
CREATE POLICY "Authenticated users can view plans" ON plans FOR SELECT TO authenticated USING (true);

-- workspaces
CREATE POLICY "Workspace owners can manage workspaces" ON workspaces
  FOR ALL USING (auth.uid() = owner_user_id) WITH CHECK (auth.uid() = owner_user_id);
CREATE POLICY "Workspace members can view workspaces" ON workspaces
  FOR SELECT USING (is_workspace_member(id));

-- workspace_members
CREATE POLICY "Workspace members can view members" ON workspace_members
  FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "Workspace admins can manage members" ON workspace_members
  FOR ALL USING (is_workspace_admin(workspace_id)) WITH CHECK (is_workspace_admin(workspace_id));

-- owner tables (resumes, job_descriptions, analyses, rewrite_runs, resume_outputs)

-- resumes
CREATE POLICY "Users can access own resumes" ON resumes
  FOR ALL USING (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)))
  WITH CHECK (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)));

-- job_descriptions
CREATE POLICY "Users can access own job_descriptions" ON job_descriptions
  FOR ALL USING (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)))
  WITH CHECK (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)));

-- analyses
CREATE POLICY "Users can access own analyses" ON analyses
  FOR ALL USING (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)))
  WITH CHECK (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)));

-- analysis_keywords
-- assuming accessed via analyses
CREATE POLICY "Users can access own analysis_keywords" ON analysis_keywords
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM analyses a
      WHERE a.id = analysis_keywords.analysis_id
      AND (a.owner_user_id = auth.uid() OR (a.workspace_id IS NOT NULL AND is_workspace_member(a.workspace_id)))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM analyses a
      WHERE a.id = analysis_keywords.analysis_id
      AND (a.owner_user_id = auth.uid() OR (a.workspace_id IS NOT NULL AND is_workspace_member(a.workspace_id)))
    )
  );

-- rewrite_runs
CREATE POLICY "Users can access own rewrite_runs" ON rewrite_runs
  FOR ALL USING (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)))
  WITH CHECK (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)));

-- resume_outputs
CREATE POLICY "Users can access own resume_outputs" ON resume_outputs
  FOR ALL USING (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)))
  WITH CHECK (owner_user_id = auth.uid() OR (workspace_id IS NOT NULL AND is_workspace_member(workspace_id)));

-- templates
CREATE POLICY "Users can view templates" ON templates
  FOR SELECT USING (workspace_id IS NULL OR is_workspace_member(workspace_id));
CREATE POLICY "Workspace admins can manage templates" ON templates
  FOR ALL USING (workspace_id IS NOT NULL AND is_workspace_admin(workspace_id)) 
  WITH CHECK (workspace_id IS NOT NULL AND is_workspace_admin(workspace_id));

-- template_versions
CREATE POLICY "Users can view template_versions" ON template_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM templates t
      WHERE t.id = template_versions.template_id
      AND (t.workspace_id IS NULL OR is_workspace_member(t.workspace_id))
    )
  );
CREATE POLICY "Workspace admins can manage template_versions" ON template_versions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM templates t
      WHERE t.id = template_versions.template_id
      AND (t.workspace_id IS NOT NULL AND is_workspace_admin(t.workspace_id))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM templates t
      WHERE t.id = template_versions.template_id
      AND (t.workspace_id IS NOT NULL AND is_workspace_admin(t.workspace_id))
    )
  );

-- subscriptions
CREATE POLICY "Users can view own or workspace subscriptions" ON subscriptions
  FOR SELECT USING (
    user_id = auth.uid() OR 
    (workspace_id IS NOT NULL AND is_workspace_admin(workspace_id))
  );
