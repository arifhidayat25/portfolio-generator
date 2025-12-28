import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/portfolios/[id] - Get single portfolio
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

// PUT /api/portfolios/[id] - Update portfolio
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Get user from session
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = 'user-id-from-session'; // TODO: Get from NextAuth session

    // Check ownership
    const { data: existing } = await supabase
      .from('portfolios')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existing || existing.user_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Update portfolio
    const { data, error } = await supabase
      .from('portfolios')
      .update({
        title: body.title,
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        location: body.location,
        bio: body.bio,
        profile_image_url: body.profile_image_url,
        template_id: body.template_id,
        is_public: body.is_public,
        skills: body.skills,
        experiences: body.experiences,
        education: body.education,
        projects: body.projects,
        certifications: body.certifications,
        languages: body.languages,
        testimonials: body.testimonials,
        social_links: body.social_links,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}

// DELETE /api/portfolios/[id] - Delete portfolio
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get user from session
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = 'user-id-from-session'; // TODO: Get from NextAuth session

    // Check ownership
    const { data: existing } = await supabase
      .from('portfolios')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existing || existing.user_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Delete portfolio
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Portfolio deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete portfolio' },
      { status: 500 }
    );
  }
}
