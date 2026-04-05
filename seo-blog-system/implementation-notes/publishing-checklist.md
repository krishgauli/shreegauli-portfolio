# Blog Publishing Checklist

This is the checklist you run through for every single blog post — from the moment you pick a keyword to the monitoring you do after it goes live. It looks long, but once you've done it a few times it becomes second nature. Most of this takes five minutes to verify; the writing itself is the time-consuming part.

## Before You Write Anything

- [ ] **Target keyword selected** from keyword-priority-matrix.md or top-100-keywords.md
- [ ] **Search intent verified** — check top 10 SERP results to understand what Google expects
- [ ] **Content format decided** — guide, listicle, how-to, case study, comparison, tutorial
- [ ] **Word count target set** — based on competing content (usually 1,500–3,000 words)
- [ ] **Topic cluster identified** — which pillar page does this post support?
- [ ] **Internal links pre-planned** — which existing pages should this post link to?

---

## While You're Writing

This is where quality is made or lost. The checklist below covers structure, linking, and readability. If you're using the AI generation system, you still need to verify every single one of these — the AI gets most of them right, but "most" isn't good enough.

- [ ] **H1** contains primary keyword (naturally, not stuffed)
- [ ] **H2s** contain secondary keywords or long-tail variants
- [ ] **Introduction** (first 100 words) includes primary keyword
- [ ] **Content structure** follows: Intro → Problem → Solution(s) → Examples → CTA → Conclusion
- [ ] **Practical examples** — at least 2 real-world examples or actionable steps
- [ ] **Internal links** — minimum 4–6 to relevant pages:
  - [ ] 1 link to relevant service page
  - [ ] 2 links to related blog posts
  - [ ] 1 link to case study (if applicable)
  - [ ] 1 CTA link (book-a-call or seo-tools)
- [ ] **External links** — 2–3 to authoritative sources (not competitors)
- [ ] **Paragraphs** are 2–4 sentences max
- [ ] **Lists and bullet points** used for scannable content
- [ ] **Bold key terms** for emphasis and scannability

---

## SEO Metadata

These are the basics, but they're easy to get wrong — especially character counts. Google truncates titles over 60 characters and descriptions over 160. Check the actual pixel width if you want to be precise, but character count is a good enough proxy.

- [ ] **SEO title** — 50–60 characters, primary keyword included
- [ ] **Meta description** — 150–160 characters, keyword + value proposition + implied CTA
- [ ] **URL slug** — short, keyword-rich, hyphenated, no stop words
- [ ] **Canonical URL** — set to `https://shreegauli.com/blogs/{slug}`
- [ ] **Category** assigned — one of the 7 defined categories
- [ ] **Tags** assigned — 3–5 relevant tags

---

## Technical SEO

The stuff that affects page performance and how search engines see your content. None of this is glamorous, but broken images and slow pages will tank your rankings faster than any keyword optimization can save them.

- [ ] **Cover image** — 1200×630px, WebP format, descriptive alt text with keyword
- [ ] **All images** have alt text
- [ ] **Schema markup** — BlogPosting JSON-LD is auto-generated (verify in page source)
- [ ] **No broken links** — test all internal and external links
- [ ] **Mobile rendering** — verify on mobile viewport
- [ ] **Page loads under 3s** — check with dev tools

---

## After Publishing

Publishing isn't the end — it's the midpoint. These follow-up steps determine whether the post gets discovered or sits there unnoticed.

- [ ] **Sitemap updated** — auto via revalidatePath('/blogs') in API
- [ ] **Index request** — submit URL in Google Search Console (optional, crawl catches up)
- [ ] **Social share** — post to LinkedIn, Twitter with custom copy
- [ ] **Newsletter inclusion** — add to next newsletter if applicable
- [ ] **Internal link from existing posts** — add a link from 1–2 existing posts to the new post
- [ ] **Monitor performance** — check Search Console after 1–2 weeks for impressions and clicks

---

## What "Good" Looks Like

Here's the floor — the minimum standard before a post should go live. If you can't hit these numbers, the post needs more work.

### Minimum Requirements
| Criteria | Standard |
|----------|----------|
| Word count | 1,200+ (ideally 1,500–3,000) |
| Internal links | 4+ |
| External links | 2+ |
| Images | 1+ (cover image required) |
| H2 headings | 3+ |
| Readability | 8th grade level or simpler |
| Unique content | 100% original, no AI slop |

### Quality Signals — The Things That Separate Good from Great
- Demonstrates first-hand experience (this is the "E" in E-E-A-T that Google cares about most)
- Provides specific, actionable advice — not generic platitudes like "create great content"
- Includes data, stats, or examples where they add real value
- Has a clear takeaway the reader can put into practice immediately
- Reads like it was written by someone who actually knows the topic, not someone who summarized the top 10 Google results

---

## When Using the AI Blog System

The AI generation system (`/api/ai/generate-blog-oneshot`) produces a first draft. That's all it is — a first draft. Treat it that way.

1. **AI generates the draft** based on your keyword and prompt
2. **Run through this entire checklist** — yes, all of it
3. **Edit for voice** — make sure it sounds like Shree's writing style, not like generic AI output
4. **Verify every internal link** — the AI sometimes links to pages that don't exist
5. **Fact-check everything** — AI will confidently state things that aren't true. Every stat, every claim, verify it.
6. **Add personal experience** — inject real examples from actual client work. This is what makes the content credible.
7. **Only then: approve and publish**

**The rule: never publish AI-generated content without human review.** Write it on a sticky note if you have to.

---

## How Often to Publish

Here's a realistic publishing cadence. The early months are more aggressive to build up content volume; after that, consistency matters more than frequency.

| Phase | Frequency | Notes |
|-------|-----------|-------|
| Launch (Month 1–2) | 3 posts/week | Build initial content volume |
| Growth (Month 3–6) | 2 posts/week | Maintain momentum |
| Maintenance (Month 7+) | 1 post/week | Consistent output |

Priority order:
1. Pillar content for each topic cluster
2. Supporting posts targeting long-tail keywords
3. Timely/trending topics for social sharing
