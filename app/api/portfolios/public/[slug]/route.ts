import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/portfolios/public/[slug] - Get public portfolio by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('slug', slug)
      .eq('is_public', true)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Portfolio not found or not public' },
        { status: 404 }
      );
    }

    // Increment view count
    await supabase
      .from('portfolios')
      .update({ view_count: data.view_count + 1 })
      .eq('id', data.id);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching public portfolio:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
