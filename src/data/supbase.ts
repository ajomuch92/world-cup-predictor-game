import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase: SupabaseClient = createClient('https://klhagwcqkbbmetobxkfq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaGFnd2Nxa2JibWV0b2J4a2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ2MzQ3MTYsImV4cCI6MTk4MDIxMDcxNn0.MpY-jKhrFFbmxUePHpvnGS0yhmBVVqnS6nmrtsUdPBo');

export default supabase;