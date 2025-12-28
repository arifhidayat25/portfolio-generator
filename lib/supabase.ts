import { createClient } from '@supabase/supabase-js';

// Supabase client for client-side operations
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Supabase admin client for server-side operations (with service role key)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Helper types for database
export type Database = {
  public: {
    Tables: {
      portfolios: {
        Row: Portfolio;
        Insert: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};

// Portfolio type matching database schema
export interface Portfolio {
  id: string;
  user_id: string;
  title: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  profile_image_url: string | null;
  template_id: string;
  is_public: boolean;
  slug: string | null;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  testimonials: Testimonial[];
  social_links: SocialLinks;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// Supporting types
export interface Experience {
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  current?: boolean;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  year: string;
  description?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github_url?: string;
  image_url?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  text: string;
  image_url?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}
