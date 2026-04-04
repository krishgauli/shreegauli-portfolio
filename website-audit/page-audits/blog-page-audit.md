# Blog / Writing Page Audit — shreegauli.com/writing

---

## Page Purpose

The blog is supposed to demonstrate expertise, drive organic traffic through longtail keywords, and give visitors a reason to return. For a digital marketing specialist, the blog should be proof that you practice what you preach.

---

## First Impression

The writing page shows three article cards in a clean grid layout. Each card has a title and a brief excerpt. The designs match the rest of the site — dark cards, clean typography, subtle hover animations.

But when I looked closer, the entire blog is a facade. Let me explain why.

---

## What Works

**The design of the cards is good.** Visually, the writing page looks like a real blog. The cards have appropriate hierarchy, hover states, and layout. If there were real posts behind them, this page would be fine as an index.

**The concept is right.** A freelance marketer with a blog is expected. It signals that you think about your craft, that you stay current, and that you can write.

---

## What Doesn't Work

**Articles are hardcoded.** The three articles are defined in `lib/data.ts` as a static array. They are not pulled from the database. The admin CMS that stores blog posts in Prisma is completely disconnected from this page.

**Two of three article links are dead.** Two articles have `href: "#"` — they go nowhere. The third may link to an external URL. That means two-thirds of the visible content on this page leads to nothing.

**No `/writing/[slug]` route exists.** There is no dynamic blog post page. Even if the articles had real URLs, there is no page to render an individual post. The route simply does not exist in the Next.js app directory.

**The CMS exists but has no public output.** The admin dashboard has a full blog management system: create, edit, publish, AI-assisted writing. There are seed scripts for blog posts. There are API endpoints for blog CRUD operations. Blog posts are stored in Prisma with titles, content, slugs, tags, featured images, and publish dates. All of this infrastructure is built — and none of it is connected to a public-facing page.

This is like building an entire kitchen and never opening the restaurant.

**No categories, tags, or search.** The three hardcoded cards have no categorization. No filtering. No search. For a real blog with dozens of posts, this would be a navigation problem. Right now it is moot because there are only three fake entries.

---

## Content Gaps

- Public blog post route (`/writing/[slug]`)
- Database-connected blog index page
- Actual published blog content (the CMS is empty or the content only lives in the admin)
- Categories and tags
- Search functionality
- Related posts
- Author info on posts
- Reading time estimates
- Social sharing buttons
- Newsletter signup CTA on blog pages
- RSS feed
- BlogPosting structured data

---

## Messaging Issues

The fact that a digital marketing specialist does not have a working blog is, frankly, a credibility problem. This is the equivalent of a personal trainer who does not exercise. A prospect evaluating Shree might check the blog to see how they think about SEO, content strategy, or paid media — and they will find three cards, two dead links, and no actual content.

---

## SEO Issues

**This is the single biggest SEO problem on the site.** Blog content is the primary mechanism for:
- Longtail keyword coverage
- Internal linking structures
- Topical authority building
- Fresh content signals
- Featured snippet opportunities
- Backlink attraction

Without a functioning blog, the site is limited to its seven static pages. It cannot compete for informational queries. It cannot build topical authority. It cannot attract organic links. The entire content SEO strategy is dead on arrival.

The site has 7 indexable URLs. Competitors with blogs have hundreds. That gap will only widen over time.

---

## CTA / Conversion Issues

No newsletter signup on the writing page. No email capture after reading a post (because you cannot read a post). No contextual CTAs like "Want help with your SEO? Let's talk." The blog should be the top of the funnel — awareness content that leads to consideration (services) and then conversion (contact). That funnel does not exist.

---

## Recommendations

1. **Create `/writing/[slug]/page.tsx` immediately.** This is the highest-impact technical task on the site. Pull post data from Prisma. Render full article with title, date, reading time, content, author, tags, social sharing, and related posts.

2. **Connect the writing index page to the database.** Replace the hardcoded `articles` array with a database query. Show actual published posts. Add pagination and tag filtering.

3. **Publish at minimum 5–10 posts before launch.** Use the AI-assisted writing tool that already exists in the admin dashboard. Topics: "How to audit your website's SEO," "5 signs you need a marketing consultant," "Google Ads vs. SEO: which is right for your business," etc.

4. **Add BlogPosting structured data** to each post page. Title, author, datePublished, dateModified, image, description.

5. **Add newsletter signup** to the blog index and individual post pages. Capture readers who are not ready to buy but want to stay informed.

6. **Add the blog to the sitemap dynamically.** The current `sitemap.ts` likely only includes static routes. Blog posts should be added automatically as they are published.

7. **Add an RSS feed.** Simple to implement, signals professionalism, and enables syndication.
