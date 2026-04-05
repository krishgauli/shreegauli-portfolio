import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // allow up to 60s for crawling

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const CRON_SECRET = process.env.CRON_SECRET || '';
const EMBED_MODEL = 'text-embedding-3-small';
const BASE_URL = process.env.APP_URL || 'https://shreegauli.com';
const OUTPUT_DIR = join(process.cwd(), 'data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'knowledge-base.json');

interface CrawlChunk {
  id: string;
  url: string;
  title: string;
  section: string;
  content: string;
  checksum: string;
  crawledAt: string;
}

interface EmbeddingItem {
  index: number;
  embedding: number[];
}

interface EmbeddingResponse {
  data: EmbeddingItem[];
}

/* ─── Pages to crawl ─── */
const PAGES = [
  { path: '/', section: 'home', title: 'Homepage' },
  { path: '/about', section: 'about', title: 'About' },
  { path: '/services', section: 'services', title: 'Services Overview' },
  { path: '/services/seo', section: 'services', title: 'SEO Services' },
  { path: '/services/paid-media', section: 'services', title: 'Paid Media Services' },
  { path: '/services/social-media', section: 'services', title: 'Social Media Services' },
  { path: '/services/automation', section: 'services', title: 'Automation Services' },
  { path: '/work', section: 'work', title: 'Case Studies' },
  { path: '/work/seo-growth', section: 'work', title: 'SEO Growth Case Study' },
  { path: '/work/paid-media', section: 'work', title: 'Paid Media Case Study' },
  { path: '/work/automation', section: 'work', title: 'Automation Case Study' },
  { path: '/blogs', section: 'blogs', title: 'Blog' },
  { path: '/seo-tools', section: 'tools', title: 'SEO Tools' },
  { path: '/pricing', section: 'pricing', title: 'Pricing' },
  { path: '/working-together', section: 'company', title: 'Working Together' },
  { path: '/faq', section: 'company', title: 'FAQ' },
  { path: '/newsletter', section: 'company', title: 'Newsletter' },
  { path: '/testimonials', section: 'company', title: 'Testimonials' },
  { path: '/contact', section: 'contact', title: 'Contact' },
  { path: '/lp/free-seo-audit', section: 'landing-pages', title: 'Free SEO Audit Landing Page' },
  { path: '/lp/book-a-call', section: 'landing-pages', title: 'Book a Call Landing Page' },
  { path: '/lp/marketing-services', section: 'landing-pages', title: 'Marketing Services Landing Page' },
];

/* ─── Auth: admin JWT or CRON_SECRET ─── */
function isAuthorized(req: NextRequest): boolean {
  // Check CRON_SECRET header (for Vercel cron jobs)
  const cronHeader = req.headers.get('authorization');
  if (CRON_SECRET && cronHeader === `Bearer ${CRON_SECRET}`) return true;

  // Check admin cookie
  const token = req.cookies.get('auth_token')?.value;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload & { role?: string };
      return decoded.role === 'admin';
    } catch {
      return false;
    }
  }

  return false;
}

/* ─── HTML → Text ─── */
function htmlToText(html: string): string {
  let text = html;
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  text = text.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  text = text.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  text = text.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/?(p|div|h[1-6]|li|tr|section|article|blockquote)[^>]*>/gi, '\n');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/\n\s*\n/g, '\n\n');
  text = text.replace(/[ \t]+/g, ' ');
  text = text.split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
  return text.trim();
}

/* ─── Chunking ─── */
function chunkText(text: string, maxChars = 2400, overlap = 320): string[] {
  if (text.length <= maxChars) return [text];
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxChars;
    if (end < text.length) {
      const pb = text.lastIndexOf('\n\n', end);
      if (pb > start + maxChars / 2) end = pb;
      else {
        const sb = text.lastIndexOf('. ', end);
        if (sb > start + maxChars / 2) end = sb + 1;
      }
    }
    chunks.push(text.slice(start, end).trim());
    start = end - overlap;
    if (start >= text.length) break;
  }
  return chunks.filter((c) => c.length > 50);
}

/* ─── Batch Embed ─── */
async function getEmbeddings(texts: string[]): Promise<number[][]> {
  if (!OPENAI_API_KEY) return texts.map(() => new Array(1536).fill(0));
  const batchSize = 50;
  const all: number[][] = [];
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize).map((t) => t.slice(0, 8000));
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({ model: EMBED_MODEL, input: batch }),
    });
    if (!res.ok) throw new Error(`Embedding error: ${res.status}`);
    const data = (await res.json()) as EmbeddingResponse;
    const sorted = data.data.sort((a, b) => a.index - b.index);
    all.push(...sorted.map((d) => d.embedding));
  }
  return all;
}

/* ─── POST handler ─── */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results: { page: string; chunks: number }[] = [];
    const errors: string[] = [];
    const allChunks: CrawlChunk[] = [];

    for (const page of PAGES) {
      const url = `${BASE_URL}${page.path}`;
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'ShreeGauliCrawler/1.0', Accept: 'text/html' },
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) {
          errors.push(`${page.path}: HTTP ${res.status}`);
          continue;
        }
        const html = await res.text();
        const text = htmlToText(html);
        if (text.length < 50) {
          errors.push(`${page.path}: content too short`);
          continue;
        }
        const chunks = chunkText(text);
        for (const chunk of chunks) {
          allChunks.push({
            id: `${page.section}-${createHash('md5').update(chunk).digest('hex').slice(0, 8)}`,
            url: `${BASE_URL}${page.path}`,
            title: page.title,
            section: page.section,
            content: chunk,
            checksum: createHash('md5').update(chunk).digest('hex'),
            crawledAt: new Date().toISOString(),
          });
        }
        results.push({ page: page.path, chunks: chunks.length });
      } catch (err) {
        errors.push(`${page.path}: ${(err as Error).message}`);
      }
    }

    // Generate embeddings
    const textsToEmbed = allChunks.map((c) => `${c.title}\n${c.content}`);
    const embeddings = await getEmbeddings(textsToEmbed);
    const withEmbeddings = allChunks.map((c, i) => ({ ...c, embedding: embeddings[i] }));

    // Save
    if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
    const kb = {
      version: 1,
      crawledAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      totalChunks: withEmbeddings.length,
      chunks: withEmbeddings,
    };
    writeFileSync(OUTPUT_FILE, JSON.stringify(kb));

    return NextResponse.json({
      success: true,
      totalPages: results.length,
      totalChunks: withEmbeddings.length,
      pages: results,
      errors: errors.length > 0 ? errors : undefined,
      crawledAt: kb.crawledAt,
    });
  } catch (error) {
    console.error('[Crawl] Error:', error);
    return NextResponse.json(
      { error: 'Crawl failed', details: (error as Error).message },
      { status: 500 },
    );
  }
}
