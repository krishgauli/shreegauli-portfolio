# Schema Markup Plan

## Why This Matters

Schema markup is how you tell Google exactly what's on your page in a language it understands natively. Without it, Google has to guess — and it doesn't always guess right. With the right JSON-LD in place, you become eligible for rich results: FAQ dropdowns, breadcrumb trails, star ratings, article cards, and more. These visual enhancements in search results can meaningfully increase click-through rates.

That said, don't go overboard. Add the schemas that are relevant, validate them, and move on. Google ignores schema types it doesn't support, and adding irrelevant markup just creates maintenance overhead.

---

## Global Schema — Present on Every Page

These two schemas go in `layout.tsx` and apply site-wide. The Person schema is already implemented, which is great. The WebSite schema should be added — it's what makes the sitelinks searchbox appear in Google results.

### Organization / Person (already in layout.tsx)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shree Krishna Gauli",
  "url": "https://shreegauli.com",
  "sameAs": [
    "https://linkedin.com/in/shreegauli",
    "https://twitter.com/shreegauli"
  ],
  "jobTitle": "Digital Marketing Strategist",
  "knowsAbout": ["SEO", "Paid Media", "Social Media Marketing", "Marketing Automation", "n8n"],
  "image": "https://shreegauli.com/shree-gauli.jpg"
}
```

### WebSite (should be added to layout.tsx)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Shree Krishna Gauli",
  "url": "https://shreegauli.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://shreegauli.com/blogs?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## Page-Specific Schema

Each page type gets its own schema on top of the global ones. I've listed what exists, what needs to be added, and the priority level for each.

### Homepage (`/`)
| Schema | Purpose |
|--------|---------|
| Person | Primary entity |
| WebSite | Site-level schema with SearchAction |
| BreadcrumbList | Not needed (root page) |

### About (`/about`)
| Schema | Purpose |
|--------|---------|
| Person (expanded) | Full bio, credentials, skills, education |
| BreadcrumbList | Home > About |

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shree Krishna Gauli",
  "url": "https://shreegauli.com/about",
  "description": "Digital marketing strategist specializing in SEO, paid media, and automation.",
  "knowsAbout": ["SEO", "Google Ads", "Social Media", "n8n Automation"],
  "hasCredential": [],
  "alumniOf": [],
  "image": "https://shreegauli.com/shree-gauli.jpg"
}
```

### Service Pages (`/services`, `/services/{slug}`)
| Schema | Purpose |
|--------|---------|
| Service | Describes the service offered |
| BreadcrumbList | Home > Services > {Service Name} |

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{Service Name}",
  "description": "{Service description}",
  "url": "https://shreegauli.com/services/{slug}",
  "provider": {
    "@type": "Person",
    "name": "Shree Krishna Gauli",
    "url": "https://shreegauli.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "serviceType": "{SEO / PPC / Social Media / Automation}"
}
```

### Blog Hub (`/blogs`)
| Schema | Purpose |
|--------|---------|
| CollectionPage | Blog index |
| ItemList | List of blog posts |
| BreadcrumbList | Home > Blog |

### Blog Posts (`/blogs/{slug}`)
| Schema | Purpose | Status |
|--------|---------|--------|
| BlogPosting | Full article data | ✅ Already implemented |
| BreadcrumbList | Home > Blog > {Title} | ❌ Not yet implemented |

**Enhancement needed for existing BlogPosting:**
```json
{
  "mainEntityOfPage": "https://shreegauli.com/blogs/{slug}",
  "wordCount": 1500,
  "keywords": ["keyword1", "keyword2"],
  "articleSection": "SEO"
}
```

### Case Studies Hub (`/work`)
| Schema | Purpose |
|--------|---------|
| CollectionPage | Case study index |
| ItemList | List of case studies |
| BreadcrumbList | Home > Our Work |

### Case Study Posts (`/work/{slug}`)
| Schema | Purpose |
|--------|---------|
| Article | Case study content |
| BreadcrumbList | Home > Our Work > {Title} |

### FAQ Page (`/faq`)
| Schema | Purpose |
|--------|---------|
| FAQPage | Enables rich FAQ snippets in SERPs |
| BreadcrumbList | Home > FAQ |

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{question text}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{answer text}"
      }
    }
  ]
}
```

### Testimonials (`/testimonials`)
| Schema | Purpose |
|--------|---------|
| Review (aggregate) | Shows star ratings in SERPs |
| BreadcrumbList | Home > Testimonials |

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shree Krishna Gauli",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "12",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": {"@type": "Person", "name": "{client name}"},
      "reviewRating": {"@type": "Rating", "ratingValue": "5"},
      "reviewBody": "{testimonial text}"
    }
  ]
}
```

### Landing Pages (`/lp/*`)
| Schema | Purpose |
|--------|---------|
| WebPage | Standard page schema |
| FAQPage | If FAQ section exists on the landing page |
| BreadcrumbList | Home > {Page Name} |

### Contact (`/contact`)
| Schema | Purpose |
|--------|---------|
| ContactPage | Contact page type |
| BreadcrumbList | Home > Contact |

### Pricing (`/pricing`)
| Schema | Purpose |
|--------|---------|
| WebPage | Standard page |
| Offer / PriceSpecification | If specific pricing tiers are listed |
| BreadcrumbList | Home > Pricing |

---

## BreadcrumbList Template

Use on every page except the homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://shreegauli.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{Parent Page}",
      "item": "https://shreegauli.com/{parent-slug}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{Current Page}",
      "item": "https://shreegauli.com/{full-path}"
    }
  ]
}
```

---

## What to Build First

Not all schema is created equal. Here's the priority order based on which schemas are most likely to produce visible results in search.

| Priority | Schema | Pages | Why It Matters |
|----------|--------|-------|--------|
| P1 | BreadcrumbList | All pages (except home) | Breadcrumb rich results in SERPs |
| P1 | FAQPage | /faq, landing pages with FAQ | FAQ rich snippets |
| P1 | BlogPosting enhancements | /blogs/{slug} | Richer article snippets |
| P2 | Service | /services/{slug} | Service knowledge panel |
| P2 | Review / AggregateRating | /testimonials | Star ratings in SERPs |
| P2 | CollectionPage + ItemList | /blogs, /work | Better page type signals |
| P3 | WebSite + SearchAction | Global | Sitelinks searchbox |
| P3 | Person (expanded) | /about | Knowledge panel |

---

## How to Implement This

The cleanest approach is a shared component. Create it once, use it everywhere.

### Recommended: A Reusable JsonLd Component

Put this at `src/components/JsonLd.tsx`:

```tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Then use in pages:
```tsx
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "Service",
  // ...
}} />
```

### Validating Your Schema

After adding any schema, test it before deploying:
- [Google's Rich Results Test](https://search.google.com/test/rich-results) — this is the one that matters most, since it shows what Google actually sees
- [Schema.org Validator](https://validator.schema.org/) — useful for catching syntax errors
- Check Search Console's Enhancements section after deployment for any warnings or errors

Don't skip validation. A single missing comma in your JSON-LD will silently break the entire schema block, and you won't know until you check.
