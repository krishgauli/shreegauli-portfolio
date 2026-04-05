# Blog Structure Plan

## How the Blog Is Set Up

The blog lives at `/blogs` now — after renaming it from the old `/writing` path. It's a straightforward setup: one hub page that lists everything, and individual post pages at `/blogs/[slug]`.

```
/blogs                          ← Blog hub (paginated index)
/blogs/[slug]                   ← Individual blog post
```

### Where the Code Lives

Three files make up the blog system. Not complicated, which is good — it means less to break:
- **Blog hub:** `src/app/blogs/page.tsx`
- **Blog post:** `src/app/blogs/[slug]/page.tsx`
- **Blog post body:** `src/app/blogs/[slug]/BlogPostBody.tsx`

### Where the Posts Come From

There's a dual-source system here, which is a bit unusual but works well in practice:

1. **Prisma database** — the real CMS. Posts with full fields: title, slug, content, seoTitle, metaDesc, canonical, categories, tags, author, publishedAt. This is where new posts go.
2. **Static fallback** — `src/lib/blogs.ts` has 10 hardcoded posts. These serve as a safety net when the database is unavailable (early development, build time, etc.)

The blog hub fetches up to 30 posts from Prisma, falling back to static data if the database call fails. Individual post pages try Prisma first, then check the static array. It's not the most elegant approach, but it means the blog always renders even if Supabase is having a bad day.

### Slug Conventions

Slugs matter more than people think. A clean slug tells both the reader and Google what the page is about before they even click.

| Pattern | Example | When to use |
|-------------|---------|---------|
| {keyword-rich-descriptor} | technical-seo-audit-checklist-service-businesses | Standard blog post |
| {comparison-format} | seo-vs-google-ads-what-to-fix-first | Comparison post |
| {how-to-format} | how-to-do-google-ads-audit | How-to guide |
| {listicle-format} | best-marketing-automation-tools-2026 | Listicle/roundup |

