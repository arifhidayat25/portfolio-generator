import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/portfolios - Get all portfolios for current user
export async function GET(request: Request) {
  try {
    // Get user from session (you'll need to implement session check)
    // For now, this is a placeholder - will integrate with NextAuth
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract user ID from token/session
    // This is simplified - you'll use NextAuth's getServerSession
    const userId = 'user-id-from-session'; // TODO: Get from NextAuth session

    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch portfolios' },
      { status: 500 }
    );
  }
}

// POST /api/portfolios - Create new portfolio
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Get user from session
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = 'user-id-from-session'; // TODO: Get from NextAuth session

    // Validate required fields
    if (!body.title || !body.full_name) {
      return NextResponse.json(
        { error: 'Title and full_name are required' },
        { status: 400 }
      );
    }

    // Generate unique slug from title
    const baseSlug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Prepare portfolio data
    const portfolioData = {
      user_id: userId,
      title: body.title,
      full_name: body.full_name,
      email: body.email || null,
      phone: body.phone || null,
      location: body.location || null,
      bio: body.bio || null,
      profile_image_url: body.profile_image_url || null,
      template_id: body.template_id || 'minimalist',
      is_public: body.is_public || false,
      slug: baseSlug,
      skills: body.skills || [],
      experiences: body.experiences || [],
      education: body.education || [],
      projects: body.projects || [],
      certifications: body.certifications || [],
      languages: body.languages || [],
      testimonials: body.testimonials || [],
      social_links: body.social_links || {},
    };

    const { data, error } = await supabase
      .from('portfolios')
      .insert(portfolioData)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating portfolio:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create portfolio' },
      { status: 500 }
    );
  }
}
