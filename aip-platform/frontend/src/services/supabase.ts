import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kxdyortsnmfipetieabp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4ZHlvcnRzbm1maXBldGllYWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MjgwODgsImV4cCI6MjA1NDAwNDA4OH0.ZrtK7P4bWwM0H9sE25H3B0b1FqW-kM4hYlM0_8S1s4I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
