# Homepage Blueprint

The homepage is doing a lot of heavy lifting — it has to establish credibility, showcase services, prove results, and convince someone to take action, all within a few seconds of scrolling. That's a tall order. This blueprint lays out what should be there, what's missing, and what to fix.

## Page Details

| Field | Value |
|-------|-------|
| URL | / |
| Primary Keyword | digital marketing consultant |
| Secondary Keywords | digital marketing services, marketing consultant dallas, SEO and ads specialist |
| Page Purpose | Establish credibility, showcase services and results, drive visitors to service pages, book calls, and free audit |
| Search Intent | Navigational + Commercial |

## Recommended SEO Elements

| Element | Value |
|---------|-------|
| H1 | Digital Marketing Consultant for SEO, Ads, and Automation |
| SEO Title | Digital Marketing Consultant in Dallas \| SEO, Ads, Automation — Shree Krishna Gauli |
| Meta Description | Hands-on digital marketing consultant specializing in SEO, Google Ads, social media, and n8n automation for small businesses and startups. Based in Dallas, TX. |
| URL Slug | / |
| Canonical | https://shreegauli.com/ |

## Content Sections — What's There and What Should Be

Most of these sections already exist in some form. The goal here isn't to rebuild the homepage from scratch — it's to sharpen what's there and fill in the gaps.

### 1. Hero Section
- **Purpose:** This is the first thing anyone sees — it needs to answer "what does this person do" and "why should I care" instantly
- **H1:** Digital Marketing Consultant for SEO, Ads, and Automation
- **Subtitle:** Data-driven marketing systems for small businesses and startups that want real growth, not reports.
- **Primary CTA:** Book a Strategy Call → /lp/book-a-call
- **Secondary CTA:** View Case Studies → /work
- **Internal Links:** /lp/book-a-call, /work

### 2. Trust Bar
- **Purpose:** Social proof signals
- **Content:** Client logos, metrics, or trust badges
- **No direct internal links required**

### 3. Featured Work Section
- **Purpose:** Prove results with case studies
- **Content:** Top 2–3 case studies with key metrics
- **Internal Links:** /work/seo-growth, /work/paid-media, /work/automation, /work

### 4. Services Section
- **Purpose:** Overview of all service lines
- **Content:** 4 service cards with brief descriptions
- **Internal Links:** /services/seo, /services/paid-media, /services/social-media, /services/automation, /services

### 5. Results Strip
- **Purpose:** Metrics-driven social proof
- **Content:** Key numbers (340% growth, 4.8x ROAS, 20+ hours saved)
- **No direct internal links required**

### 6. SEO Tool Promo Section
- **Purpose:** Lead generation via free tool
- **Content:** Promote the free SEO audit tool
- **Internal Links:** /seo-tools

### 7. About Preview
- **Purpose:** Build personal trust
- **Content:** Brief bio and photo
- **Internal Links:** /about

### 8. Insights Section (Blog Preview)
- **Purpose:** Show expertise, drive to blog
- **Content:** Top 3 featured blog posts
- **Internal Links:** /blogs, /blogs/[slug] × 3

### 9. Testimonials Section
- **Purpose:** Social proof from clients
- **Content:** Client quotes with names and results
- **Internal Links:** /testimonials (optional)

### 10. Final CTA Section
- **Purpose:** Capture visitors who scrolled through everything
- **Content:** Strong closing pitch
- **Internal Links:** /lp/book-a-call, /contact

## Schema Suggestions

| Schema Type | Implementation |
|-------------|---------------|
| Person | Already implemented in layout.tsx |
| Organization | Supplement Person schema with business details |
| WebSite | Add with search action (optional) |
| SiteNavigationElement | Add for main navigation links |

## CTA Suggestions

| CTA | Location | Target |
|-----|----------|--------|
| Book a Strategy Call | Hero, Final CTA | /lp/book-a-call |
| View Case Studies | Hero (secondary) | /work |
| Run Free SEO Audit | SEO Tool Promo | /seo-tools |
| Book a Call | Final CTA | /lp/book-a-call |

## What Actually Needs Fixing

These aren't hypothetical improvements — they're real issues I found during the audit.

1. **The Navbar is broken.** The homepage uses the legacy Navbar component with links pointing to pages that don't exist (/blog, /automation, /industries, /case-studies, /news, /book-a-demo). Swap it for the layout Navbar (`src/components/layout/Navbar.tsx`), which has the correct links. This is the highest-priority fix.
2. **There's no proper H1.** The page doesn't render an H1 tag with the target keyword. The HeroSection needs to output an actual `<h1>` element — this matters more than people think for ranking.
3. **Schema is incomplete.** Person schema exists, which is good. But Organization and WebSite schemas are missing. Adding them takes maybe 20 minutes.
4. **Services.tsx has a dead link.** It links to `/services/content-copywriting`, which doesn't exist. Either redirect it to `/services/seo` or remove it entirely.
5. **Blog links are fixed.** The InsightsSection now correctly points to `/blogs/` — this was done during the route rename.
