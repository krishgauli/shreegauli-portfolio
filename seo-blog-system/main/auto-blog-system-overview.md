# Auto-Blog Generation System Overview

## What This Is (And What It Isn't)

Let me be really clear upfront: this is not a "set it and forget it" content machine. I've seen what happens when people use AI to bulk-publish SEO content without review — it's not great. The posts read like they were written by someone who has heard of the topic but never actually done the work. Google has gotten pretty good at detecting this, and even when those pages rank briefly, they tend to drop once Google's quality raters catch up.

So this system does something different. It uses AI to generate blog drafts — the heavy lifting of research, structure, and first-draft writing — but every single post goes through human review before it publishes. No exceptions. The AI is the engine, but a human is driving.

## What Already Exists

The infrastructure is already built into the site. There are two API endpoints:
- `/api/ai/generate-blog` — streaming generation, shows output step by step
- `/api/ai/generate-blog-oneshot` — single request, returns the full draft at once

Both of these already pull in the site's internal link context and follow basic SEO formatting. What was missing was a proper workflow around them — quality gates, review checkpoints, and a clear process from keyword selection to published post. That's what this document defines.

---

## The 12-Step Workflow

### Step 1: Pick a Keyword

Pull the next keyword from the priority matrix — not randomly, but in tier order. Before writing anything, verify that no existing post already covers it (this sounds obvious, but you'd be surprised how often it gets skipped).

You need:
- The target keyword
- Its cluster (SEO, paid media, automation, etc.)
- The search intent — is someone looking to learn, compare, or buy?
- Competitor reference URLs are helpful but optional

### Step 2: Classify the Intent

This determines what kind of content to create. A "how to" query needs a tutorial. A "best X vs Y" query needs a comparison. Don't fight the intent — match it.

| Search Intent | Signals | Content Approach |
|--------------|---------|-----------------|
| Informational | "how to", "what is", "guide", "tips" | Educational content, demonstrate expertise |
| Commercial Investigation | "best", "vs", "comparison", "review" | Comparison content, position your service |
| Transactional | "buy", "pricing", "hire", "service" | Direct service pitch, minimal fluff |
| Navigational | Brand name, tool name | Optimize existing page, not blog |

### Step 3: Choose the Blog Format

Once you know the intent, the format picks itself — mostly. How-to guides for informational queries, comparison posts for commercial investigation, problem-solution posts for transactional queries. Sometimes the lines blur, and that's okay. A "best automation tools" post is technically informational, but the person searching probably intends to buy something. Use your judgment.

| Intent | Blog Types |
|--------|-----------|
| Informational | How-to Guide, Pillar Post, Explainer, Checklist |
| Commercial Investigation | Comparison Post, Listicle, Alternative Roundup |
| Transactional | Problem-Solution Post, Case Study Companion, ROI Analysis |
| Mixed | Strategy Guide, Framework Post |

### Step 4: Generate an Outline First

Don't skip this step. The biggest mistake with AI content is going straight from keyword to full draft. Generate a structured outline instead:

- Working title (H1)
- Introduction hook (2–3 sentences that earn the reader's attention)
- 5–8 H2 sections with brief descriptions of what each covers
- H3 sub-sections where appropriate
- Conclusion direction with CTA
- Estimated word count (1,200–2,500 words depending on type)

Here's the important part: **review the outline before proceeding to the draft.** If the outline is weak or misses the point, the draft will be worse. Ten minutes reviewing an outline saves an hour of editing a bad draft.

### Step 5: Write the SEO Title

Generate 3 options and pick the best one. The rules:
- Primary keyword included naturally (not forced at the beginning if it reads awkwardly)
- 50–60 characters — any longer and Google truncates it
- A power word or number helps CTR but only if it's honest
- It should match what the searcher expects to find
- Check the top 5 current SERP results — your title needs to stand out, not blend in

### Step 6: Write the Meta Description

This is your pitch in search results. People read these, even if Google sometimes overwrites them.

- 150–160 characters (not a hard limit, but go over and it gets cut)
- Include the primary keyword — it'll get bolded in the SERP
- Include what the reader gets: a checklist, a framework, step-by-step process
- End with an implied call-to-action — something like "See the full breakdown" works better than "Click here"

### Step 7: Structure the Headings

This seems basic but I've seen it go wrong more times than I'd like to admit. The hierarchy should be clean:

- One H1 per page. Keyword-optimized. Matches the user's intent.
- 5–8 H2 headings covering the main sections
- H3s for sub-sections under H2s
- Never skip levels (H1 → H3 without an H2 is invalid hierarchy)

The H2s are your second-best chance at ranking for related queries, so try to work in secondary keywords where they fit naturally. But if it reads like keyword soup, rephrase it.

### Step 8: Generate the Draft

This is where the AI does its heaviest lifting. The existing endpoints at `/api/ai/generate-blog` and `/api/ai/generate-blog-oneshot` handle this step. They already pull in the site's page map for internal link context.

What every draft needs to deliver:

- **Minimum 1,200 words** for standard posts, **2,000+** for pillar posts
- **An original angle** — not just a rewrite of what's already ranking. What does someone with Shree's actual experience add that a generic article doesn't?
- **At least 2 concrete examples** per post — not hypothetical "imagine if" scenarios, but real-world applications
- **Data or proof points** — stats, case study references, benchmarks
- **Conversational but professional tone** — it should sound like someone who's done the work, not someone who's read about it
- **No filler paragraphs** — if a section doesn't add value, cut it. Shorter and useful beats long and padded.
- **Proper formatting** — bullets, numbered lists, bold key terms. People scan before they read.

### Step 9: Add Internal Links

The system suggests internal links based on topic relevance, but you should always verify them. Here's the general logic:

| Link Target | When to Link |
|-------------|-------------|
| /services/seo | Post mentions SEO, audits, keyword strategy, content marketing |
| /services/paid-media | Post mentions Google Ads, Meta Ads, PPC, ROAS |
| /services/social-media | Post mentions social media, content calendars, community |
| /services/automation | Post mentions automation, n8n, CRM, workflows, dashboards |
| /work/seo-growth | Post discusses SEO results or organic growth |
| /work/paid-media | Post discusses ad performance or ROAS improvements |
| /work/automation | Post discusses time savings or workflow optimization |
| /seo-tools | Post mentions SEO audits or website analysis |
| /blogs/[related-slug] | Post covers a related sub-topic that has its own post |
| /contact | Every post (in CTA) |
| /lp/book-a-call | Every commercial-intent post (in CTA) |

**A few rules of thumb:**
- Every post needs 4–6 internal links minimum
- At least 1 to a service page, 1 to a related blog post, 1 CTA link
- Don't link to the same page more than twice in one post
- Use anchor text that actually describes the target page — "click here" is useless for both readers and search engines
- When in doubt, link to the closest-matching service page and the most relevant existing post

### Step 10: Insert CTAs

Every blog post needs at least two calls-to-action. This isn't aggressive selling — it's good UX. If someone reads 2,000 words of your SEO advice and then there's no clear next step, that's a missed opportunity.

1. **Inline CTA** — placed within the content, after the most relevant section. Keep it natural: "Need help with your Google Ads? [Book a free strategy call →](/lp/book-a-call)"

2. **End-of-post CTA** — a clear block after the conclusion with a heading, one sentence of value prop, and a button.

3. **Newsletter CTA** (optional) — for purely informational posts where a sales pitch would feel premature.

The CTA should match the post's intent:

| Post Intent | Primary CTA | Secondary CTA |
|-------------|------------|---------------|
| Informational | Free SEO Audit / Newsletter | Service page link |
| Commercial Investigation | Book a Call | Free audit |
| Transactional / Problem-Solution | Book a Call | Pricing page |

### Step 11: Human Review — This Is Non-Negotiable

I cannot stress this enough. No blog post publishes without a human reading it, editing it, and deliberately clicking "publish." The AI generates a draft. A person makes it real.

Here's what to check:

- [ ] Title is accurate and compelling
- [ ] Meta description is within character limits and includes keyword
- [ ] Content matches the stated search intent
- [ ] No factual errors or outdated information
- [ ] Internal links are correct and functional
- [ ] External links (if any) go to reputable sources
- [ ] CTA is appropriate for the content
- [ ] Tone matches the site's voice
- [ ] No thin or filler sections
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
- [ ] Images have alt text (if included)
- [ ] Post is not substantially similar to an existing post on the site
- [ ] Keyword usage is natural, not stuffed
- [ ] Post delivers genuine value to the target reader

After review, three options:
- **Approve** — move it to the publish queue
- **Edit** — make changes and review again. Most posts need at least one round of edits. That's normal.
- **Reject** — sometimes the draft just misses the mark. Document why and regenerate with an updated brief. It happens.

### Step 12: Publish

Before hitting publish, make sure everything is filled in:

| Field | Requirement |
|-------|------------|
| Title (H1) | Finalized, keyword-optimized |
| SEO Title | 50–60 chars, keyword included |
| Meta Description | 150–160 chars, keyword included |
| Slug | Lowercase, hyphenated, keyword-rich, under 60 chars |
| Content | Full HTML/Markdown, properly formatted |
| Categories | At least 1 assigned from the category taxonomy |
| Tags | 3–5 relevant tags |
| Cover Image | Selected or generated (with alt text) |
| Internal Links | 4–6 minimum, verified working |
| CTA | Inline + end-of-post |
| Schema | BlogPosting JSON-LD (auto-generated by page template) |
| Canonical URL | https://shreegauli.com/blogs/{slug} |
| Publish Date | Set manually or scheduled |
| Author | Shree Krishna Gauli |

---

## What Already Exists vs. What Needs Building

The good news is that most of the infrastructure is already in place. The Prisma `Post` model has all the right fields. The AI endpoints work. The blog pages render with proper schema. The admin dashboard has a blog creation interface.

What's missing is the process layer:

1. **A draft status workflow** — AI-generated posts should save with `publishedAt: null` (draft state) until someone deliberately approves them. Right now there's no enforced gate.
2. **A review checklist in the admin UI** — the Step 11 checklist should be visible right in the edit interface, so it's impossible to skip.
3. **An internal link validator** — before publishing, run a quick check that all internal links in the content actually resolve to existing pages. Broken internal links are embarrassing and bad for SEO.
4. **A keyword tracking field** — add `targetKeyword` to the Post model so we can track which keyword each post targets and avoid duplication.
5. **Publishing notes** — a text field for recording editorial decisions. "Revised intro to be less generic, added real ROAS example from client work." This builds institutional memory.

### Auto-Blog Workflow Summary

```
Keyword Selected (from priority matrix)
    ↓
Intent + Blog Type Determined
    ↓
Outline Generated → Human Approval
    ↓
Draft Generated via /api/ai/generate-blog
    ↓
Internal Links + CTA Inserted
    ↓
Saved as Draft (publishedAt: null)
    ↓
Human Review (admin dashboard)
    ↓
Edits Made if Needed
    ↓
Approved → publishedAt Set → Sitemap Revalidated → Live
```

---

## Quality Control — The Rules That Keep Things Honest

1. **No more than 3 AI-generated drafts per week.** Seriously. The temptation to crank out content will be strong. Focus on making each piece genuinely good.
2. **Every draft sits in review for at least 24 hours.** Fresh eyes catch things tired ones miss.
3. **No two posts targeting the same primary keyword.** Use the keyword matrix to prevent overlap. If you're not sure, grep the existing posts.
4. **Refresh cycle:** Every published post should be reviewed for accuracy and links every 6 months. Set a calendar reminder.
5. **Originality check:** Before publishing, scan the top SERP results for the target keyword. If the draft reads like a rewrite of what's already ranking, it needs more original perspective.
6. **The people-first test:** Would a real person in the target audience find this post useful, even if they never hired the service? If not, don't publish it. That's Google's standard, and more importantly, it's the right standard.
