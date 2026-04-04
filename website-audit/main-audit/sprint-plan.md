# Sprint Plan — shreegauli.com

---

## Phase 1: Urgent Fixes (Week 1)

These are things that actively hurt the site right now. Broken links, conflicting brands, missing pages that are already referenced.

---

### 1.1 Fix All Dead Links

**Issue:** `/resume` is a 404 linked from the hero and FinalCTASection. Two writing articles link to `#`. `/terms`, `/privacy`, `/forgot-password` are 404s referred to from Signup and CookieConsent.  
**Why it matters:** Seven broken links on a site with only seven real pages. Every dead link makes the site feel unfinished. Visitors and Google both notice.  
**Recommended fix:** Either create the missing pages or remove the links. For `/resume`, host a PDF in `/public` or remove the CTA. For articles with `#` links, either publish the posts or pull the cards. For `/terms` and `/privacy`, create minimal legal pages or remove the references from CookieConsent and Signup.  
**Priority:** P0  
**Expected impact:** Eliminates the most visible trust-damage on the site  
**Owner:** Developer

---

### 1.2 Remove or Isolate Healthcare Brand Contamination

**Issue:** `LocalBusinessSchema.tsx` injects structured data for "The NextGen Healthcare Marketing" at a different address. `ChatBot.tsx` suggests questions about healthcare specialties and $5K–$10K pricing plans. Twenty-three components in `src/components/landing/` are healthcare-specific. The client dashboard has healthcare plan tiers.  
**Why it matters:** Google is being told this site belongs to a different entity. The chatbot confuses visitors. Mixed brand signals are an SEO liability.  
**Recommended fix:** Remove `LocalBusinessSchema` from any layout chain or replace it with correct Person schema. Update ChatBot suggestion chips to match the portfolio brand. Move healthcare components to a separate package or remove them from the build.  
**Priority:** P0  
**Expected impact:** Resolves entity confusion in Google's index, stops confusing chatbot interactions  
**Owner:** Developer

---

### 1.3 Create a Custom 404 Page

**Issue:** No `not-found.tsx` exists. Given how many dead links are on the site, visitors are hitting the unstyled Next.js default 404.  
**Why it matters:** An unstyled 404 breaks the brand experience at exactly the moment a visitor is already frustrated.  
**Recommended fix:** Create `src/app/not-found.tsx` — dark-themed, branded, with links to homepage, services, and contact. Keep it helpful and brief.  
**Priority:** P0  
**Expected impact:** Softens the impact of any remaining dead links  
**Owner:** Developer

---

### 1.4 Add Contact Form to Contact Page

**Issue:** The contact page has email/Calendly buttons but no form. No way to describe a project. No way to capture structured lead data.  
**Why it matters:** Not everyone wants to send a cold email or book a call immediately. A form captures the middle ground. The API endpoint `/api/contact-lead` already exists — the backend is ready.  
**Recommended fix:** Add a form: name, email, company (optional), service interest (dropdown), budget range (optional), project description. Submit to existing API. Show confirmation.  
**Priority:** P0  
**Expected impact:** Could double contact page conversion rate  
**Owner:** Developer + Copywriter

---

### 1.5 Add Correct Structured Data

**Issue:** No Person schema for Shree. No Service schema. No FAQ schema. The only structured data is for the wrong brand.  
**Why it matters:** Google relies on structured data to understand what a page is about. Without it, the site competes with less context than competitors who have it.  
**Recommended fix:** Create `PersonSchema` component — name, jobTitle, url, sameAs (LinkedIn, GitHub), knowsAbout. Add it to the layout. Consider Service schema on service pages when they exist.  
**Priority:** P1  
**Expected impact:** Clearer entity signals, potential knowledge panel  
**Owner:** Developer

---

## Phase 2: Important Improvements (Weeks 2–3)

These are the structural gaps that prevent the site from performing at its potential. Missing pages, missing content, missing conversion paths.

