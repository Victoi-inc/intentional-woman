-- Add phone for partner impact-preview contact block (run after initial partnership_leads migration).

alter table public.partnership_leads
  add column if not exists phone text;

comment on column public.partnership_leads.phone is 'Contact phone from partner intake form';
