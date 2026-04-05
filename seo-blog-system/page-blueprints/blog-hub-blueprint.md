# Blog Hub Blueprint

The blog hub at `/blogs` is the front door for all the content work. It needs to be clean, fast, and easy to browse. Right now it works, but there are a few enhancements that would make it significantly better — mainly category filtering and pagination.

## Page Details

| Field | Value |
|-------|-------|
| URL | /blogs |
| Primary Keyword | digital marketing blog |
| Secondary Keywords | seo blog, marketing articles, marketing insights, automation blog |
| Page Purpose | Central index for all blog content, drive discovery, support internal linking |
| Search Intent | Informational / Navigational |

## Recommended SEO Elements

| Element | Value |
|---------|-------|
| H1 | Blog |
| SEO Title | Blog — SEO, Marketing, and Automation Insights \| Shree Krishna Gauli |
| Meta Description | Practical articles on SEO, Google Ads, social media strategy, and marketing automation for small businesses and startups. |
| URL Slug | /blogs |
| Canonical | https://shreegauli.com/blogs |

## Content Sections

The structure is straightforward. The key thing is making it easy for someone to find what they're looking for without clicking through multiple pages.

### 1. Header
- **H1:** Blog
- **Subtitle:** Practical takes on SEO, paid media, and marketing systems.
- **Context:** Clean header with no unnecessary decoration

### 2. Category Filter (This Would Be a Big Win)
- **Purpose:** Help visitors find posts by topic without scrolling through everything
- **Implementation:** Horizontal button row above the grid
- **Options:** All | SEO | Paid Media | Social Media | Automation | Growth Strategy | Lead Generation | Local SEO
- **Behavior:** Client-side filter using query parameter `/blogs?category=seo`
- **Why it matters:** Without filtering, the blog page becomes harder to use as the post count grows. This is probably the single highest-impact enhancement for UX.

### 3. Newsletter Signup Card
- **Purpose:** Email list growth
- **Placement:** Above the blog grid (already implemented)
- **Content:** "Get new articles first" — one-line signup

### 4. Blog Post Grid
- **Layout:** Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- **Card Contents:** Cover image, category label, title, excerpt, date, read time
- **Link Target:** /blogs/[slug]
- **Posts per page:** 12
- **Sort:** By publishedAt descending (newest first)

### 5. Pagination (Enhancement)
- **Implementation:** Server-side with `?page=2` parameter
- **UI:** Previous / Next buttons at bottom of grid
- **Trigger:** When total posts exceed 12

### 6. Final CTA Section
- **Purpose:** Catch visitors who browsed the full blog
- **Content:** "Want to apply these ideas to your business?" → Book a Strategy Call
- **Internal Links:** /lp/book-a-call

## Schema Suggestions

| Schema Type | Implementation |
|-------------|---------------|
| CollectionPage | Mark the page as a collection of blog posts |
| BreadcrumbList | Home > Blog |

## Internal Links (On This Page)

| Target | Context |
|--------|---------|
| /blogs/[slug] × 12+ | Each blog post card |
| /lp/book-a-call | Final CTA |
| /newsletter | Newsletter signup (already present) |

## CTA Suggestions

| CTA | Location | Target |
|-----|----------|--------|
| Subscribe to Newsletter | Newsletter card | Newsletter signup form |
| Book a Strategy Call | Final CTA | /lp/book-a-call |

## What to Improve

1. **Add category filtering** — this is the top priority. It helps UX and keeps people on the page longer.
2. **Add pagination** — right now it loads up to 30 posts at once, which is fine for now. But once you're past 12–15 posts, paginate for performance and SEO.
3. **Add a visible breadcrumb** — Home > Blog, both on the page and in schema.
4. **Metadata is already updated** — it says "Blog" instead of "Writing" now. That's done.
5. **Consider a featured post** — highlight the most recent or highest-performing post in a larger card at the top. It draws the eye.
6. **Create an RSS feed** — build `/blogs/feed.xml` for subscribers and syndication tools. It's a small lift with outsized benefits for content distribution.
