import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim() || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.SUPABASE_ANON_KEY?.trim() || '';
  const isConfigured = Boolean(url && key);

  let maskedUrl: string | null = null;
  if (url) {
    try {
      const parsed = new URL(url);
      maskedUrl = `${parsed.protocol}//${parsed.hostname}`;
    } catch {
      maskedUrl = url.substring(0, 16) + '...';
    }
  }

  return {
    isConfigured,
    url: maskedUrl,
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAnonKey: Boolean(process.env.SUPABASE_ANON_KEY),
  };
}

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.SUPABASE_ANON_KEY?.trim();

  if (!url || !key) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseClient;
}

export const RECOMMENDED_SUPABASE_SCHEMA = `-- ==========================================
-- SUPABASE SCHEMA FOR YOUTUBE CONTENT ENGINE
-- Run this in your Supabase SQL Editor:
-- ==========================================

-- 1. Topics Table
CREATE TABLE IF NOT EXISTS public.content_topics (
  id TEXT PRIMARY KEY,
  working_title TEXT NOT NULL,
  category TEXT NOT NULL,
  hook TEXT NOT NULL,
  why_now TEXT,
  sanatan_concept TEXT,
  scripture_anchor TEXT,
  best_format TEXT,
  status TEXT DEFAULT 'idea',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Scripts & Dialogue Packages Table
CREATE TABLE IF NOT EXISTS public.content_scripts (
  id TEXT PRIMARY KEY,
  topic_title TEXT NOT NULL,
  category TEXT NOT NULL,
  full_dialogue JSONB,
  five_beat_framework JSONB,
  reel_cuts JSONB,
  editor_captions JSONB,
  cta_ladder JSONB,
  short_script JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Content Calendar Table
CREATE TABLE IF NOT EXISTS public.content_calendar (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  publish_date DATE,
  format TEXT,
  status TEXT DEFAULT 'planned',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Performance Feedback Logs Table (Closed-Loop Learning)
CREATE TABLE IF NOT EXISTS public.performance_feedback (
  id TEXT PRIMARY KEY,
  content_title TEXT NOT NULL,
  category TEXT NOT NULL,
  platform TEXT DEFAULT 'YouTube',
  format TEXT,
  publish_date DATE,
  logged_at DATE DEFAULT CURRENT_DATE,
  views INTEGER DEFAULT 0,
  ctr_percent NUMERIC DEFAULT 0,
  avg_watch_time_percent NUMERIC DEFAULT 0,
  saves INTEGER DEFAULT 0,
  consultation_clicks INTEGER DEFAULT 0,
  user_observations TEXT,
  user_notes TEXT,
  what_worked TEXT,
  what_failed TEXT,
  ai_learned_insights TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Learning Memory & Strategy State Table
CREATE TABLE IF NOT EXISTS public.learning_memory (
  id TEXT PRIMARY KEY DEFAULT 'current',
  total_analyzed INTEGER DEFAULT 0,
  top_performing_categories JSONB,
  hook_formula_effectiveness JSONB,
  seo_lessons JSONB,
  strategic_adjustments JSONB,
  feedback_summary TEXT,
  last_updated DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.content_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_memory ENABLE ROW LEVEL SECURITY;

-- Allow public read & write (adjust with Auth if you configure Supabase Auth)
CREATE POLICY IF NOT EXISTS "Allow all access to content_topics" ON public.content_topics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow all access to content_scripts" ON public.content_scripts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow all access to content_calendar" ON public.content_calendar FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow all access to performance_feedback" ON public.performance_feedback FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow all access to learning_memory" ON public.learning_memory FOR ALL USING (true) WITH CHECK (true);
`;
