# Sitewide SEO Plan

## The Architecture After Restructuring

Here's how the site is organized now. I spent some time cleaning this up — the blog moved from `/writing` to `/blogs`, broken links got fixed, and the navigation is finally consistent. This is the structure everything else in this system builds on.

```
/                           ← Homepage (digital marketing consultant)
├── /services               ← Services overview (digital marketing services)
│   ├── /services/seo       ← SEO & Content (seo consultant for small business)
│   ├── /services/paid-media ← Paid Media (google ads management for small business)
│   ├── /services/social-media ← Social Media (social media strategy)
│   └── /services/automation ← Automation (marketing automation for small business)
├── /blogs                  ← Blog hub (SEO blog, marketing articles)
│   └── /blogs/[slug]       ← Individual blog posts
├── /work                   ← Case studies hub
│   └── /work/[slug]        ← Individual case studies
├── /seo-tools              ← Free SEO audit tool
├── /about                  ← About page
├── /pricing                ← Pricing page
├── /contact                ← Contact form
├── /working-together       ← Process/engagement page
├── /testimonials           ← Client testimonials
├── /faq                    ← FAQ page
├── /newsletter             ← Newsletter signup
├── /lp/free-seo-audit      ← Landing page: Free SEO audit
├── /lp/book-a-call         ← Landing page: Book a call
├── /lp/marketing-services  ← Landing page: Marketing services
├── /privacy                ← Privacy policy
└── /terms                  ← Terms of service
```

## URL Slug Rules

This might seem like a small detail, but messy URLs compound into real problems. Here's what we're going with — keep it simple and keyword-forward.

| Page Type | Pattern | Example |
|-----------|---------|---------|
| Blog post | /blogs/{keyword-rich-slug} | /blogs/technical-seo-audit-checklist-service-businesses |
| Service page | /services/{service-name} | /services/seo |
| Sub-service page | /services/{sub-service} | /services/seo-audit (future) |
| Case study | /work/{slug} | /work/seo-growth |
| Landing page | /lp/{offer-slug} | /lp/free-seo-audit |

Rules:
- Lowercase with hyphens, always
- Keep slugs under 60 characters (shorter is better, honestly)
- Include the primary keyword in the slug
- No dates, IDs, or filler words in slugs — they just add noise
- No trailing slashes

## Page-Level SEO — How Each Page Should Be Optimized

This is the part that actually matters for rankings. Every page on the site needs an intentional H1, a thoughtful SEO title, and a meta description that makes someone want to click. I've gone through each page type and written what I think works best.

A note on the titles: Google sometimes rewrites them, especially if they're too long or don't match the query well. These are targets, not guarantees. But if we get them right, they'll stick more often than not.

### Homepage (/)
- **H1:** Digital Marketing Consultant for SEO, Ads, and Automation
- **SEO Title:** Digital Marketing Consultant in Dallas | SEO, Ads, Automation — Shree Krishna Gauli
- **Meta Description:** Hands-on digital marketing consultant specializing in SEO, Google Ads, social media, and n8n automation for small businesses and startups. Based in Dallas.
- **Primary Keyword:** digital marketing consultant
- **Secondary Keywords:** digital marketing services, marketing consultant dallas, SEO and ads specialist

### Services Overview (/services)
- **H1:** Digital Marketing Services
- **SEO Title:** Digital Marketing Services | SEO, Paid Media, Social, Automation — Shree Krishna Gauli
- **Meta Description:** Full-service digital marketing for small businesses and startups. SEO audits, Google Ads management, social media strategy, and marketing automation.
- **Primary Keyword:** digital marketing services
- **Secondary Keywords:** small business marketing services, marketing consultant services

### SEO & Content (/services/seo)
- **H1:** SEO Services for Small Businesses
- **SEO Title:** SEO Consultant for Small Business | Technical Audits, Content Strategy — Shree Krishna Gauli
- **Meta Description:** Expert SEO services including technical audits, keyword strategy, content marketing, and link building. Proven results for small businesses and startups.
- **Primary Keyword:** seo consultant for small business
- **Secondary Keywords:** seo services, technical seo audit, seo content writing service, small business seo

