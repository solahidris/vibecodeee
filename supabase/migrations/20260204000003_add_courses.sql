-- Create courses table (learning content)
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  lane TEXT NOT NULL,
  number INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  overview TEXT,
  outcomes TEXT[] DEFAULT '{}'::text[],
  exercises JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'courses'
      AND policyname = 'Authenticated users can view courses'
  ) THEN
    CREATE POLICY "Authenticated users can view courses"
      ON public.courses FOR SELECT
      USING (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'courses'
      AND policyname = 'Service role can manage courses'
  ) THEN
    CREATE POLICY "Service role can manage courses"
      ON public.courses FOR ALL
      USING (auth.jwt() ->> 'role' = 'service_role');
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS courses_lane_number_idx
  ON public.courses (lane, number);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'set_courses_updated_at'
  ) THEN
    CREATE TRIGGER set_courses_updated_at
      BEFORE UPDATE ON public.courses
      FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;
