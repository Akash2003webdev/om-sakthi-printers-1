import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Submit enquiry to Supabase
export async function submitEnquiry(data) {
  const { error } = await supabase
    .from('enquiries')
    .insert([{
      name: data.name,
      phone: data.phone,
      message: data.message,
      design_id: data.designId || null,
      created_at: new Date().toISOString(),
    }])
  
  if (error) throw error
  return true
}

/* 
── Supabase Schema (run in SQL editor) ──

create table enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  message text,
  design_id text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table enquiries enable row level security;

-- Allow inserts from anon
create policy "Allow anon insert" on enquiries
  for insert to anon with check (true);

-- Allow owner to read all
create policy "Owner can read" on enquiries
  for select using (auth.role() = 'authenticated');
*/
