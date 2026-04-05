# Auto-Blog Workflow

This is the end-to-end process for creating a blog post — from picking a keyword to clicking publish. I've laid it out as a step-by-step workflow because, honestly, it's easy to skip things or forget where you left off when you're juggling multiple posts.

The most important thing to understand: **this is not a fully automated system.** The AI helps with drafting, but every single post goes through human review before it goes live. No exceptions. The moment you start auto-publishing without reading the content, you've lost the plot.

## Workflow Diagram (The Big Picture)

```
┌─────────────────────────────────────────────────────────┐
│                   KEYWORD SELECTION                      │
│  Source: keyword-priority-matrix.md                      │
│  Pick next keyword by priority tier                      │
│  Verify no existing post covers it                       │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│                INTENT CLASSIFICATION                     │
│  Informational → How-to, Guide, Explainer, Checklist   │
│  Commercial    → Comparison, Listicle, Problem-Solution │
│  Transactional → Case Study Companion, ROI Analysis     │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│              OUTLINE GENERATION                          │
│  Generate H1, H2s, H3s, intro hook, conclusion         │
│  Include internal link targets                          │
│  Set word count target                                  │
│  ⚠ HUMAN REVIEW: Approve outline before proceeding     │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│              SEO METADATA GENERATION                     │
│  SEO title (3 options, pick best)                       │
│  Meta description                                       │
│  URL slug                                               │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│              DRAFT GENERATION                            │
│  Use /api/ai/generate-blog or generate-blog-oneshot    │
│  Input: keyword, intent, outline, word count target     │
│  Output: Full blog post content                         │
│  Auto-publish: OFF (save as draft)                      │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│           INTERNAL LINKS + CTA INSERTION                 │
│  Verify service page link included                      │
│  Verify 2–3 related blog links included                 │
│  Verify case study link if applicable                   │
│  Add inline CTA after key section                       │
│  Add end-of-post CTA block                              │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│              SAVED AS DRAFT                              │
│  publishedAt: null                                      │
│  Visible in /dashboard/admin only                       │
│  Not in sitemap, not indexed                            │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│          ⚠ HUMAN REVIEW CHECKPOINT                      │
│  Review using quality checklist (see below)             │
│  Edit content, links, CTAs as needed                    │
│  Must wait at least 24 hours before publish             │
│                                                         │
│  Actions:                                               │
│  ✅ Approve → Set publishedAt → Revalidate → Live      │
│  ✏️ Edit → Make changes → Re-review                     │
│  ❌ Reject → Document reason → Regenerate or discard    │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│              PUBLISH                                     │
│  Set publishedAt to current datetime                    │
│  Revalidate /blogs, /blogs/{slug}, /sitemap.xml, /     │
│  Post appears on blog hub, in related posts, sitemap   │
│  Newsletter notification (optional)                     │
└─────────────────────────────────────────────────────────┘
```

---

## Walking Through It, Step by Step

The diagram above is the overview. Below is what you actually do at each stage. Some of these steps take five minutes, others might take an hour. The human review step should never be rushed — that's where the real quality control happens.

### Step 1: Pick Your Keyword

This sounds simple, but it's where a lot of people trip up. You don't just grab whatever sounds interesting — you work through the priority matrix in order.

1. Open `seo-blog-system/main/keyword-priority-matrix.md`
2. Find the next unassigned keyword in your current priority tier
3. Before you commit, make sure nothing on the site already covers this topic:
   - Scan the `/blogs` page for similar titles
   - Check the Prisma database for posts with matching slug patterns
   - Look through `src/lib/blogs.ts` for any static posts on the same topic
4. Record the keyword, cluster, intent, and planned slug

If you find an existing post that partially covers the keyword, consider refreshing that post instead of writing a new one. Two thin posts on the same topic are worse than one thorough one.

### Step 2: Figure Out What the Searcher Actually Wants

