import { supabase } from './supabaseClient';
import { authService } from './auth';

// Definisikan interface untuk tipe data baru
export interface SocialLinks {
  linkedin?: string;
  github?: string;
  website?: string;
  instagram?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Testimonial {
  name: string;
  title: string;
  content: string;
}

// Interface dasar (tetap sama)
export interface Experience {
  title: string
  company: string
  duration: string
  description: string
}

export interface Education {
  degree: string
  institution: string
  year: string
}

export interface Project {
  name: string
  description: string
  technologies: string
  link: string
}

// Perbarui Interface Portfolio sesuai skema database
export interface Portfolio {
  id: string
  user_id: string
  title: string
  full_name: string
  email: string
  phone?: string
  location?: string
  bio?: string
  profile_image_url?: string; // Baru
  skills: string[]
  experiences: Experience[]
  education: Education[]
  projects: Project[]
  social_links?: SocialLinks; // Baru
  certifications?: Certification[]; // Baru
  languages?: Language[]; // Baru
  testimonials?: Testimonial[]; // Baru
  template_id: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export const portfolioService = {
  async create(portfolioData: any): Promise<Portfolio> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const dataToInsert = {
      user_id: user.id,
      title: portfolioData.title || '',
      full_name: portfolioData.fullName || '',
      email: portfolioData.email || '',
      phone: portfolioData.phone || null,
      location: portfolioData.location || null,
      bio: portfolioData.bio || null,
      profile_image_url: portfolioData.profileImageUrl || null,
      skills: portfolioData.skills || [],
      experiences: portfolioData.experiences || [],
      education: portfolioData.education || [],
      projects: portfolioData.projects || [],
      social_links: portfolioData.socialLinks || null,
      certifications: portfolioData.certifications || [],
      languages: portfolioData.languages || [],
      testimonials: portfolioData.testimonials || [],
      template_id: portfolioData.templateId || 'minimalist',
      is_public: portfolioData.isPublic === true,
    };

    const { data, error } = await supabase
      .from('portfolios')
      .insert([dataToInsert])
      .select()
      .single();

    if (error) {
      console.error("Supabase create error:", error);
      throw error;
    }
    return data;
  },

  async getById(id: string): Promise<Portfolio | null> {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
        console.error("Supabase getById error:", error);
        throw error;
    };
    return data;
  },

  async update(id: string, portfolioData: any): Promise<Portfolio> {
    const dataToUpdate = {
      title: portfolioData.title,
      full_name: portfolioData.fullName,
      email: portfolioData.email,
      phone: portfolioData.phone,
      location: portfolioData.location,
      bio: portfolioData.bio,
      profile_image_url: portfolioData.profileImageUrl,
      skills: portfolioData.skills,
      experiences: portfolioData.experiences,
      education: portfolioData.education,
      projects: portfolioData.projects,
      social_links: portfolioData.socialLinks,
      certifications: portfolioData.certifications,
      languages: portfolioData.languages,
      testimonials: portfolioData.testimonials,
      template_id: portfolioData.templateId,
      is_public: portfolioData.isPublic,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('portfolios')
      .update(dataToUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getByUserId(userId: string): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },
};
