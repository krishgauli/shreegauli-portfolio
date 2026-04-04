# Content Gaps Summary — shreegauli.com

---

## Overview

The site looks like it has content. The homepage has nine sections. There are pages for services, about, contact, work, and writing. But when you actually click through, most of the substance evaporates. Pages reuse the same shared sections. Detail pages do not exist. The blog is a facade. The depth is an illusion.

This document catalogs every significant content gap — things that should be written, things that should exist, and things that are half-built.

---

## Gap 1: Blog Content (Critical)

**Current state:** Three hardcoded article cards. Two link to `#`. One may link to an external URL. No public blog post route exists at `/writing/[slug]`.

**What exists behind the scenes:** A full CMS with Prisma models for blog posts (title, slug, content, tags, featured image, publish date, author). Admin dashboard with post creation, editing, and AI-assisted writing. Seed scripts for blog data. API endpoints for CRUD operations.

**What is missing:** The public-facing route. And actual published content.

**Impact:** No longtail keyword coverage. No topical authority. No content for social sharing. No reason for anyone to link to the site. The blog is where 60–80% of organic traffic should come from for a consulting site, and it is entirely absent.

**Content needed (minimum viable blog):**
- "How to Audit Your Website's SEO in 10 Minutes" (ties to the SEO tool)
- "SEO vs. Paid Media: Which Should You Invest In First?"
- "5 Signs Your Small Business Needs a Marketing Consultant"
- "What to Expect When You Hire a Freelance Marketer"
- "How I Grew [Client]'s Organic Traffic by 200%" (case study blog post)
- "The Best Marketing Automation Tools for Small Businesses"
- "Google Ads for Beginners: A Step-by-Step Guide"
- "How Long Does SEO Take to Show Results?"
- "What Is a Marketing Funnel and Why Does It Matter?"
- "Common Website Mistakes That Kill Your Conversion Rate"

Each post: 1,000–1,500 words. Internal links to relevant service pages. CTA at the end.

---

## Gap 2: Service Detail Pages (Critical)

**Current state:** Four service cards on `/services` with 30–50 word descriptions each. No individual service pages.

**What exists behind the scenes:** `ServicePageTemplate.tsx` — a complete template component with sections for overview, benefits, process steps, FAQ, and CTA. Never connected to any route.

**What is missing:** `/services/seo`, `/services/paid-media`, `/services/social-media`, `/services/automation`.

**Content needed per service page (800+ words each):**
- Service overview (what it is, who it is for)
- Process (3–5 steps: audit → strategy → execution → reporting → optimization)
- Tools and platforms used
- Expected timelines and outcomes
- FAQ (5–8 questions)
- Related case study
- CTA tailored to that specific service

---

## Gap 3: Case Study Detail Pages (High Priority)

**Current state:** Three case study summary cards on `/work`. Each is about 50 words.

**What is missing:** `/work/primecare-dallas`, `/work/autoedge-motors`, `/work/freshbite-kitchen` (or whatever slug convention).

**Content needed per case study (800–1,500 words each):**
- Client background (industry, size, challenges)
- The problem (specific, quantified if possible)
- The strategy (what was planned and why)
- The execution (what was actually done, tools used, timeline)
- The results (before/after metrics, charts if available)
- Key takeaways
- Client testimonial (already exists in the testimonials section — move it inline)
- CTA: "Want similar results? Let's talk about your business."

---

## Gap 4: About Page Depth (High Priority)

**Current state:** The About page renders the `AboutPreview` component from the homepage — the same 2–3 paragraphs. No additional content.

**Content needed:**
- Career background (how Shree got into marketing, education, previous roles)
- Working philosophy (approach to client relationships, what differentiates their work)
- Methodology (how a typical engagement progresses)
- Certifications with proof (Google, HubSpot — badges, links, dates)
- Tools expertise (specific platforms: Google Analytics, SEMrush, n8n, etc.)
- Ideal client profile (who Shree works best with)
- Professional photo

This should be 500–800 words of original content that does not appear anywhere else on the site.