### Paid Media (/services/paid-media)
- **H1:** Google Ads & Paid Media Management
- **SEO Title:** Google Ads Management for Small Business | PPC & Meta Ads — Shree Krishna Gauli
- **Meta Description:** Results-driven Google Ads and Meta Ads management for small businesses. PPC audits, campaign optimization, and retargeting strategy.
- **Primary Keyword:** google ads management for small business
- **Secondary Keywords:** paid media specialist, ppc management, google ads consultant

### Social Media (/services/social-media)
- **H1:** Social Media Growth Services
- **SEO Title:** Social Media Strategy for Small Business | Content, Growth, Paid Social — Shree Krishna Gauli
- **Meta Description:** Strategic social media management for small businesses. Content calendars, community growth, paid social campaigns, and performance reporting.
- **Primary Keyword:** social media strategy for small business
- **Secondary Keywords:** social media management, social media marketing, social media for startups

### Automation (/services/automation)
- **H1:** Marketing Automation & Reporting
- **SEO Title:** Marketing Automation for Small Business | n8n, CRM, Dashboards — Shree Krishna Gauli
- **Meta Description:** Custom marketing automation using n8n workflows, CRM integration, and reporting dashboards. Save 20+ hours per week on marketing operations.
- **Primary Keyword:** marketing automation for small business
- **Secondary Keywords:** n8n automation, crm automation, marketing reporting dashboard

### Blog Hub (/blogs)
- **H1:** Blog
- **SEO Title:** Blog — SEO, Marketing, and Automation Insights | Shree Krishna Gauli
- **Meta Description:** Practical articles on SEO, Google Ads, social media strategy, and marketing automation for small businesses and startups.
- **Primary Keyword:** digital marketing blog
- **Secondary Keywords:** seo blog, marketing insights, automation articles

### Case Studies (/work)
- **H1:** Case Studies
- **SEO Title:** Case Studies | SEO, Paid Media, and Automation Results — Shree Krishna Gauli
- **Meta Description:** Real results from real clients. See how SEO strategies, Google Ads campaigns, and automation workflows delivered measurable growth.
- **Primary Keyword:** digital marketing case studies
- **Secondary Keywords:** seo case study, google ads case study, marketing automation results

### About (/about)
- **H1:** About Shree Krishna Gauli
- **SEO Title:** About — Digital Marketing Consultant in Dallas | Shree Krishna Gauli
- **Meta Description:** Digital marketing consultant based in Dallas specializing in SEO, paid media, and marketing automation for small businesses and startups.
- **Primary Keyword:** digital marketing consultant dallas
- **Secondary Keywords:** about shree krishna gauli, marketing specialist

### Pricing (/pricing)
- **H1:** Pricing
- **SEO Title:** Digital Marketing Pricing | Transparent Project Ranges — Shree Krishna Gauli
- **Meta Description:** Transparent pricing for SEO, Google Ads, social media, and automation services. See project ranges and find the right fit for your business.
- **Primary Keyword:** digital marketing pricing
- **Secondary Keywords:** seo pricing, google ads management cost, marketing consultant rates

### SEO Tools (/seo-tools)
- **H1:** Free SEO Audit Tool
- **SEO Title:** Free SEO Audit Tool | Check Your Website SEO Score — Shree Krishna Gauli
- **Meta Description:** Run a free SEO audit on your website. Get technical SEO scores, content analysis, and actionable recommendations in minutes.
- **Primary Keyword:** free seo audit tool
- **Secondary Keywords:** website seo checker, seo audit online, check website seo

---

## Internal Linking — The Glue That Holds It Together

I think most sites underinvest in internal linking, and this one is no exception. The structure below isn't complicated, but it needs to be consistent. Every time a new post goes up, it should link to existing content and existing content should link back. That bilateral linking is what tells Google these pages are related.

### How Links Should Flow

1. **Homepage** → links to all service pages, blog hub, case studies, free audit tool
2. **Service pages** → link to related blog posts (2–3 each), relevant case study, pricing, contact
3. **Blog posts** → link to relevant service page (1–2), related blog posts (2–3), case study if applicable, CTA to book a call or free audit
4. **Case studies** → link to relevant service page, blog posts on same topic, contact/book
5. **Blog hub** → links to individual posts (pagination), category filtering

### Required Internal Links Per Page Type