This is where you match the keyword to a post format. The intent behind a search matters more than the words themselves — someone searching "best SEO tools" wants a list, not a philosophical essay on SEO. Use this decision tree as a starting point, but trust your judgment if a keyword doesn't fit neatly:

```
Keyword contains "how to", "guide", "steps", "tutorial"?
  → Informational → How-to Guide

Keyword contains "vs", "comparison", "better", "or"?
  → Commercial Investigation → Comparison Post

Keyword contains "best", "top", "tools", "list"?
  → Commercial Investigation → Listicle

Keyword contains "checklist", "template", "audit"?
  → Informational → Checklist/Resource

Keyword contains "service", "consultant", "pricing", "hire"?
  → Transactional → Problem-Solution or Service-Adjacent

Keyword contains "why", "problem", "mistake", "fix"?
  → Informational → Problem-Solution

Default?
  → Informational → Strategy Guide
```

### Step 3: Build the Outline

This is arguably the most important step — more important than the actual drafting. A good outline means the draft practically writes itself. A bad outline means you'll be rewriting the whole thing later.

You can do this in the admin dashboard (`/dashboard/admin/blog/new`) or just sketch it out manually:

1. Write a working H1 (include the primary keyword, but make it sound natural)
2. Write a 2–3 sentence intro hook — what problem does the reader have, and why should they keep reading?
3. List 5–8 H2 sections that walk through the topic
4. For each H2, jot down a one-sentence description of what it covers
5. Note 2–3 internal link targets (service pages, related posts)
6. Set a word count target (1,200 minimum; 2,000+ for pillar posts)
7. Decide on the CTA direction — Book a Call, Free Audit, or Newsletter signup

**The review gate:** Read the outline back to yourself. Does it answer the searcher's question completely? If you were the person searching this keyword, would this outline satisfy you? If not, revise before moving on. It's much cheaper to fix the outline than to fix a 1,500-word draft.

### Step 4: Generate the Draft

Now the AI does its thing. Two ways to trigger it — the dashboard is easier, the API gives you more control. Either way, **always save as draft.** Never auto-publish.

Option A — **Through the Dashboard:**
1. Go to `/dashboard/admin/blog/new`
2. Enter the title, select auto-generate
3. The AI endpoint generates the full post
4. Make sure `autoPublish` is OFF — it saves as a draft

