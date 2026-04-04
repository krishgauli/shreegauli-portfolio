# Landing Pages Audit — shreegauli.com

---

## Page Purpose

Landing pages are standalone, conversion-focused pages designed for specific traffic sources — paid ads, email campaigns, social media links, or partner referrals. They strip away general navigation and focus on a single message with a single CTA.

---

## Current State

There are no landing pages on shreegauli.com.

No `/lp/` routes. No standalone conversion pages. No dedicated ad destinations.

---

## What Exists (But Is Not Deployed)

There are twenty-three components in `src/components/landing/` — a full set of healthcare marketing landing page blocks: hero sections, service grids, testimonials, CTAs, feature lists, pricing sections, stat counters, and more. They reference healthcare specialties, clinic management, patient acquisition, and HIPAA compliance.

These belong to a different brand ("The NextGen Healthcare Marketing") and are completely disconnected from the current portfolio site. They are orphaned code — built for a project that either was abandoned or lives elsewhere.

None of these components are imported or rendered by any route in the current app.

---

## Why This Matters

If Shree ever runs ads promoting their marketing services, there is no purpose-built page to send that traffic to. Sending paid traffic to the homepage is wasteful because:

- The homepage has multiple CTAs (Work, Services, Contact, Resume, SEO Tools)
- There is no single focused conversion action
- Navigation allows visitors to wander away from the conversion path
- Headlines are generic, not campaign-specific

A landing page eliminates these problems by having one message, one CTA, and no distracting navigation.

---

## Content Gaps

Everything. There are no landing pages. The following would be valuable:

- **`/lp/free-seo-audit`** — Promotes the existing SEO audit tool (the site's strongest asset) with email capture before showing results
- **`/lp/book-a-call`** — Calendly embed with value proposition framing, testimonial, and service overview. For Shree's own paid ads or LinkedIn outreach
- **`/lp/marketing-services`** — Simplified version of the homepage focused solely on services + contact form. No blog links, no case study teasers, no writing section

---

## Recommendations

1. **Create 1–2 landing pages as Phase 3 work.** This is not urgent, but it becomes critical the moment Shree wants to run paid campaigns.

2. **Start with the SEO tool landing page.** The tool already exists and is the strongest differentiator on the site. `/lp/free-seo-audit` with a headline like "Audit Your Website in 60 Seconds" → email capture → tool access → follow-up CTA.

3. **Remove or relocate the healthcare landing components.** Twenty-three orphaned components add confusion to the codebase and increase bundle analysis noise. Move them to a separate repo or delete them if the healthcare project is dead.

4. **When creating landing pages, exclude the main Navbar.** Landing pages should not have site navigation. Use a minimal header with logo only (no links) and a footer with only the CTA.
