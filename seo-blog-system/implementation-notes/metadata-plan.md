# Metadata Plan

Metadata is one of those things that's boring but genuinely matters. A well-written title and description won't guarantee rankings, but a bad one will absolutely cost you clicks. This document covers every page type on the site — what the title and description should say, how Open Graph and Twitter cards should be set up, and the robots directives.

## How the Site Handles Metadata

The site uses a centralized metadata helper at `src/lib/seo.ts` via `createPageMetadata()`. The global `metadataBase` is set to `https://shreegauli.com` in `src/app/layout.tsx`. This is good — it means you have one place to manage the defaults.

---

## Title & Description Pattern

Every page follows this structure:
```
{Page-Specific Title} | Shree Krishna Gauli
```

The `| Shree Krishna Gauli` suffix is appended automatically by the layout metadata template.

---

## What Every Page Should Say

The tables below are the recommended titles and descriptions for every page type. I've kept the SEO titles under 60 characters and descriptions under 160 — Google truncates anything longer, and truncated titles look sloppy in search results.

### Core Pages

| Page | URL | SEO Title (50–60 chars) | Meta Description (150–160 chars) |
|------|-----|------------------------|--------------------------------|
| Home | / | Digital Marketing Expert — SEO, Ads & Automation | Shree Krishna Gauli helps businesses grow with SEO, paid media, social media, and marketing automation. Get a free strategy call today. |
| About | /about | About Shree Krishna Gauli — Digital Marketing Strategist | Learn about Shree Krishna Gauli's marketing expertise, approach, and proven track record in SEO, paid media, and automation. |
| Services Hub | /services | Digital Marketing Services — SEO, Ads, Social & Automation | Full-service digital marketing: SEO, Google Ads, social media management, and n8n automation. View our services and get started. |
| Blog Hub | /blogs | Blog — Digital Marketing Insights & SEO Tips | Expert insights on SEO, paid media, social media, and marketing automation. Practical guides and strategies for business growth. |
| Case Studies | /work | Marketing Case Studies — Proven Results | See real results: 340% organic growth, 4.8x ROAS, 20+ hours saved. View our digital marketing case studies. |
| Contact | /contact | Contact — Get a Free Marketing Consultation | Reach out for a free digital marketing consultation. Discuss SEO, paid media, automation, and growth strategies. |
| Testimonials | /testimonials | Client Testimonials — What Our Clients Say | Read what our clients say about our SEO, paid media, and automation services. Real reviews from real businesses. |
| Pricing | /pricing | Marketing Services Pricing — Transparent Plans | See our transparent pricing for SEO, paid media, social media management, and automation services. |
| FAQ | /faq | FAQ — Digital Marketing Questions Answered | Find answers to common questions about our SEO, paid advertising, social media, and automation services. |

### Service Pages

| Page | URL | SEO Title | Meta Description |
|------|-----|-----------|-----------------|
| SEO | /services/seo | SEO Services — Organic Traffic Growth Strategy | Comprehensive SEO services: technical audits, keyword research, on-page optimization, and link building. Grow organic traffic consistently. |
| Paid Media | /services/paid-media | Paid Media & Google Ads Management | Expert Google Ads and paid media management. Data-driven campaigns with proven 4.8x ROAS. Get your free PPC audit. |
| Social Media | /services/social-media | Social Media Marketing & Management | Professional social media management across all major platforms. Content strategy, scheduling, and community engagement. |
| Automation | /services/automation | Marketing Automation with n8n Workflows | Custom n8n marketing automation: lead nurture, appointment reminders, review collection, and more. Save 20+ hours per week. |

### Blog Posts (Template)

| Element | Template |
|---------|----------|
| SEO Title | {Primary keyword + modifier} — {category or brand} |
| Meta Description | {Keyword-rich summary of the post value proposition, 150–160 chars} |
| Example Title | How to Do a Technical SEO Audit in 2025 — Step-by-Step Guide |
| Example Description | Learn how to perform a comprehensive technical SEO audit. Cover crawlability, site speed, indexation, schema, and mobile optimization with this actionable guide. |

### Case Study Posts (Template)

| Element | Template |
|---------|----------|
| SEO Title | {Result} — {Service} Case Study |
| Meta Description | {How we achieved [result] through [approach]. See the full case study.} |

### Landing Pages

| Page | URL | SEO Title | Meta Description |
|------|-----|-----------|-----------------|
| Free SEO Audit | /lp/free-seo-audit | Free SEO Audit — Find What's Holding Your Site Back | Get a free, comprehensive SEO audit. Find technical issues, keyword gaps, and content opportunities. No commitment required. |
| Book a Call | /lp/book-a-call | Book a Free Strategy Call — Marketing Consultation | Schedule a free 30-minute marketing strategy call. Discuss SEO, paid media, automation, and growth plans. |
| Marketing Services | /lp/marketing-services | Digital Marketing Services — SEO, Ads, Social & Automation | Full-service digital marketing: SEO, Google Ads, social media management, and automation. Book a free consultation. |

---

## Open Graph & Social Sharing

When someone shares a page on LinkedIn or Twitter, the image and description that show up come from Open Graph tags. Getting these right makes a noticeable difference in click-through from social shares.

### Default OG Template
```typescript
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: 'https://shreegauli.com{path}',
  siteName: 'Shree Krishna Gauli',
  title: '{SEO Title}',
  description: '{Meta Description}',
  images: [
    {
      url: '/og-default.png',  // Create a default OG image
      width: 1200,
      height: 630,
      alt: '{Page title}'
    }
  ]
}
```

### Blog Post OG
```typescript
openGraph: {
  type: 'article',
  publishedTime: '{publishedAt}',
  modifiedTime: '{updatedAt}',
  authors: ['Shree Krishna Gauli'],
  tags: ['{tag1}', '{tag2}'],
  images: [{ url: '{coverImage or og-default}' }]
}
```

### Twitter Card
```typescript
twitter: {
  card: 'summary_large_image',
  title: '{SEO Title}',
  description: '{Meta Description}',
  images: ['{OG Image URL}'],
  creator: '@shreegauli'  // Update with actual handle
}
```

---

## Robots Directives

Most of the site should be indexed. The exceptions are admin pages, login/signup, and API routes (which don't serve HTML anyway).

| Page Type | Robots |
|-----------|--------|
| All core pages | index, follow |
| Blog posts | index, follow |
| Case studies | index, follow |
| Landing pages | index, follow (unless purely for ads) |
| Admin/dashboard | noindex, nofollow |
| Login/signup | noindex, nofollow |
| API routes | Not applicable (no HTML) |

---

## What Needs to Happen

This isn't a massive lift, but it does require some attention to detail:

- [ ] Audit all pages to make sure they use `createPageMetadata()` from `src/lib/seo.ts` — some pages might be setting metadata manually, which defeats the purpose of the centralized system
- [ ] Create a default OG image (1200×630px) with the brand's visual identity. This is the fallback when a page doesn't have its own image.
- [ ] Create page-specific OG images for the highest-traffic pages (homepage, services, case studies)
- [ ] Add Twitter card metadata — either in layout.tsx globally or per-page where it differs
- [ ] Make sure blog posts dynamically generate their OG titles and descriptions from the post data, not from a static fallback
- [ ] Verify every meta description is under 160 characters and every SEO title is under 60
- [ ] Add `alternates.canonical` to every page — this prevents duplicate content issues, especially for pages with query parameters