Option B — **Direct API Call** (useful if you're batching outlines):
```bash
curl -X POST https://shreegauli.com/api/ai/generate-blog-oneshot \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {admin-token}" \
  -d '{
    "topic": "How to Do a Google Ads Audit: Step-by-Step Guide",
    "targetKeyword": "how to do a google ads audit",
    "tone": "professional but approachable",
    "wordCount": 1500,
    "autoPublish": false
  }'
```

### Step 5: Check the Internal Links and CTAs

The AI is decent at inserting links, but it doesn't always get them right — sometimes it links to pages that don't exist yet, or it forgets the case study entirely. So this step is manual. Open the draft in the admin editor and run through this:

- [ ] At least 1 link to a relevant service page (e.g., `/services/paid-media`)
- [ ] At least 2 links to related blog posts
- [ ] At least 1 link to a case study, if one exists for this topic
- [ ] Inline CTA present after the most relevant section
- [ ] End-of-post CTA block present
- [ ] No broken links — every URL resolves to a real, live page
- [ ] No more than 2 links to the same page (it looks spammy otherwise)

If links are missing, add them manually. This takes maybe five minutes and makes a real difference for both SEO and user experience.

### Step 6: The Human Review (The Most Important Step)

This is the step that separates a useful blog from SEO spam. I mean it — everything else in this workflow is just scaffolding for this moment. Read the post. Read it like a person who searched for this topic and landed on your site. Would you keep reading?

Use this checklist, but also trust your gut. If something feels off, it probably is.

#### Content Quality
- [ ] Post delivers actionable value — not generic advice
- [ ] Practical examples included (at least 2)
- [ ] Tone matches the site's voice (professional, direct, no fluff)
- [ ] No factual errors or outdated information
- [ ] No filler paragraphs that don't add value
- [ ] Original angle — not a rehash of competitor content

#### SEO Compliance
- [ ] H1 includes primary keyword naturally
- [ ] SEO title is 50–60 characters, keyword included
- [ ] Meta description is 150–160 characters, keyword included
- [ ] Slug is under 60 characters, keyword-rich
- [ ] Heading hierarchy is correct (H1 → H2 → H3, no skips)
- [ ] Keyword usage is natural, not stuffed
- [ ] Content length meets minimum (1,200+ words)

#### Internal Linking
- [ ] Links to at least 1 service page
- [ ] Links to at least 2 related blog posts
- [ ] Links to case study if relevant
- [ ] CTA links work correctly
- [ ] Anchor text is descriptive and varied

#### Formatting
- [ ] Cover image selected with alt text
- [ ] At least 1 category assigned
- [ ] 3–5 tags assigned
- [ ] Proper use of bullet points and numbered lists
- [ ] No walls of text (max 3–4 sentences per paragraph)

#### The People-First Check

This is the one that matters most. If you can't honestly say yes to all three of these, the post isn't ready.

- [ ] Would a real person in the target audience find this useful?
- [ ] Does this post answer the search query better than what's currently ranking?
- [ ] Would publishing this post make the site more trustworthy?

### Step 7: Hit Publish

If (and only if) the post passed review:

1. In the admin dashboard, click "Publish" — this sets the `publishedAt` timestamp
2. The system auto-revalidates the relevant pages:
   - `/blogs` (the hub page)
   - `/blogs/{slug}` (the new post)
   - `/sitemap.xml`
   - `/` (homepage, because InsightsSection pulls recent posts)
3. Go look at the live site — verify the post actually shows up
4. Check that it's in the XML sitemap
5. Submit the URL to Google Search Console for indexing (don't skip this — it speeds things up considerably)

---

## A Realistic Publishing Schedule

Here's a calendar template, but I want to be upfront: this is the *ideal* cadence. Some weeks you'll fall behind, and that's fine. Consistency over time matters more than hitting every single slot.

| Week | Monday | Wednesday | Friday |
|------|--------|-----------|--------|
| 1 | Generate Outline (Keyword A) | Draft + Review (Keyword A) | Publish (Keyword A) |
| 2 | Generate Outline (Keyword B) | Draft + Review (Keyword B) | Publish (Keyword B) |
| 3 | Refresh existing post | Generate Outline (Keyword C) | Draft + Review (Keyword C) |
| 4 | Publish (Keyword C) | Internal link audit | Keyword research for next month |

**Target cadence:** 2–3 new posts per month, plus refreshing 1 older post. If you can only manage 1 new post and 1 refresh, that's still progress. The worst thing you can do is publish 5 mediocre posts in a burst and then go silent for three months.

---

## What to Watch After Publishing

Publishing is not the finish line — it's more like halftime. You need to check back on each post within 30 days to see if it's actually gaining traction. Here's what to look at:

| Metric | Tool | Target |
|--------|------|--------|
| Indexed by Google | Google Search Console | Within 7 days |
| Impressions | Google Search Console | Growing after week 2 |
| Average position | Google Search Console | Under 50 by day 30 |
| Click-through rate | Google Search Console | Above 2% |
| Time on page | Google Analytics | Above 2 minutes |
| Internal link clicks | Google Analytics | At least some engagement |

If a post isn't indexed within 14 days, don't panic — but do investigate:
1. Verify the canonical URL is correct
2. Make sure robots.txt isn't accidentally blocking it
3. Re-submit the URL in Search Console
4. Check for thin content or duplicate content issues (Google sometimes just ignores pages it considers low-value)

And if a post is indexed but sitting at position 80 after 30 days? That's okay. It takes time. Consider expanding the content, adding a few more internal links pointing to it, or updating the title to better match what people are actually searching for. SEO is a slow game — most posts don't hit their stride until month 3 or 4.
