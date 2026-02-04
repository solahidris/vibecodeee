-- Add course progress tracking for learning resources
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS course_progress JSONB DEFAULT '{}'::jsonb;

ALTER TABLE public.profiles
  ALTER COLUMN course_progress SET DEFAULT '{}'::jsonb;

UPDATE public.profiles
  SET course_progress = '{}'::jsonb
  WHERE course_progress IS NULL;

-- Allow users to create their own profile row (needed for upsert)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
