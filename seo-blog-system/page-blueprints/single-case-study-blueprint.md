# Single Case Study Blueprint

Each case study page is essentially a sales page disguised as a story. Someone who lands here is evaluating whether you can deliver results for *them*. The structure follows a straightforward arc: what was broken, what you did about it, and what happened. If the numbers are good, let them do the talking.

## Page Details

| Field | Value |
|-------|-------|
| URL | /work/[slug] |
| Primary Keyword | Varies per case study |
| Page Purpose | Prove competence with measurable results, drive to service page and contact |
| Search Intent | Commercial Investigation |

## Current Case Studies

### 1. SEO Growth — `/work/seo-growth`
| Element | Value |
|---------|-------|
| Primary Keyword | SEO case study, organic traffic growth |
| SEO Title | SEO Case Study: 340% Organic Growth | Shree Krishna Gauli |
| Meta Description | How we achieved 340% organic traffic growth through technical SEO, content strategy, and link building. See the full SEO case study and results breakdown. |
| H1 | SEO Growth: 340% Organic Traffic Increase |
| Headline Stat | 340% organic traffic growth |

### 2. Paid Media — `/work/paid-media`
| Element | Value |
|---------|-------|
| Primary Keyword | paid media case study, Google Ads results |
| SEO Title | Paid Media Case Study: 4.8x ROAS | Shree Krishna Gauli |
| Meta Description | How our paid media strategy delivered 4.8x return on ad spend. See campaign structure, results, and key takeaways from this Google Ads case study. |
| H1 | Paid Media: 4.8x Return on Ad Spend |
| Headline Stat | 4.8x ROAS |

### 3. Automation — `/work/automation`
| Element | Value |
|---------|-------|
| Primary Keyword | marketing automation case study, n8n workflow |
| SEO Title | Automation Case Study: 20+ Hours Saved Per Week | Shree Krishna Gauli |
| Meta Description | How n8n automation workflows saved 20+ hours per week in marketing operations. See the full automation case study with before/after metrics. |
| H1 | Automation: 20+ Hours Saved Per Week |
| Headline Stat | 20+ hours saved/week |

## Content Sections — The Standard Template

Every case study should follow this structure. Consistency makes them easier to write and easier to read. The reader should always know where to look for the results.

### 1. Breadcrumb
- **Format:** Home > Our Work > {Case Study Title}
- **Schema:** BreadcrumbList

### 2. Hero Section
- **H1:** {Title with headline result}
- **Stat bar:** 3–4 key metrics (before/after or key outcomes)
- **Service badge:** Link to relevant service page

### 3. Challenge / Problem
- **H2:** "The Challenge"
- Set the scene: who's the client, what were they dealing with?
- Their goals
- What was broken or underperforming
- 2–3 specific pain points — the more concrete, the better. "Traffic was declining" is okay. "Organic traffic dropped 40% after a site migration" is much better.

### 4. Strategy / Approach
- **H2:** "Our Approach"
- Step-by-step description of the strategy
- Tools and frameworks used
- Timeline
- Link to relevant service page (inline)

### 5. Implementation
- **H2:** "Implementation"
- What was done, in detail
- Screenshots or visuals (optional)
- Process flow or timeline

### 6. Results
- **H2:** "Results"
- **Format:** Stat cards or before/after comparison table
- Key metrics with percentage changes
- Timeframe of results
- Supporting data visualizations

### 7. Key Takeaways
- **H2:** "Key Takeaways"
- 3–5 bullet points summarizing what worked and why
- These should be actionable — someone reading this should walk away with at least one idea they could apply to their own situation, even if they never hire you

### 8. Related Service CTA
- **Heading:** "Want similar results?"
- **Button:** "Get a Free {Service} Audit" or "Book a Strategy Call"
- **Link:** /lp/book-a-call or /seo-tools

### 9. Related Content
- **Related blog posts** (2–3 from same category)
- **Other case studies** (1–2)

## Schema

| Schema Type | Details |
|-------------|---------|
| Article | Full case study content |
| BreadcrumbList | Home > Our Work > {Title} |

### Article JSON-LD Structure
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{Case Study Title}",
  "description": "{Meta description}",
  "url": "https://shreegauli.com/work/{slug}",
  "datePublished": "{publish date}",
  "dateModified": "{last update}",
  "author": {
    "@type": "Person",
    "name": "Shree Krishna Gauli"
  },
  "publisher": {
    "@type": "Person",
    "name": "Shree Krishna Gauli"
  },
  "image": "{cover image URL}"
}
```

## Internal Links Per Case Study

| Link | Target |
|------|--------|
| Related service page | /services/{service-slug} |
| Related blog posts | /blogs/{related-slug} |
| Other case studies | /work/{other-slug} |
| CTA | /lp/book-a-call |
| SEO tools (for SEO case study) | /seo-tools |
| Back to all case studies | /work |

## What Would Make These Stronger

1. **Before/after stat comparison** — visual side-by-side cards (Before: X → After: Y). This is the highest-impact visual element. Nothing persuades like a clear contrast.
2. **Client testimonial quote** — inline quote from the client, ideally right near the results section. Even one sentence adds credibility that no amount of your own writing can match.
3. **"Next case study" navigation** — a bottom link to cycle through case studies. Keeps people exploring.
4. **Downloadable PDF option** — "Download this case study as PDF" for lead generation. It's a soft conversion point.
5. **Structured data** — Article + BreadcrumbList JSON-LD on every case study page. Non-negotiable for SEO.
6. **Timeline visualization** — a simple visual showing the phases of the project. Not essential, but it makes the "Implementation" section more scannable.
