import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Mock client helper to prevent app crash without DB
const createSafeClient = (url: string | undefined, key: string | undefined, options: any = {}) => {
  if (url && key) {
    return createClient(url, key, options);
  }
  
  console.warn('⚠️ Supabase credentials not found. Using Mock Client (No-Op Mode).');
  
  // Recursive proxy to mock method chaining (e.g., .from().select().eq().single())
  const mockClient: any = new Proxy({}, {
    get: (_target, prop) => {
      // Return a resolved promise with null data/error for async calls
      if (['then', 'catch', 'finally'].includes(String(prop))) {
        return undefined; // Let it behave like a standard object until awaited? No, better:
      }
      
      return (...args: any[]) => {
        // Return object with data: null, error: null to simulate empty response
        // But some methods need to be chainable.
        // Simple strategy: Always return the proxy itself, but add a 'then' method behavior manually?
        
        // Actually, simplest is to return a Promise that resolves to { data: null, error: null }
        // BUT also has properties to continue chaining if not awaited.
        
        // Let's make a recursive proxy function that is also thenable.
        const chainableProxy: any = () => chainableProxy;
        
        // Make it awaitable to return empty result
        chainableProxy.then = (resolve: any) => resolve({ data: null, error: null });
        
        // Allow further chaining
        return new Proxy(chainableProxy, {
          get: (_t, p) => {
            if (p === 'then') return (resolve: any) => resolve({ data: null, error: null });
            return (..._a: any[]) => chainableProxy;
          }
        });
      };
    }
  });

  return mockClient;
};

// Supabase client for client-side operations
export const supabase = createSafeClient(supabaseUrl, supabaseAnonKey);

// Supabase admin client for server-side operations
export const supabaseAdmin = createSafeClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

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
