import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kxdyortsnmfipetieabp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jTZpul47XMXS4afE1hWw9Q_To75vE2s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