---

### 2.1 Create Public Blog Post Route

**Issue:** The admin CMS creates and stores blog posts. There is no public `/writing/[slug]` route. Articles are not viewable.  
**Why it matters:** Blog content is the primary organic SEO lever. Without public blog routes, the entire content pipeline is broken at the final step. No posts means no longtail keyword coverage, no internal linking, no topical authority.  
**Recommended fix:** Create `/writing/[slug]/page.tsx`. Pull from Prisma. Full article layout with metadata, reading time, share buttons, CTA. Add BlogPosting schema. Connect the writing index page to database instead of hardcoded data. Add posts to sitemap dynamically.  
**Priority:** P1  
**Expected impact:** Unlocks the entire content SEO strategy  
**Owner:** Developer

---

### 2.2 Create Individual Service Pages

**Issue:** `/services` shows four cards on one page with no links to detail pages. Cannot rank for individual service keywords.  
**Why it matters:** Someone searching "n8n marketing automation" needs a page about automation, not an overview with four cards. Each service deserves its own URL with 800+ words, process explanation, FAQ, and CTA.  
**Recommended fix:** Create `/services/seo`, `/services/paid-media`, `/services/social-media`, `/services/automation`. Use the existing `ServicePageTemplate` component — it is built and waiting. Add FAQ schema. Link from the homepage service cards.  
**Priority:** P1  
**Expected impact:** Four new indexable pages targeting specific search intents  
**Owner:** Developer + Copywriter

---

### 2.3 Create Case Study Detail Pages

**Issue:** Case studies are 50-word summaries. No detail pages exist at `/work/[slug]`. No screenshots, no process explanation, no timeline.  
**Why it matters:** Case studies are the number one trust signal for B2B service buyers. Summaries alone cannot compete with competitors who publish 1,500-word case studies with charts and timelines.  
**Recommended fix:** Create `/work/[slug]` route. Write 800–1,500 words per case study: client context, strategy, timeline, results with before/after, key takeaways. Add visuals if available.  
**Priority:** P1  
**Expected impact:** Three deep-content pages that build trust and rank for longtail queries  
**Owner:** Developer + Copywriter

---

### 2.4 Wire the SEO Tool as a Lead Funnel

**Issue:** The SEO audit tool is the site's best asset but has zero conversion mechanism. No email capture, no post-audit CTA, no booking prompt.  
**Why it matters:** A visitor who sees 15 failing SEO checks is pre-sold on needing help. Right now they see the problems and navigate away. That is a leak in the funnel.  
**Recommended fix:** After audit completion, show a contextual CTA: "Want help fixing these? Book a free audit review." Add optional email capture for the PDF export. Promote the tool on the homepage with a dedicated section.  
**Priority:** P1  
**Expected impact:** 10–20+ leads/month from tool users with high purchase intent  
**Owner:** Developer + Conversion strategist

---

### 2.5 Add Newsletter Signup

**Issue:** No email capture anywhere. The `/api/newsletter` endpoint exists but no signup form is visible.  
**Why it matters:** Without email capture, every visitor who leaves is permanently lost. Even 50 subscribers is a more reliable channel than 5,000 page views.  
**Recommended fix:** Add email signup to the footer (every page), the writing index page, and optionally via a scroll-triggered banner on blog posts.  
**Priority:** P1  
**Expected impact:** Builds an owned audience; compounds over time  
**Owner:** Developer

---

### 2.6 Expand the About Page

**Issue:** The About page renders the same `AboutPreview` component as the homepage, plus shared sections (TrustBar, ResultsStrip, Testimonials, FinalCTA). No new information.  
**Why it matters:** The About page is where prospects decide if they trust you. A recycled homepage section says "I did not have more to say." This hurts credibility.  
**Recommended fix:** Write a dedicated About page: career narrative, working philosophy, process/methodology, tools/certifications, and a professional photo. Remove redundant shared sections.  
**Priority:** P2  
**Expected impact:** Stronger trust-building for mid-funnel prospects  
**Owner:** Copywriter + Developer

