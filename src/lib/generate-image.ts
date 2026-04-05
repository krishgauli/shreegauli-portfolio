/**
 * Shared image generation utility using OpenAI DALL-E 3.
 *
 * Replaces the previous Replicate flux-schnell implementation.
 * Generates photorealistic images (style: "natural") and persists
 * them to Vercel Blob via `persistImage`.
 */

import OpenAI from 'openai';
import { persistImage } from '@/lib/persist-image';

type ImageCategory = 'blog' | 'news' | 'ai-image';

const STYLE_PRESETS: Record<ImageCategory, (title: string) => string> = {
  blog: (title) =>
    `Professional photorealistic editorial photograph for a healthcare marketing blog article about "${title}". Modern healthcare clinic interior or hospital corridor, realistic medical professionals in lab coats or scrubs, natural window light, shallow depth of field, authentic medical equipment visible. High-end editorial photography style similar to Harvard Business Review or JAMA. No cartoons, no digital art, no illustrated style, no text overlays, no logos, no watermarks.`,
  news: (title) =>
    `Professional photojournalistic photograph for a healthcare industry news article about "${title}". Hospital corridor, health policy conference, medical technology lab, or healthcare executives in discussion. Realistic people in authentic settings, natural documentary-style lighting, realistic skin tones. High-end photojournalism similar to Reuters Health or STAT News. No cartoons, no digital art, no illustrated style, no text overlays, no logos, no watermarks.`,
  'ai-image': (title) => title, // Pass-through — user provides the full prompt
};

/**
 * Generate + persist an image using OpenAI DALL-E 3.
 *
 * @param prompt   - The image prompt OR article title (category presets wrap titles)
 * @param category - 'blog' | 'news' | 'ai-image'
 * @param options  - Override size / quality if needed
 * @returns Permanent CDN URL, or null on failure
 */
export async function generateImage(
  prompt: string,
  category: ImageCategory = 'blog',
  options?: {
    size?: '1792x1024' | '1024x1024' | '1024x1792';
    quality?: 'standard' | 'hd';
  }
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not configured — skipping image generation');
    return null;
  }

  try {
    const openai = new OpenAI({ apiKey });

    // Build the final prompt from category presets (or use raw prompt for ai-image)
    const finalPrompt =
      category === 'ai-image'
        ? prompt
        : STYLE_PRESETS[category](prompt);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: finalPrompt,
      n: 1,
      size: options?.size ?? '1792x1024',   // Landscape — ideal for blog/news hero
      quality: options?.quality ?? 'standard',
      style: 'natural',                      // Realistic, not "vivid" / artistic
    });

    const tempUrl = response.data?.[0]?.url;
    if (!tempUrl) {
      console.error('DALL-E 3 returned no image URL');
      return null;
    }

    // Persist to Vercel Blob (DALL-E URLs also expire after ~1 hour)
    const permanentUrl = await persistImage(tempUrl, category);
    return permanentUrl;
  } catch (error) {
    console.error(`Image generation failed [${category}]:`, error);
    return null;
  }
}
