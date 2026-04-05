# Landing Pages Blueprint

## What Landing Pages Are For

Landing pages live at `/lp/{slug}` and they serve one purpose: conversion. Unlike the rest of the site, which is designed for exploration, a landing page is built for a single action — sign up for an audit, book a call, or request a consultation. Minimal navigation, minimal distraction, maximum focus on the ask.

Three landing pages already exist. Below is what's on each one and what could be improved, plus a couple of recommended additions.

## Current Landing Pages

| URL | Purpose | Status |
|-----|---------|--------|
| /lp/free-seo-audit | Drive free SEO audit signups | Exists |
| /lp/book-a-call | Drive strategy call bookings | Exists |
| /lp/marketing-services | Showcase all services (ads landing) | Exists |

---

## 1. Free SEO Audit — `/lp/free-seo-audit`

| Element | Value |
|---------|-------|
| Primary Keyword | free SEO audit, website SEO analysis |
| SEO Title | Free SEO Audit — Find What's Holding Your Site Back | Shree Krishna Gauli |
| Meta Description | Get a free, comprehensive SEO audit of your website. Find technical issues, keyword gaps, and content opportunities. No commitment required. |
| H1 | Get Your Free SEO Audit |
| Canonical | https://shreegauli.com/lp/free-seo-audit |

### Content Sections
1. **Hero** — H1 + one-liner value prop + form/CTA button
2. **What You Get** — 4–5 audit deliverables (technical, on-page, keyword gaps, competitor comparison, action plan)
3. **How It Works** — 3-step process (Submit URL → We Analyze → You Get Report)
4. **Social Proof** — 1–2 testimonials or trust badges
5. **FAQ** — 3–4 common questions about the audit
6. **Final CTA** — Repeat the form or CTA button

### Internal Links (Minimal — Landing Page)
| Link | Target |
|------|--------|
| SEO service mention | /services/seo |
| Privacy policy (footer) | /privacy |

### Schema
- WebPage + BreadcrumbList
- FAQPage (if FAQ section is present)

---

## 2. Book a Call — `/lp/book-a-call`

| Element | Value |
|---------|-------|
| Primary Keyword | book marketing consultation, free strategy call |
| SEO Title | Book a Free Strategy Call — Digital Marketing Consultation | Shree Krishna Gauli |
| Meta Description | Schedule a free 30-minute marketing strategy call. Discuss SEO, paid media, automation, and growth plans with Shree Krishna Gauli. No strings attached. |
| H1 | Book a Free Strategy Call |
| Canonical | https://shreegauli.com/lp/book-a-call |

### Content Sections
1. **Hero** — H1 + what you'll discuss + embedded Calendly/booking widget
2. **What to Expect** — 3 bullet points (audit review, custom recommendations, next steps)
3. **Who This Is For** — 3–4 ideal client types (small business, healthcare, SaaS, local business)
4. **About the Consultant** — Mini bio with photo, credentials, link to /about
5. **Social Proof** — 2–3 testimonial snippets
6. **Final CTA** — Repeat booking widget

### Internal Links (Minimal)
| Link | Target |
|------|--------|
| About link | /about |
| Testimonials link | /testimonials |
| Privacy policy | /privacy |

### Schema
- WebPage + BreadcrumbList

---

## 3. Marketing Services — `/lp/marketing-services`

| Element | Value |
|---------|-------|
| Primary Keyword | digital marketing services, full-service marketing |
| SEO Title | Digital Marketing Services — SEO, Ads, Social & Automation | Shree Krishna Gauli |
| Meta Description | Full-service digital marketing: SEO, Google Ads, social media management, and marketing automation. See our services and book a free consultation. |
| H1 | Digital Marketing Services That Drive Growth |
| Canonical | https://shreegauli.com/lp/marketing-services |

### Content Sections
1. **Hero** — H1 + 1–2 line value prop + "Book a Call" CTA
2. **Services Overview** — 4 service cards (SEO, Paid Media, Social Media, Automation) with brief descriptions linking to /services/{slug}
3. **Results Snapshot** — 3 stat cards (340% growth, 4.8x ROAS, 20+ hours saved)
4. **Process** — 4-step: Audit → Strategy → Execution → Report
5. **Case Studies Preview** — 1–3 case study cards linking to /work/{slug}
6. **Testimonials** — 2–3 client quotes
7. **Pricing Preview** — "Starting from" tiers or link to /pricing
8. **Final CTA** — "Book a Free Strategy Call" → /lp/book-a-call

### Internal Links
| Link | Target |
|------|--------|
| SEO service | /services/seo |
| Paid media service | /services/paid-media |
| Social media service | /services/social-media |
| Automation service | /services/automation |
| Case studies | /work/{slug} |
| Pricing | /pricing |
| Book a call | /lp/book-a-call |

### Schema
- WebPage + BreadcrumbList
- Service (for each service mentioned)

---

## Landing Pages Worth Building Next

These don't exist yet but would serve specific traffic sources well.

### High Impact
| URL | Purpose | Target Keyword |
|-----|---------|----------------|
| /lp/healthcare-marketing | Healthcare marketing niche | healthcare marketing agency, HIPAA compliant marketing |
| /lp/local-seo | Local SEO service page | local SEO services, Google Business Profile optimization |

### Medium Impact
| URL | Purpose | Target Keyword |
|-----|---------|----------------|
| /lp/google-ads-audit | Google Ads account audit | free Google Ads audit, PPC audit |
| /lp/n8n-automation | n8n automation consulting | n8n automation consulting, marketing workflow automation |

---

## Design Principles for Landing Pages

These aren't arbitrary rules — they come from what actually converts. I've seen too many landing pages fail because they tried to do too much.

1. **Strip the navigation.** Remove the main navbar. Show only the logo and one CTA in the header. Every link that isn't the CTA is a potential exit.
2. **One CTA. Period.** Every section should drive toward the same primary action. Don't split attention between "book a call" and "read our blog."
3. **Form or CTA above the fold.** If someone has to scroll to take action, you've already lost a percentage of them.
4. **Social proof near the CTA.** Testimonials or trust badges should be visually close to the action point, not buried at the bottom.
5. **Mobile-first.** Form fields stack, CTA button goes full-width. Test on a real phone.
6. **Fast.** No heavy animations, minimal JS, WebP images only. Every 100ms of load time costs conversions.
7. **Exit intent popup** (optional) — a secondary offer when someone tries to leave. Can be effective, but don't overdo it.

## A Few Other Things to Keep in Mind

1. **noindex or not?** If a landing page duplicates content from a service page and is only for ad traffic, consider `noindex`. If it targets a unique keyword, keep it indexed.
2. **UTM tracking** — all landing pages should capture UTM parameters so you can attribute conversions properly.
3. **A/B testing** — the `/lp/` prefix makes it easy to create variants without messing with the main site's SEO.
4. **Form analytics** — make sure form submissions fire analytics events. If you can't measure it, you can't improve it.
