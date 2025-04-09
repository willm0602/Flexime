-- Enable Row-Level Security if not already done
alter table "public"."userprofile" enable row level security;

-- Allow anyone to insert a userprofile
create policy "Allow any user to create a userprofile"
on public.userprofile
for insert
with check (true);  -- 'WITH CHECK' is used for INSERT, not USING

-- Allow authenticated users to insert their userprofile instances
create policy "Allow authenticated users to create a userprofile"
on public.userprofile
for insert
with check (user_id = auth.uid());  -- Ensures users can only insert their own profiles

-- Allow users to update their own userprofile instance
create policy "Allow users to update their userprofile"
on public.userprofile
for update
using (user_id = auth.uid());  -- 'USING' is correct for UPDATE

-- Allow users to view their own userprofile instance
create policy "Allow users to view their userprofile"
on public.userprofile
for select
using (user_id = auth.uid());  -- 'USING' is correct for SELECT
