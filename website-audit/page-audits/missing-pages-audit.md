# Missing Pages Audit — shreegauli.com

This file catalogs every page that should exist but does not — dead links that are referenced from live pages, pages that visitors would reasonably expect to find, and routes that are structurally necessary but have never been created.

---

## Dead Links (Referenced From Live Pages)

These are URLs that are actively linked to from visible, published pages on the site. Visitors click on these and get a 404.

### /resume
- **Referenced from:** HeroSection (homepage), FinalCTASection (appears on homepage, about, services, contact, work, writing)
- **Impact:** High — the hero CTA on the homepage points here. This is arguably the most visible dead link on the site.
- **Fix:** Upload a PDF resume to `/public/resume.pdf` and link directly to it, or create a `/resume` page that embeds or displays the resume content, or remove the link entirely.

### /forgot-password
- **Referenced from:** Login page
- **Impact:** Medium — only affects users who have accounts and forget their password. But for those users, it is a dead end.
- **Fix:** Create a password reset flow (send email with reset link) or remove the link.

### /terms
- **Referenced from:** Signup page, possibly CookieConsent component
- **Impact:** Medium — legal compliance issue. A signup form that references terms of service that do not exist is a trust problem.
- **Fix:** Create a minimal Terms of Service page. Even a short, straightforward one is better than a 404.

### /privacy
- **Referenced from:** Signup page, CookieConsent component
- **Impact:** Medium to high — privacy policy is referenced when users are asked to consent to cookies. A broken privacy policy link may violate GDPR/CCPA requirements depending on where visitors are located.
- **Fix:** Create a Privacy Policy page. If Shree collects any user data (and the signup/login system means they do), a privacy policy is legally advisable.

### Article links (#)
- **Referenced from:** Writing page (InsightsSection on homepage)
- **Two articles link to `#`** — clicking them scrolls to the top of the page and goes nowhere.
- **Impact:** Medium — signals that the blog is not finished. Visitors who want to read more cannot.
- **Fix:** Either publish the actual posts and point to their `/writing/[slug]` URLs, or remove the cards until content is ready.

---

## Pages That Should Exist (Based on Site Structure)

These pages are not linked from anywhere but are structurally necessary for the site to function as a complete marketing presence.

### /writing/[slug] — Individual Blog Posts
- **Why it is needed:** The admin CMS creates and stores blog posts. The writing index page shows article cards. But there is no route to render an individual post. The content pipeline is broken at the last step.
- **Priority:** P1 — this blocks the entire content SEO strategy

### /services/seo, /services/paid-media, /services/social-media, /services/automation — Individual Service Pages
- **Why they are needed:** Each service needs its own URL for keyword targeting, content depth, and conversion optimization. The `ServicePageTemplate` component already exists in the codebase.
- **Priority:** P1 — four indexable pages with high conversion potential

### /work/[slug] — Individual Case Study Pages
- **Why they are needed:** 50-word summary cards are not case studies. Prospects need detail to build trust. Case study pages are the #1 B2B trust signal.
- **Priority:** P1 — three deep-content pages

### Custom 404 Page (not-found.tsx)
- **Why it is needed:** With multiple dead links on the site, visitors are hitting the unstyled default Next.js 404. A branded 404 page with helpful navigation links would soften the impact.
- **Priority:** P0 — visitors are actively hitting this

---

## Pages That Would Be Valuable (Not Yet Referenced)

These are pages that do not exist and are not linked from anywhere, but would add significant value to the site.

### /pricing or /working-together
- **Why:** Prospects want to know if they can afford your services before reaching out. Even broad ranges help. A "Working Together" page that explains engagement models, minimum project size, and typical timelines would pre-qualify leads.

### /faq
- **Why:** A standalone FAQ page (in addition to per-page FAQs) captures featured snippets and reduces repetitive inquiries. Topics: "How do you measure success?", "What industries do you work with?", "How long does SEO take to show results?", "Do you work with small businesses?"

### /tools or a dedicated /seo-tools promotion page
- **Why:** The SEO audit tool is the site's best feature but is underexposed. A dedicated marketing page for the tool (different from the tool itself) could rank for "free SEO audit" queries and funnel traffic to the tool with email capture.

### /newsletter or /subscribe
- **Why:** The API endpoint for newsletter subscriptions exists. A dedicated signup page gives you a URL to share on social media and in emails.

### /testimonials or /reviews
- **Why:** Currently, testimonials only appear as a section within shared components. A dedicated page with more reviews, headshots, and company details would strengthen social proof. Particularly useful once Shree has more than three clients to showcase.

---

## Summary

| Page | Status | Linked From | Priority |
|------|--------|-------------|----------|
| /resume | 404 | Homepage hero, FinalCTA (all pages) | P0 |
| /forgot-password | 404 | Login page | P1 |
| /terms | 404 | Signup, CookieConsent | P1 |
| /privacy | 404 | Signup, CookieConsent | P1 |
| Article # links | Dead | Writing page, homepage insights | P1 |
| /writing/[slug] | Does not exist | Needed for blog | P1 |
| /services/[slug] | Does not exist | Needed for service detail | P1 |
| /work/[slug] | Does not exist | Needed for case studies | P1 |
| not-found.tsx | Does not exist | Catch-all 404 | P0 |
| /pricing | Does not exist | Not linked | P2 |
| /faq | Does not exist | Not linked | P2 |
| /newsletter | Does not exist | Not linked | P3 |
