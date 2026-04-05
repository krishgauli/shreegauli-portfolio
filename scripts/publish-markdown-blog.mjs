#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient();
const cwd = process.cwd();

function usage() {
  console.error(
    'Usage: node scripts/publish-markdown-blog.mjs <markdown-file> <source-image> <category> <comma-separated-tags>'
  );
}

function htmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inlineMarkdownToHtml(text) {
  return htmlEscape(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let paragraph = [];
  let listType = null;
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(' ').trim();
    if (text) {
      html.push(`<p>${inlineMarkdownToHtml(text)}</p>`);
    }
    paragraph = [];
  };

  const flushList = () => {
    if (!listType || !listItems.length) return;
    html.push(
      `<${listType}>${listItems
        .map((item) => `<li>${inlineMarkdownToHtml(item)}</li>`)
        .join('')}</${listType}>`
    );
    listType = null;
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{2,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(6, Math.max(2, heading[1].length));
      html.push(`<h${level}>${inlineMarkdownToHtml(heading[2])}</h${level}>`);
      continue;
    }

    const ul = line.match(/^-\s+(.+)$/);
    if (ul) {
      flushParagraph();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      listItems.push(ul[1]);
      continue;
    }

    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ol) {
      flushParagraph();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      listItems.push(ol[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return html.join('\n');
}

function parseField(markdown, label) {
  const match = markdown.match(
    new RegExp(`^\\*\\*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\*\\*\\s+(.+)$`, 'm')
  );
  return match ? match[1].trim() : '';
}

function cleanUrlSlug(value) {
  return value.replace(/`/g, '').replace(/^\/blogs\//, '').trim();
}

function extractBody(markdown) {
  const urlField = markdown.match(/^\*\*URL slug:\*\*.+$/m);
  if (!urlField) throw new Error('Could not find URL slug field.');

  const afterMeta = markdown.slice(urlField.index + urlField[0].length).trim();
  const withoutEditorial = afterMeta.split('\n## Internal Link Suggestions')[0].trim();
  return withoutEditorial;
}

function extractSection(markdown, heading) {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = markdown.match(
    new RegExp(`^##\\s+${escapedHeading}\\s*$([\\s\\S]*?)(?=^##\\s+|$)`, 'm')
  );

  return match ? match[1].trim() : '';
}

function titleCase(value) {
  return value
    .split(/[-_/]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function formatLinkLabelFromPath(href) {
  const cleanHref = href.replace(/\/$/, '');
  const segments = cleanHref.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'resource';

  if (lastSegment === 'seo') return 'SEO service';
  if (lastSegment === 'seo-tools') return 'Free SEO audit tool';
  if (lastSegment === 'book-a-call') return 'Book a strategy call';

  return titleCase(lastSegment);
}

function extractResourceLinks(markdown) {
  const section = extractSection(markdown, 'Internal Link Suggestions');
  if (!section) return [];

  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const href = line.match(/`([^`]+)`/)?.[1]?.trim();
      if (!href) return null;

      return {
        href,
        text: formatLinkLabelFromPath(href),
      };
    })
    .filter(Boolean);
}

function buildResourcesHtml(resources) {
  if (!resources.length) return '';

  return [
    '<h2>Helpful resources</h2>',
    `<ul>${resources
      .map((resource) => `<li><a href="${htmlEscape(resource.href)}">${inlineMarkdownToHtml(resource.text)}</a></li>`)
      .join('')}</ul>`,
  ].join('\n');
}

function firstParagraph(markdownBody) {
  const blocks = markdownBody.split(/\n\s*\n/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed || trimmed.startsWith('## ')) continue;
    return trimmed.replace(/\s+/g, ' ');
  }
  return '';
}

async function main() {
  const [, , markdownFile, sourceImage, categoryName, tagsCsv] = process.argv;

  if (!markdownFile || !sourceImage || !categoryName || !tagsCsv) {
    usage();
    process.exit(1);
  }

  const markdownPath = path.resolve(cwd, markdownFile);
  const sourceImagePath = path.resolve(cwd, 'public', sourceImage);

  if (!fs.existsSync(markdownPath)) {
    throw new Error(`Markdown file not found: ${markdownPath}`);
  }

  if (!fs.existsSync(sourceImagePath)) {
    throw new Error(`Source image not found: ${sourceImagePath}`);
  }

  const markdown = fs.readFileSync(markdownPath, 'utf8');
  const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const targetKeyword = parseField(markdown, 'Target keyword');
  const seoTitle = parseField(markdown, 'SEO title');
  const metaDesc = parseField(markdown, 'Meta description');
  const slug = cleanUrlSlug(parseField(markdown, 'URL slug'));

  if (!title || !slug) {
    throw new Error('Missing title or slug in markdown file.');
  }

  const imageExt = path.extname(sourceImagePath) || '.png';
  const imageFileName = `${slug}${imageExt.toLowerCase()}`;
  const destImagePath = path.resolve(cwd, 'public', imageFileName);
  fs.copyFileSync(sourceImagePath, destImagePath);

  const bodyMarkdown = extractBody(markdown);
  const resourceLinks = extractResourceLinks(markdown);
  const resourcesHtml = buildResourcesHtml(resourceLinks);
  const htmlContent = [markdownToHtml(bodyMarkdown), resourcesHtml].filter(Boolean).join('\n');
  const excerpt = metaDesc || firstParagraph(bodyMarkdown).slice(0, 220);
  const canonical = `https://shreegauli.com/blogs/${slug}`;
  const publishedAt = new Date();
  const coverImageAlt = `${title} cover image`;
  const tagNames = Array.from(
    new Set(
      tagsCsv
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  );

  const authorEmail = process.env.CONTACT_EMAIL_FROM || 'shreegauli30@gmail.com';
  const author = await prisma.author.upsert({
    where: { email: authorEmail },
    update: {
      name: 'Shree Krishna Gauli',
      avatar: '/shree-gauli.png',
    },
    create: {
      name: 'Shree Krishna Gauli',
      email: authorEmail,
      avatar: '/shree-gauli.png',
    },
  });

  const category = await prisma.category.upsert({
    where: { name: categoryName },
    update: {},
    create: { name: categoryName },
  });

  const tags = [];
  for (const tagName of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
    tags.push(tag);
  }

  const existing = await prisma.post.findUnique({
    where: { slug },
    select: { id: true, publishedAt: true },
  });

  const data = {
    title,
    slug,
    excerpt,
    content: htmlContent,
    coverImage: `/${imageFileName}`,
    coverImageAlt,
    seoTitle,
    metaDesc,
    canonical,
    publishedAt: existing?.publishedAt || publishedAt,
    author: { connect: { id: author.id } },
    categories: { set: [{ id: category.id }] },
    tags: { set: tags.map((tag) => ({ id: tag.id })) },
  };

  const post = existing
    ? await prisma.post.update({
        where: { slug },
        data,
      })
    : await prisma.post.create({
        data: {
          ...data,
          categories: { connect: [{ id: category.id }] },
          tags: { connect: tags.map((tag) => ({ id: tag.id })) },
        },
      });

  console.log(
    JSON.stringify(
      {
        id: post.id,
        slug: post.slug,
        title: post.title,
        coverImage: post.coverImage,
        publishedAt: post.publishedAt,
        targetKeyword,
      },
      null,
      2
    )
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
