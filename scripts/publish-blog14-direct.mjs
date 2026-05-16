#!/usr/bin/env node
/**
 * Publishes blog-14 directly using DIRECT_URL to bypass the flaky pgbouncer pooler.
 * Run: node scripts/publish-blog14-direct.mjs
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// 1. Manually load .env so we can swap DATABASE_URL -> DIRECT_URL before Prisma init
const envPath = resolve(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf8');

for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
  process.env[key] = val;
}

// 2. Load .env.local on top (won't have DATABASE_URL, but has other vars)
try {
  const localPath = resolve(process.cwd(), '.env.local');
  const localContent = readFileSync(localPath, 'utf8');
  for (const line of localContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = val;
  }
} catch {}

// 3. Override DATABASE_URL with DIRECT_URL to use direct postgres:5432 connection
if (process.env.DIRECT_URL) {
  console.log('[direct] Overriding DATABASE_URL with DIRECT_URL');
  process.env.DATABASE_URL = process.env.DIRECT_URL;
} else {
  console.log('[direct] No DIRECT_URL found, using DATABASE_URL as-is');
}

// 4. Now import Prisma + run the publish script's main logic inline for blog-14
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

const markdownPath = resolve(process.cwd(), 'blog-content/blog-14.md');
const markdown = readFileSync(markdownPath, 'utf8');

function parseField(md, label) {
  const m = md.match(new RegExp(`^\\*\\*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\*\\*\\s+(.+)$`, 'm'));
  return m ? m[1].trim() : '';
}

function cleanUrlSlug(v) { return v.replace(/`/g, '').replace(/^\/blogs\//, '').trim(); }

function extractBody(md) {
  const urlField = md.match(/^\*\*URL slug:\*\*.+$/m);
  if (!urlField) throw new Error('No URL slug field');
  const after = md.slice(urlField.index + urlField[0].length).trim();
  return after.split('\n## Internal Link Suggestions')[0].trim();
}

function htmlEscape(v) {
  return v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function inlineMarkdownToHtml(text) {
  return htmlEscape(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let paragraph = [], listType = null, listItems = [];
  const flushP = () => { if (!paragraph.length) return; const t = paragraph.join(' ').trim(); if (t) html.push(`<p>${inlineMarkdownToHtml(t)}</p>`); paragraph = []; };
  const flushL = () => { if (!listType || !listItems.length) return; html.push(`<${listType}>${listItems.map(i => `<li>${inlineMarkdownToHtml(i)}</li>`).join('')}</${listType}>`); listType = null; listItems = []; };
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { flushP(); flushL(); continue; }
    const h = line.match(/^(#{2,6})\s+(.+)$/);
    if (h) { flushP(); flushL(); const lvl = Math.min(6, Math.max(2, h[1].length)); html.push(`<h${lvl}>${inlineMarkdownToHtml(h[2])}</h${lvl}>`); continue; }
    const ul = line.match(/^-\s+(.+)$/);
    if (ul) { flushP(); if (listType && listType !== 'ul') flushL(); listType = 'ul'; listItems.push(ul[1]); continue; }
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ol) { flushP(); if (listType && listType !== 'ol') flushL(); listType = 'ol'; listItems.push(ol[1]); continue; }
    flushL(); paragraph.push(line);
  }
  flushP(); flushL();
  return html.join('\n');
}

const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
const seoTitle = parseField(markdown, 'SEO title');
const metaDesc = parseField(markdown, 'Meta description');
const slug = cleanUrlSlug(parseField(markdown, 'URL slug'));
const bodyMd = extractBody(markdown);
const htmlContent = markdownToHtml(bodyMd);
const excerpt = metaDesc || bodyMd.split(/\n\s*\n/).find(b => b.trim() && !b.trim().startsWith('## '))?.trim().slice(0, 220) || '';
const canonical = `https://shreegauli.com/blogs/${slug}`;
const coverImage = `/ai-visibility-evidence-problem-not-ranking.png`;
const coverImageAlt = `${title} cover image`;

// Copy the source image
import { copyFileSync, existsSync } from 'fs';
const srcImg = resolve(process.cwd(), 'public/uploads/blog-images/AI visibility is becoming an evidence problem, not just a ranking problem..png');
const destImg = resolve(process.cwd(), `public/ai-visibility-evidence-problem-not-ranking.png`);
if (existsSync(srcImg)) {
  copyFileSync(srcImg, destImg);
  console.log('[direct] Image copied to', coverImage);
} else {
  console.log('[direct] WARNING: source image not found at', srcImg);
}

const authorEmail = process.env.CONTACT_EMAIL_FROM || 'shreegauli30@gmail.com';
const author = await prisma.author.upsert({
  where: { email: authorEmail },
  update: { name: 'Shree Krishna Gauli', avatar: '/shree-gauli.png' },
  create: { name: 'Shree Krishna Gauli', email: authorEmail, avatar: '/shree-gauli.png' },
});

const category = await prisma.category.upsert({ where: { name: 'SEO' }, update: {}, create: { name: 'SEO' } });

const tagNames = ['aeo', 'geo', 'ai-visibility', 'evidence', 'content-strategy'];
const tags = [];
for (const name of tagNames) {
  tags.push(await prisma.tag.upsert({ where: { name }, update: {}, create: { name } }));
}

const existing = await prisma.post.findUnique({ where: { slug }, select: { id: true, publishedAt: true } });

const post = existing
  ? await prisma.post.update({
      where: { slug },
      data: { title, slug, excerpt, content: htmlContent, coverImage, coverImageAlt, seoTitle, metaDesc, canonical, publishedAt: existing.publishedAt, author: { connect: { id: author.id } }, categories: { set: [{ id: category.id }] }, tags: { set: tags.map(t => ({ id: t.id })) } },
    })
  : await prisma.post.create({
      data: { title, slug, excerpt, content: htmlContent, coverImage, coverImageAlt, seoTitle, metaDesc, canonical, publishedAt: new Date(), author: { connect: { id: author.id } }, categories: { connect: [{ id: category.id }] }, tags: { connect: tags.map(t => ({ id: t.id })) } },
    });

console.log(JSON.stringify({ id: post.id, slug: post.slug, title: post.title, coverImage: post.coverImage, publishedAt: post.publishedAt }, null, 2));
await prisma.$disconnect();