---

## Phase 3: Longer-Term Improvements (Weeks 4+)

Growth plays that build on the foundation set by Phases 1 and 2.

---

### 3.1 Publish 10+ Blog Posts

**Issue:** The site will have blog routes after Phase 2, but no content to fill them.  
**Why it matters:** Routes without content are just empty shelves. Longtail SEO requires volume and consistency.  
**Recommended fix:** Publish 2–3 posts per week covering: SEO strategy, paid media tips, automation workflows, "how to hire a marketing consultant" guides. Each post 1,000+ words with internal links to service pages.  
**Priority:** P2  
**Expected impact:** Gradual organic traffic growth, topical authority  
**Owner:** Copywriter (with optional AI assist from existing CMS)

---

### 3.2 Create a Pricing or "Working Together" Page

**Issue:** No pricing information anywhere. Prospects cannot self-qualify.  
**Why it matters:** Every visitor wonders about cost. Saying nothing about it means every prospect must contact you just to learn if they can afford you — most will not bother.  
**Recommended fix:** Create `/pricing` or `/working-together`. Three tiers or engagement models: consultation, monthly retainer, project-based. Include ranges (even broad ones). Address common objections in an FAQ section.  
**Priority:** P2  
**Expected impact:** More qualified leads, fewer wasted discovery calls  
**Owner:** Copywriter + Developer

---

### 3.3 Redesign the Footer

**Issue:** Footer has name, email, LinkedIn, GitHub, and copyright. No navigation, no newsletter signup, no secondary CTAs.  
**Why it matters:** The footer is one of the most-viewed areas of any website. Currently wasted space.  
**Recommended fix:** Add: navigation columns (Services, Resources, Company), newsletter signup, social links, location info.  
**Priority:** P3  
**Expected impact:** Better navigation, additional conversion touchpoints  
**Owner:** Developer

---

### 3.4 Consolidate Navbar and Resolve CTA Redundancy

**Issue:** Nine items in the navbar. "Contact" and "Get in Touch" go to the same page. Login/Signup confuse portfolio visitors.  
**Why it matters:** Navigation overload creates decision fatigue. Mixed signals about what the site is (portfolio vs. SaaS) confuse first-time visitors.  
**Recommended fix:** Remove "Get in Touch" as a separate button (Contact link is enough), move Login/Sign Up to a footer "Client Portal" link, promote SEO Tools more prominently.  
**Priority:** P3  
**Expected impact:** Cleaner navigation, less confusion  
**Owner:** Developer + UX

---

### 3.5 Get Real Testimonials

**Issue:** Three testimonials, all 5 stars, each mapping 1:1 to a case study. The symmetry feels manufactured.  
**Why it matters:** Savvy buyers notice patterns. Perfect alignment between case studies and testimonials signals "designed to fill a template" rather than "collected from real clients."  
**Recommended fix:** Collect genuine testimonials from real clients. Even a 2-sentence LinkedIn recommendation with a real name and headshot is more credible than a templated 5-star quote.  
**Priority:** P3  
**Expected impact:** Stronger social proof, reduced skepticism  
**Owner:** Business owner

---

### 3.6 Build Landing Pages for Paid Campaigns

**Issue:** No standalone landing pages. If Shree ever runs ads for their own business, there is no focused page to send traffic to.  
**Why it matters:** Driving ad traffic to the homepage is wasteful. Landing pages convert 2–5x better than general pages because they have a single message and single CTA.  
**Recommended fix:** Create: `/lp/free-seo-audit` (promotes the tool), `/lp/book-a-call` (Calendly embed with value framing), and optionally `/lp/marketing-services` (stripped-down homepage with contact form).  
**Priority:** P3  
**Expected impact:** Enables paid acquisition with proper conversion tracking  
**Owner:** Developer + Conversion strategist
