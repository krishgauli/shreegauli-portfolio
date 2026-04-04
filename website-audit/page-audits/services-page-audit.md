# Services Page Audit — shreegauli.com/services

---

## Page Purpose

The Services page should answer: "What exactly do you offer, and which of these is right for me?" It should list each service clearly, give enough detail for someone to self-qualify, and link to deeper explanations for those who want specifics.

---

## First Impression

The page opens with a `SectionHeader` titled something along the lines of digital marketing services. Below that, four service cards in a grid:

1. **Search Engine Optimization (SEO)**
2. **Paid Media & PPC**
3. **Social Media Marketing**
4. **Marketing Automation**

Each card has an icon, a short description (2–3 sentences), and a "Learn More" link. Below the cards, the page includes the shared sections: TrustBar, ResultsStrip, Testimonials, FinalCTA.

Visually, it is clean. The problem is what is not here.

---

## What Works

**Clear service categories.** Four services, clearly named, with reasonable groupings. A visitor can scan the page and understand the scope of what Shree offers in about five seconds.

**Consistent design.** Same dark theme, same card styling as the rest of the site. Animations are smooth but not distracting.

**Good metadata.** The title tag includes "Digital Marketing Services" and Dallas — solid for local SEO targeting.

---

## What Doesn't Work

**No individual service pages.** The "Learn More" buttons on each card have nowhere meaningful to go. There is no `/services/seo`, no `/services/paid-media`. The links either scroll to an anchor, loop back to the same page, or do nothing useful.

This is a big problem. Someone searching "SEO services Dallas" needs a page dedicated to SEO — not a card on a grid. Each service needs its own URL to rank for its own keywords, build topical depth, and give prospects enough information to make a decision.

**Thin descriptions.** Each service gets maybe 30–50 words. Not enough to explain what the service includes, what the process looks like, what tools are used, or what results to expect.

**No pricing signals.** Not even ranges. Nothing like "Starting at..." or "Typically $X/month." I understand that pricing is complex in services businesses, but giving zero indication means every prospect must contact you just to find out if they are in the right ballpark.

**No FAQ.** No structured FAQ for individual services. This is both a content and SEO miss — FAQ schema on service pages can capture featured snippets for "how much does SEO cost" type queries.

**ServicePageTemplate exists but is unused.** There is literally a component called `ServicePageTemplate.tsx` in the codebase. It was built to handle individual service pages. It has sections for overview, benefits, process steps, FAQ, and CTA. Nobody connected it to actual routes.

---

## Content Gaps

- Individual service detail pages (800+ words each)
- Service process/methodology explanations
- Tools and platforms used per service
- Pricing indicators or engagement models
- Comparison or "which service is right for me" guidance
- FAQ per service
- Client logos or mini case studies linked to specific services

---

## Messaging Issues

The descriptions are accurate but generic. "We help you rank higher in search results" is true for every SEO provider. What is Shree's specific approach? Do they focus on technical SEO? Content-driven SEO? Local SEO for small businesses? The current content does not say.

The same pattern repeats for each service. The messaging reads like placeholder text — correct enough to ship, but not specific enough to convert.

---

## UI/UX Issues

The four-card grid works on desktop. On mobile I would expect these stack vertically, which is fine. The shared sections below (TrustBar, ResultsStrip, Testimonials, FinalCTA) are the same ones that appear on the homepage and About page. By the time a visitor has seen three pages, they have seen these sections three times. Diminishing returns.

The "Learn More" links create a promise-and-disappointment loop. Clicking a link that goes nowhere (or back to the same page) is worse than having no link at all.

---

## SEO Issues

- Only one URL (`/services`) handles all four services — cannot rank for individual service keywords
- Thin content on the page overall — mostly shared sections
- No Service schema markup
- No FAQ schema
- No internal links to case studies that demonstrate each service
- Missing opportunity for 4+ additional indexable pages

---

## CTA / Conversion Issues

The CTAs are the shared FinalCTASection: "Get in Touch" and "Download Resume" (broken link). There is no service-specific CTA like "Request an SEO Audit" or "Book a PPC Strategy Call." A generic "Get in Touch" after showing four distinct services fails to capture the intent signal. Which service was the visitor looking at? That information is lost.

---

## Recommendations

1. **Create individual service pages.** `/services/seo`, `/services/paid-media`, `/services/social-media`, `/services/automation`. Use the `ServicePageTemplate` that already exists in the codebase. Each page: 800+ words, process overview, tools used, FAQ, related case study, and service-specific CTA.

2. **Add pricing signals.** Even "Retainers typically start at $X/month" or "Project rates from $X." If exact pricing is not possible, add "Request a Quote" buttons with a form that asks about budget range.

3. **Add FAQ schema to each service page.** 5–8 FAQs per service. Target "how much does [service] cost," "how long does [service] take to show results," "what is included in [service]."

4. **Link services to case studies.** The SEO card should link to the PrimeCare Dallas case study. The paid media card should link to AutoEdge Motors. Create these cross-connections.

5. **Add Service structured data.** ServiceType, provider, areaServed, description.

6. **Reduce shared section repetition.** On the Services page, the Testimonials section could show only the testimonial relevant to a specific service. The full TrustBar/ResultsStrip may not be needed.
