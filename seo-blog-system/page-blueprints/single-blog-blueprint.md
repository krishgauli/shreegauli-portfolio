# Single Blog Post Blueprint

This is the template for every individual blog post page. It's where the real SEO value lives — each post targets a specific keyword, demonstrates expertise, and funnels readers toward a relevant action. The structure below applies to every post, whether it's written manually or generated through the AI workflow.

## Page Details

| Field | Value |
|-------|-------|
| URL | /blogs/[slug] |
| Primary Keyword | Varies per post (defined in keyword matrix) |
| Secondary Keywords | Varies per post |
| Page Purpose | Rank for target keyword, demonstrate expertise, drive to services/CTA |
| Search Intent | Varies (informational, commercial investigation) |

## Recommended SEO Elements

| Element | Template |
|---------|----------|
| H1 | {Post title — keyword-optimized, max 70 chars} |
| SEO Title | {50–60 chars, primary keyword + modifier} — Shree Krishna Gauli |
| Meta Description | {150–160 chars, keyword + value proposition + implied CTA} |
| URL Slug | /blogs/{keyword-rich-slug} |
| Canonical | https://shreegauli.com/blogs/{slug} |

## Content Sections

Most of these components already exist in the codebase. The enhancements marked below are things that would genuinely improve engagement and SEO — they're not just nice-to-haves.

### 1. Breadcrumb
- **Format:** Home > Blog > {Post Title}
- **Schema:** BreadcrumbList
- **Currently:** Back link to /blogs exists; add full breadcrumb with schema

### 2. Post Header
- **Cover Image** (optional, 1200×630px)
- **H1:** Post title
- **Author, Date, Read Time, Category**
- **Currently implemented** in BlogPostBody.tsx

### 3. Table of Contents (Worth Adding for Longer Posts)
- Auto-generated from H2/H3 headings
- Sticky on desktop, collapsible on mobile
- Not yet implemented — but for posts over 1,500 words, it genuinely helps. People want to jump to the section that matters to them, and Google sometimes uses TOC links as sitelinks in search results.

### 4. Post Content
- **Structure:** H1 → Introduction → H2/H3 sections → Conclusion
- **Internal links:** 4–6 minimum (see internal-linking-plan.md)
- **Examples:** At least 2 practical examples per post
- **Formatting:** Bullet points, numbered lists, bold key terms, short paragraphs

### 5. Inline CTA
- **Placement:** After the most relevant section (usually section 3 or 4)
- **Format:** 1–2 sentences + link
- **Example:** "Need help with X? [Book a free strategy call →](/lp/book-a-call)"

### 6. End-of-Post CTA Block
- **Format:** Highlighted box with heading, one-liner, and button
- **Should match the post's service alignment**

### 7. Category & Tag Pills
- **Currently implemented:** Categories and tags display under the content
- **Action needed:** Ensure clickable tags link to filtered blog hub views in the future

### 8. Author Bio Card (Enhancement)
- **Content:** Name, photo, one-line bio, link to about page
- **Not yet implemented — recommended addition**

### 9. Related Posts
- **Component:** RelatedPosts.tsx (already exists, now links to /blogs/[slug])
- **Logic:** 2–3 posts from the same category
- **Current limitation:** Only shows if passed related posts from Prisma
- **Enhancement:** Auto-fetch related posts by category in the [slug]/page.tsx

### 10. Newsletter Signup (Optional)
- **Placement:** After related posts
- **Purpose:** Capture readers who engaged with the content
- **Component:** NewsletterSignupCard (already exists)

## Schema (Already Implemented)

The BlogPosting JSON-LD schema is generated in [slug]/page.tsx with:
- headline
- description
- url
- datePublished
- dateModified
- image
- author (Person)
- publisher (Person)

### Recommended Additions to Schema
- `mainEntityOfPage` — canonical URL
- `wordCount` — calculated from content length
- `keywords` — from post tags
- `articleSection` — from post category

## Internal Links (Required Per Post)

Every individual blog post must include:

| Link Type | Minimum Count | Example |
|-----------|---------------|---------|
| To relevant service page | 1 | /services/seo |
| To related blog posts | 2 | /blogs/related-topic |
| To relevant case study | 1 (if applicable) | /work/seo-growth |
| CTA link | 1 | /lp/book-a-call or /seo-tools |

## CTA Logic Per Post Type

| Post Category | Primary CTA | Secondary CTA |
|--------------|-------------|---------------|
| SEO | Free SEO Audit → /seo-tools | Book a Call → /lp/book-a-call |
| Paid Media | Book a Call → /lp/book-a-call | View Paid Media Results → /work/paid-media |
| Social Media | Book a Call → /lp/book-a-call | Newsletter signup |
| Automation | Book a Call → /lp/book-a-call | View Automation Case Study → /work/automation |
| Growth Strategy | Book a Call → /lp/book-a-call | View Services → /services |
| Lead Generation | Free SEO Audit → /seo-tools | Book a Call → /lp/book-a-call |
| Local SEO | Free SEO Audit → /seo-tools | Book a Call → /lp/book-a-call |

## What to Improve

These are roughly in order of impact:

1. **Add breadcrumb with schema** — visible breadcrumb + BreadcrumbList JSON-LD. This is low effort and high reward.
2. **Add table of contents** for longer posts — improves time on page and can generate featured sitelinks.
3. **Add author bio card** — name, photo, one-line bio. It's an E-E-A-T signal and it just looks more professional.
4. **Add social sharing buttons** — Twitter, LinkedIn, Copy Link. Keep it minimal.
5. **Add reading progress indicator** — a thin bar at the top of the page. Subtle, but it keeps people scrolling.
6. **Improve related posts logic** — right now it relies on manually passed posts. Auto-fetching by category from Prisma would be much more reliable.
7. **Show "last updated" date** — display `updatedAt` alongside `publishedAt`. Google cares about freshness, and so do readers.
8. **Optimize cover images** — WebP format, lazy loading, proper dimensions. This affects Core Web Vitals directly.
