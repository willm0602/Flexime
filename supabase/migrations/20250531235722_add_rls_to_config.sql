-- Ensure RLS is enabled (redundant if already done, but harmless)
ALTER TABLE public.configuration ENABLE ROW LEVEL SECURITY;

-- SELECT policy: allow users to read their own configurations
CREATE POLICY "Users can read their own configurations"
ON public.configuration
FOR SELECT
USING (
  auth.uid() = user_id
);

-- UPDATE policy: allow users to update their own configurations
CREATE POLICY "Users can update their own configurations"
ON public.configuration
FOR UPDATE
USING (
  auth.uid() = user_id
);

-- INSERT policy: allow users to insert configurations with their own user_id
CREATE POLICY "Users can insert their own configurations"
ON public.configuration
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- DELETE policy: allow users to delete their own configurations
CREATE POLICY "Users can delete their own configurations"
ON public.configuration
FOR DELETE
USING (
  auth.uid() = user_id
);

-- Optional: Lock it down by removing overly permissive grants if needed
REVOKE ALL ON public.configuration FROM anon;
REVOKE ALL ON public.configuration FROM authenticated;

-- Optional: Re-grant only what is needed (you can skip this if using policies alone)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.configuration TO authenticated;