Keep them:
- Lowercase, hyphen-separated
- Under 60 characters (though I'd aim for shorter — 40-50 is usually enough)
- Keyword-forward, but readable
- No dates (use updatedAt for freshness signals instead)
- No filler words unless they're needed for readability

---

## Blog Hub Page

### What's There Now

The hub at `/blogs` is clean. It shows:
1. Section header with "Blog" eyebrow
2. Newsletter signup card
3. Grid of article cards (responsive layout: 1 → 2 → 3 columns)

Nothing fancy, which is fine. But there's room to make it more useful.

### What I'd Add

These aren't all urgent, but they'd each improve the experience:

1. **Category filter buttons** at the top of the grid — so someone can jump straight to SEO posts or automation posts without scrolling through everything. Easy UX win.
2. **Featured/pinned post** — a larger card at the top for the most important or most recent piece. Draws the eye.
3. **Pagination** — once we have more than 12 posts, the page will get long. Load-more or page numbers.
4. **Simple search** — text search across titles and excerpts. Not essential yet but useful later.
5. **Breadcrumb** — Home > Blog. Small thing, helps with both navigation and schema.

### Pagination Implementation

The current page fetches up to 30 posts. For scalability:
- Show 12 posts per page
- Add `page` query parameter: `/blogs?page=2`
- Server-side pagination via Prisma `skip` and `take`
- Previous/Next navigation at bottom of grid

---

## Individual Blog Post Page

### What's There Now

The post page at `/blogs/[slug]` already has the essentials:
1. BlogPosting JSON-LD schema (auto-generated — nice)
2. Back link to blog hub
3. Cover image (if the post has one)
4. Title, author, date, read time
5. Category and tag pills
6. Full content body
7. Related posts section

That's a solid foundation honestly. The enhancements below would make it better, but what's here works.

### Things I'd Add Over Time

1. **Full breadcrumb** — Home > Blog > {Post Title}, with BreadcrumbList schema
2. **Table of contents** — auto-generated from H2/H3 headings, but only for posts over 1,500 words. For shorter posts it's unnecessary.
3. **Author bio card** — below the content. Helps E-E-A-T and just makes the page feel more credible.
4. **Share buttons** — Twitter, LinkedIn, Copy Link. Keep it minimal.
5. **End-of-post CTA block** — a clear, service-relevant call-to-action after the conclusion
6. **Better related posts** — the RelatedPosts component exists and works, but it could be smarter about pulling posts from the same category
7. **Reading progress bar** — a visual scroll indicator. Nice to have, not critical.

### Schema — What's Done and What's Missing

The BlogPosting schema is already generated in the `[slug]/page.tsx` file. It covers the basics: headline, description, url, dates, image, author, publisher.

But it's missing some fields that would strengthen the rich result:
- `mainEntityOfPage` — the canonical URL
- `wordCount` — easy to extract from the content
- `keywords` — from the post tags
- `articleSection` — from the post category

None of these are hard to add. Maybe 30 minutes of work.

---

## Content Types

Not every blog post should look the same. Different formats serve different purposes, and the word count and linking expectations change accordingly.

| Type | What it is | Words | Links | CTA |
|------|---------|-----------|----------------|-----------|
| Pillar Post | Comprehensive guide on a cluster topic | 2,000–3,000 | 6–8 (multiple clusters) | Service page + Book a Call |
| How-to Guide | Step-by-step practical instruction | 1,200–2,000 | 4–6 | Related service + Free Audit |
| Comparison Post | Side-by-side evaluation | 1,500–2,500 | 4–6 | Service page + Book a Call |
| Listicle | Curated list with commentary | 1,500–2,500 | 4–6 | Varies by topic |
| Problem-Solution | Identify problem, present solution | 1,200–1,800 | 4–5 | Service page + Book a Call |
| Checklist | Actionable checklist format | 1,000–1,500 | 3–5 | Free Audit + Service page |
| Case Study Companion | Blog post tied to a case study | 1,200–1,800 | 4–5 (must link study) | Book a Call |

---

## Post Template Structure

Regardless of the content type, every blog post follows this rough order. It's a template, not a straitjacket — sometimes a post needs the CTA earlier, or the table of contents doesn't make sense for a short checklist. Use judgment.

```
1. Breadcrumb (Home > Blog > Title)
2. Cover Image (optional)
3. Title (H1)
4. Author • Date • Read Time • Category
5. Table of Contents (if >1,500 words)
6. Introduction (2–3 paragraphs, state the problem/promise)
7. Body Sections (H2s and H3s)
   - Each section delivers specific value
   - Internal links woven naturally
   - Practical examples included
8. Conclusion (summary + next step)
9. Inline CTA (after most relevant section)
10. End-of-Post CTA Block
11. Author Bio Card
12. Related Posts (2–3)
13. Newsletter Signup
```

---

## What's Already Published

We're not starting from scratch. These 10 static posts form the initial blog archive, and most of them target keywords from the priority matrix. The next step is to optimize these — better titles, tighter meta descriptions, additional internal links — before creating a bunch of new content.

| Slug | Category | Primary Keyword |
|------|----------|----------------|
| 15-questions-hiring-marketing-agency | Growth Strategy | how to hire a digital marketing agency |
| n8n-workflows-production | Automation | n8n automation examples |
| attribution-problem-small-business-ads | Paid Media | attribution modeling for small business |
| seo-vs-google-ads-what-to-fix-first | Strategy | seo vs google ads which is better |
| technical-seo-audit-checklist-service-businesses | SEO | technical seo audit checklist |
| free-seo-audit-results-explained | SEO Tools | free seo audit results |
| local-seo-priorities-service-businesses | Local SEO | local seo for service businesses |
| freelancer-vs-agency-marketing | Hiring | freelancer vs agency for marketing |
| google-ads-audit-week-one | Paid Media | how to do a google ads audit |
| crm-automation-before-scaling-ad-spend | Automation | crm automation workflows |

### Where Blog Posts Show Up

Blog posts don't just live on the blog page. They surface in several places across the site, which is good for discovery:

1. `/blogs` hub page (the main index)
2. Homepage InsightsSection (top 3 featured posts)
3. Service pages (related blog links in content)
4. Related posts on individual blog pages
5. Sitemap (auto-generated — this just works)
6. Newsletter emails (when published, optionally)

### RSS Feed (Worth Adding)

An RSS feed at `/blogs/feed.xml` would be a nice addition for subscribers and syndication. It's a straightforward Next.js route handler that generates RSS XML from Prisma posts. Not urgent, but it's the kind of thing that takes an hour to build and creates a permanent distribution channel.
