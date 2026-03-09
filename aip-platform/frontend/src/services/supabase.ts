import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kxdyortsnmfipetieabp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4ZHlvcnRzbm1maXBldGllYWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MDExNjIsImV4cCI6MjA1NzA3NzE2Mn0.4fPFnkZBpbzLVTWDXD5_6LYD3e-mI4AGkfZvsQy9Omg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