| Page Type | Min Internal Links | Must Link To |
|-----------|-------------------|--------------|
| Homepage | 8–10 | All service pages, blog hub, case studies hub, SEO tools, about |
| Service page | 5–7 | Related blogs (2–3), one case study, pricing, contact |
| Blog post | 4–6 | Relevant service page, 2–3 related blogs, case study if relevant |
| Case study | 4–5 | Relevant service page, 2 related blogs, contact |
| About page | 3–4 | Services, work, contact |
| Pricing page | 3–4 | Services, contact, working together |

### Anchor Text Guidelines

This is one of those things where people either overthink it or ignore it entirely. The goal is simple: use descriptive text that tells both the reader and Google what the linked page is about.

- Use descriptive, keyword-relevant anchor text — not "click here" or "read more"
- Vary the anchor text when linking to the same page from different posts
- Match the anchor text to the target page's primary keyword when it feels natural — but don't force it
- Example: link to /services/seo with anchor text like "SEO services for small businesses" or "our technical SEO audit approach"

---

## Schema Markup — What Google Sees Behind the Scenes

Schema doesn't directly boost rankings (Google has said this repeatedly), but it does affect how your pages appear in search results. FAQ rich snippets, star ratings, breadcrumb trails — those come from schema. And they do affect click-through rates, which absolutely matters.

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | Person, Organization, WebSite, SiteNavigationElement |
| Service pages | Service, FAQPage, BreadcrumbList |
| Blog posts | BlogPosting, BreadcrumbList (already implemented) |
| Case studies | Article or CaseStudy, BreadcrumbList |
| Blog hub | CollectionPage, BreadcrumbList |
| About | Person, BreadcrumbList |
| Pricing | PriceSpecification, FAQPage |
| FAQ | FAQPage |
| Testimonials | Review, AggregateRating |

---

## Technical SEO — The Foundation

Most of the technical basics are already in place, which is a relief. The site runs on Next.js, uses proper metadata helpers, generates a sitemap dynamically, and serves over HTTPS. But there are gaps, and some of them matter quite a bit.

- [x] Sitemap at /sitemap.xml (dynamic, auto-generated)
- [x] robots.txt configured
- [x] Canonical URLs set via createPageMetadata
- [x] OG and Twitter meta tags via createPageMetadata
- [ ] Breadcrumb schema on all pages (partially implemented)
- [ ] Service page schema (not yet implemented)
- [ ] FAQ schema on FAQ page and service pages
- [ ] Core Web Vitals optimization (monitor via GSC)
- [x] Mobile responsive (Next.js + Tailwind)
- [x] HTTPS enabled
- [ ] 301 redirects from /writing/* to /blogs/* (needed in next.config.ts)
- [ ] Image alt text audit across all pages
- [ ] Structured data testing via Google Rich Results Test

---

## Publishing Roadmap

I've broken this into phases because trying to do everything at once is a recipe for half-finished work. The first two months are about optimization — making what already exists as strong as possible. Then we expand.

### Month 1–2 (Foundation)
- Optimize existing 10 blog posts (refresh titles, meta, internal links)
- Publish 4 new blog posts from P1/P2 keywords
- Optimize all service page metadata
- Add schema to service and FAQ pages
- Set up 301 redirects for /writing → /blogs

### Month 3–4 (Expansion)
- Publish 6 new blog posts from P2/P3 keywords — focus on pillar content first
- Create at least 1 pillar post per topic cluster
- Build internal linking between new and existing content (this is the step people always skip)
- Monitor GSC for indexing and ranking changes — adjust keyword targets if something unexpected takes off

### Month 5–6 (Growth)
- Publish 6 new blog posts from P3/P4 keywords
- Refresh top-performing posts with updated data and improved examples
- Add comparison and proof-driven content (these tend to convert well)
- Evaluate sub-service page creation based on what the traffic data actually shows

### Ongoing
- 2–3 new blog posts per month (quality over volume — one great post beats three mediocre ones)
- Monthly content refresh on top 5 performing posts
- Quarterly keyword research update to catch new opportunities
- Continuous internal linking optimization — every new post should link to 2–3 existing ones, and vice versa

The temptation will always be to publish more, faster. Resist it. Google's guidance on helpful content is clear: they'd rather see 20 excellent posts than 100 thin ones. Every piece of content should pass a basic test — would you actually recommend this to a friend who asked about the topic? If not, it's not ready.
