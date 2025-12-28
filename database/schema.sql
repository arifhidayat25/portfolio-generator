-- ============================================
-- PORTFOLIO GENERATOR DATABASE SCHEMA
-- ============================================
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PORTFOLIOS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  title VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(255),
  bio TEXT,
  profile_image_url TEXT,
  
  -- Template & Settings
  template_id VARCHAR(50) DEFAULT 'minimalist',
  is_public BOOLEAN DEFAULT false,
  slug VARCHAR(255) UNIQUE,
  
  -- JSON Fields for complex data
  skills JSONB DEFAULT '[]'::jsonb,
  experiences JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  languages JSONB DEFAULT '[]'::jsonb,
  testimonials JSONB DEFAULT '[]'::jsonb,
  social_links JSONB DEFAULT '{}'::jsonb,
  
  -- Metadata
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON public.portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_portfolios_is_public ON public.portfolios(is_public);
CREATE INDEX IF NOT EXISTS idx_portfolios_created_at ON public.portfolios(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own portfolios" ON public.portfolios;
DROP POLICY IF EXISTS "Users can insert own portfolios" ON public.portfolios;
DROP POLICY IF EXISTS "Users can update own portfolios" ON public.portfolios;
DROP POLICY IF EXISTS "Users can delete own portfolios" ON public.portfolios;
DROP POLICY IF EXISTS "Anyone can view public portfolios" ON public.portfolios;

-- Users can view their own portfolios
CREATE POLICY "Users can view own portfolios"
  ON public.portfolios
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own portfolios
CREATE POLICY "Users can insert own portfolios"
  ON public.portfolios
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own portfolios
CREATE POLICY "Users can update own portfolios"
  ON public.portfolios
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own portfolios
CREATE POLICY "Users can delete own portfolios"
  ON public.portfolios
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Everyone (including anonymous users) can view public portfolios
CREATE POLICY "Anyone can view public portfolios"
  ON public.portfolios
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- ============================================
-- TRIGGER: Update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_portfolios_updated_at ON public.portfolios;

CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON public.portfolios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- FUNCTION: Generate unique slug
-- ============================================
CREATE OR REPLACE FUNCTION generate_unique_slug(name TEXT, user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Create base slug from name
  base_slug := lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;
  
  -- Check if slug exists and append counter if needed
  WHILE EXISTS (SELECT 1 FROM public.portfolios WHERE slug = final_slug AND user_id != user_uuid) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$  LANGUAGE plpgsql;
