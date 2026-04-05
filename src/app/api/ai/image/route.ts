import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateImage } from '@/lib/generate-image';
import { getAuthenticatedDbUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedDbUser(req);
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated. Please log in.' },
        { status: 401 }
      );
    }
    const userId = user.id;

    const body = await req.json();
    const { prompt, format } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Valid prompt is required' },
        { status: 400 }
      );
    }

    // Map format to DALL-E 3 size
    let size: '1792x1024' | '1024x1024' = '1024x1024';
    if (format === '16:9') {
      size = '1792x1024';
    }

    // Generate image using OpenAI DALL-E 3 (realistic style)
    const finalUrl = await generateImage(prompt, 'ai-image', { size });

    if (!finalUrl) {
      throw new Error('Image generation failed — no URL returned');
    }

    // Save to database
    const aiHistory = await prisma.aiHistory.create({
      data: {
        userId,
        generatorType: 'image',
        prompt,
        settings: { format, size },
        output: finalUrl,
      },
    });

    return NextResponse.json({
      success: true,
      imageUrl: finalUrl,
      historyId: aiHistory.id,
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate image',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