---

## Gap 5: Contact Page Content (High Priority)

**Current state:** Email address and Calendly link. No form. No supporting copy.

**Content needed:**
- Contact form (name, email, company, service interest, budget, description)
- "What Happens Next" section (response timeline, discovery call process)
- Location/timezone info
- Contextual testimonial adjacent to the form
- Optional: FAQ about the engagement process

---

## Gap 6: Legal Pages (Medium Priority)

**Current state:** `/terms` and `/privacy` are referenced from the Signup page and CookieConsent component but do not exist.

**Content needed:**
- Privacy Policy: What data is collected (account info, cookies, analytics), how it is used, how to request deletion. Standard for any site with user accounts.
- Terms of Service: Basic usage terms. Does not need to be extensive for a portfolio site.

These can be short (500–800 words each). Templates are widely available.

---

## Gap 7: Pricing or Engagement Information (Medium Priority)

**Current state:** No pricing information anywhere on the portfolio brand. The only pricing on the site is in the client dashboard — healthcare plan tiers from a different brand.

**Content needed:**
- A `/pricing` or `/working-together` page
- 3 engagement models: hourly consultation, monthly retainer, project-based
- Price ranges (even broad: "Retainers start at $X/month")
- What is included in each tier
- FAQ about pricing, minimum engagement, payment terms

This helps prospects self-qualify and reduces wasted discovery calls.

---

## Gap 8: FAQ Content (Medium Priority)

**Current state:** A `FAQ.tsx` component exists but I did not see it deployed on any public page. No FAQ schema anywhere.

**Content needed:**
- Standalone `/faq` page or FAQ sections on service pages
- 15–25 questions covering: services, pricing, process, timeline, tools, industries served, results expectations
- Each answer 50–150 words
- FAQ schema markup for search visibility

Example questions:
- "How long does SEO take to show results?"
- "What reporting will I receive?"
- "Do you work with small businesses?"
- "What makes your approach different?"
- "How do you measure campaign success?"

---

## Gap 9: Testimonials Depth (Lower Priority)

**Current state:** Three testimonials, all 5 stars, each mapped to a case study. No photos, no company links, no detailed context.

**Content needed:**
- 3–5 additional testimonials from different clients
- At least one longer testimonial (paragraph length) with specific details
- Headshots and LinkedIn links for credibility
- At least one non-5-star review (counterintuitively increases trust)

---

## Gap 10: SEO Tool Supporting Content (Lower Priority)

**Current state:** The tool works but has no supporting content — no "How to use this tool" guide, no "What these results mean" explainer, no "Common SEO issues explained" companion content.

**Content needed:**
- "How to Use Our Free SEO Audit Tool" (blog post or in-page guide)
- "What Your SEO Audit Results Mean" (explainer for each check the tool runs)
- "How to Fix Common SEO Issues" (actionable follow-up content)
- "Free SEO Audit" landing page optimized for search

---

## Summary Table

| Gap | Priority | Content Type | Estimated Volume |
|-----|----------|--------------|------------------|
| Blog posts | Critical | Articles | 10+ posts, 1,000–1,500 words each |
| Service detail pages | Critical | Service pages | 4 pages, 800+ words each |
| Case study details | High | Case studies | 3 pages, 800–1,500 words each |
| About page expansion | High | Biography/methodology | 500–800 words |
| Contact form + copy | High | Form + supporting text | 200–300 words |
| Legal pages | Medium | Privacy/Terms | 500–800 words each |
| Pricing/engagement | Medium | Pricing page | 500–800 words |
| FAQ content | Medium | FAQ sections/page | 15–25 Q&As |
| Testimonial depth | Lower | Social proof | 3–5 additional testimonials |
| SEO tool guides | Lower | Companion content | 2–3 articles |

**Total estimated content creation:** ~30,000–40,000 words across all gaps.

This is not as daunting as it sounds. The blog AI tool in the admin dashboard can draft initial versions. Service pages have a template. Case studies just need the stories written. The biggest effort is the blog — but that is also where the biggest returns live.
