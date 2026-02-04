-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create resources table (member-only content)
CREATE TABLE public.resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  content_type TEXT CHECK (content_type IN ('article', 'video', 'tool', 'prompt')),
  url TEXT,
  icon TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on resources
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Resources policy - only authenticated users can view
CREATE POLICY "Authenticated users can view resources"
  ON public.resources FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admin policy for resources (if needed later)
CREATE POLICY "Service role can manage resources"
  ON public.resources FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Create bookmarks table (user favorites)
CREATE TABLE public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);

-- Enable RLS on bookmarks
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Bookmarks policies
CREATE POLICY "Users can view own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks"
  ON public.bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON public.bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for resources updated_at
CREATE TRIGGER set_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample resources data
INSERT INTO public.resources (title, description, category, content_type, icon, is_featured) VALUES
  ('Welcome to the Community', 'Getting started guide for new members', 'General', 'article', '👋', true),
  ('Best AI Prompts Collection', 'Curated collection of high-quality prompts', 'Best Prompts', 'article', '✨', true),
  ('Remote Job Opportunities', 'Latest remote job postings in tech', 'Job Posting', 'article', '💼', false),
  ('Fitness Challenge 2026', 'Join our community fitness challenge', 'Fitness', 'article', '💪', false),
  ('Community Guidelines', 'Important rules and guidelines', 'Announcements', 'article', '📢', true),
  ('AI Tools Directory', 'Comprehensive list of AI tools', 'Tools', 'tool', '🛠️', true),
  ('ChatGPT Tips & Tricks', 'Advanced tips for better results', 'Tips & Tricks', 'article', '💡', false),
  ('Latest AI News - January 2026', 'Monthly roundup of AI developments', 'AI News', 'article', '📰', false),
  ('Coding for Beginners', 'Start your coding journey', 'AI/Coding Beginner', 'article', '🤖', false),
  ('Career Development Resources', 'Resources for internal career growth', 'Internal Career', 'article', '📈', false);
