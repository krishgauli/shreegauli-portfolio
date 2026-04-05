import { revalidatePath } from 'next/cache';

/**
 * Revalidate sitemap and related pages after blog/news changes.
 * Call this from server-side API routes after create/update/delete operations.
 * 
 * @param type - 'blog' or 'news'
 * @param slug - Current slug (or new slug if changed). Can be null for deletes.
 * @param oldSlug - Previous slug if slug was changed. Used to revalidate old URL.
 */
export function revalidateSitemap(params: {
  type: 'blog' | 'news';
  slug?: string | null;
  oldSlug?: string | null;
}) {
  const { type, slug, oldSlug } = params;
  const detailBasePath = type === 'blog' ? '/blogs' : '/news';

  // Always revalidate sitemap and list pages
  revalidatePath('/sitemap.xml');
  revalidatePath('/');
  revalidatePath('/blogs');
  revalidatePath('/news');

  // Revalidate the specific post/article page (new slug)
  if (slug) {
    revalidatePath(`${detailBasePath}/${slug}`);
  }

  // If slug changed, revalidate the old URL too
  if (oldSlug && oldSlug !== slug) {
    revalidatePath(`${detailBasePath}/${oldSlug}`);
  }

  console.log(`[Sitemap] Revalidated: type=${type}, slug=${slug}, oldSlug=${oldSlug || 'none'}`);
}
