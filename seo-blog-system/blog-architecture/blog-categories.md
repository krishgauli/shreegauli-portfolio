# Blog Categories

## The Seven Categories

I went back and forth on how many categories to use. Too many and each one feels thin. Too few and you lose the ability to organize meaningfully. Seven felt right — each one maps to a service line or a clear audience need, and there's enough room to publish 5–10 posts per category without things getting sparse.

Every post gets exactly one primary category. No double-tagging. If a post touches on both SEO and automation, pick the one that better matches the searcher's intent and use tags for the secondary topic.

### Active Categories

| Category | Slug (Prisma) | Description | Service Alignment |
|----------|--------------|-------------|-------------------|
| SEO | seo | Technical SEO, on-page optimization, keyword strategy, content for SEO | /services/seo |
| Paid Media | paid-media | Google Ads, Meta Ads, PPC strategy, ad audits, retargeting | /services/paid-media |
| Social Media | social-media | Social strategy, content calendars, platform-specific tactics | /services/social-media |
| Automation | automation | n8n workflows, CRM automation, marketing ops, reporting | /services/automation |
| Growth Strategy | growth-strategy | Business growth, marketing planning, hiring decisions, scaling | /services (general) |
| Lead Generation | lead-generation | Lead magnets, funnels, conversion optimization, lead nurturing | Cross-service |
| Local SEO | local-seo | Google Business Profile, local rankings, service-area businesses | /services/seo |

### How Keywords Map to Categories

This table connects the keyword numbers from `top-100-keywords.md` back to each category. SEO dominates because that's where the most commercial-intent keywords live. Social Media has fewer entries, but each one still matters for topical coverage.

| Category | Keywords (from Top 100) | Target posts in 6 months |
|----------|-------------------------------|------------------------------|
| SEO | 1, 2, 15, 22, 28, 32, 36, 44, 47, 48, 55, 61, 64, 65, 72, 85, 86, 97 | 8–10 |
| Paid Media | 4, 7, 11, 16, 23, 26, 29, 33, 37, 45, 58, 63, 66, 81, 90, 96 | 7–9 |
| Automation | 6, 10, 13, 17, 21, 27, 40, 46, 59, 75, 79, 84, 92, 99 | 6–8 |
| Growth Strategy | 9, 14, 19, 20, 30, 43, 71, 73, 78, 89, 100 | 5–7 |
| Social Media | 12, 38, 42, 53, 60, 80, 83, 88, 93 | 4–6 |
| Lead Generation | 18, 31, 52, 62, 82, 94 | 4–5 |
| Local SEO | 5, 34, 39, 57, 69, 76, 77, 91, 95 | 4–6 |

---

## Setting Up the Categories

### What Already Exists

The Prisma schema has a `Category` model ready to go:
```prisma
model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[] @relation("PostCategories")
}
```

Posts have a many-to-many relationship with categories. The blog hub page displays the first category name on each article card.

### Seeding the Database

Run this once to create all seven categories:

```sql
INSERT INTO "Category" (name) VALUES
  ('SEO'),
  ('Paid Media'),
  ('Social Media'),
  ('Automation'),
  ('Growth Strategy'),
  ('Lead Generation'),
  ('Local SEO')
ON CONFLICT (name) DO NOTHING;
```

### Adding Filters to the Blog Hub

This is perhaps the single best UX improvement we could make to the blog page. Right now every post is shown in one flat list. Adding filter buttons would let visitors jump straight to the topic they care about.

```
[All] [SEO] [Paid Media] [Social Media] [Automation] [Growth Strategy] [Lead Generation] [Local SEO]
```

Implementation approach:
- Use query parameter: `/blogs?category=seo`
- Filter posts server-side in the `getArticles()` function
- Highlight active category button
- "All" shows all posts (default)

### Dedicated Category Pages? Not Yet.

I thought about creating `/blogs/category/[slug]` pages, but it's premature:
- The blog volume is too low to justify separate index pages
- Filter buttons on the hub page serve the same purpose
- Fewer pages means less thin content risk
- Can be added later when blog volume exceeds 50+ posts

If added later, create them as:
- `/blogs/category/seo` → filtered view of SEO posts
- Each with unique title, meta description, and schema (CollectionPage)

---

## Tags — The Granular Layer

### How They Work

Tags are more specific than categories. A post in the "SEO" category might be tagged with `technical-seo`, `small-business`, and `checklist`. They're useful for discovery and for the admin dashboard when you need to find posts on a specific sub-topic.

The Prisma schema already supports them:
```prisma
model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[] @relation("PostTags")
}
```

### Recommended Starting Tags

Use 3–5 per post. Don't go overboard — tags should be genuinely useful for filtering, not just keyword decoration.

| Tag | What it covers |
|-----|-------|
| google-ads | Posts about Google Ads specifically |
| meta-ads | Posts about Meta/Facebook Ads |
| n8n | Posts mentioning n8n workflows |
| keyword-research | Posts covering keyword research |
| technical-seo | Posts on technical SEO topics |
| content-marketing | Posts about content strategy |
| crm | Posts involving CRM tools or automation |
| analytics | Posts about tracking and reporting |
| small-business | Posts targeting small business audience |
| startup | Posts targeting startup audience |
| local-business | Posts targeting local service businesses |
| checklist | Posts in checklist format |
| comparison | Posts comparing tools or approaches |
| case-study | Posts linked to or featuring case studies |
| dallas | Posts with Dallas/DFW local angle |

Tags should not have their own pages unless blog volume grows significantly. They serve as metadata for discovery and filtering within the admin dashboard and potential on-page filtering in the future.
