/**
 * Schema.org structured-data generators.
 *
 * Each function returns a plain object ready to be passed to <JsonLd />.
 * All URLs are absolute with the SITE_URL prefix.
 */

const SITE_URL = "https://shreegauli.com";

/* ---------- BreadcrumbList ---------- */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };
}

/* ---------- FAQPage ---------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* ---------- Service ---------- */

export interface ServiceInput {
  name: string;
  description: string;
  path: string;
}

export function serviceSchema({ name, description, path }: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "Person",
      name: "Shree Krishna Gauli",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "US",
    },
  };
}

/* ---------- CollectionPage + ItemList ---------- */

export interface CollectionItem {
  name: string;
  url: string;
  position: number;
}

export function collectionPageSchema(
  name: string,
  description: string,
  path: string,
  items: CollectionItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
      })),
    },
  };
}

/* ---------- Person ---------- */

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shree Krishna Gauli",
    url: SITE_URL,
    image: `${SITE_URL}/shree-gauli.png`,
    jobTitle: "Digital Marketing Consultant",
    worksFor: {
      "@type": "Organization",
      name: "Shree Gauli Consulting",
      url: SITE_URL,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    sameAs: ["https://www.linkedin.com/in/gauli/"],
    knowsAbout: [
      "SEO",
      "Google Ads",
      "Marketing Automation",
      "Lead Conversion Optimization",
      "AEO/GEO",
      "Healthcare Marketing",
    ],
  };
}

/* ---------- WebSite + SearchAction ---------- */

export function websiteSearchActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shree Gauli — Digital Marketing Consultant",
    url: SITE_URL,
    description:
      "Dallas-based digital marketing consultant specializing in SEO, Google Ads, and lead conversion systems for healthcare practices and service businesses.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ---------- Article (for blog posts) ---------- */

export interface ArticleSchemaInput {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
  wordCount?: number;
  category?: string;
  keywords?: string[];
}

export function articleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url.startsWith("http") ? input.url : `${SITE_URL}${input.url}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    ...(input.image && { image: input.image }),
    ...(input.wordCount && { wordCount: input.wordCount }),
    ...(input.category && { articleSection: input.category }),
    ...(input.keywords?.length && { keywords: input.keywords.join(", ") }),
    author: {
      "@type": "Person",
      name: "Shree Krishna Gauli",
      url: SITE_URL,
      jobTitle: "Digital Marketing Consultant",
      sameAs: ["https://www.linkedin.com/in/gauli/"],
    },
    publisher: {
      "@type": "Person",
      name: "Shree Krishna Gauli",
      url: SITE_URL,
    },
  };
}

/* ---------- HowTo ---------- */

export interface HowToStep {
  name: string;
  text: string;
}

export function howToSchema(name: string, description: string, steps: HowToStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/* ---------- AggregateRating + Review ---------- */

export interface ReviewInput {
  author: string;
  reviewBody: string;
  ratingValue: number;
}

export function aggregateRatingSchema(reviews: ReviewInput[]) {
  const avg = reviews.reduce((sum, r) => sum + r.ratingValue, 0) / reviews.length;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Shree Gauli — Digital Marketing Consultant",
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Math.round(avg * 10) / 10,
      bestRating: 5,
      worstRating: 1,
      ratingCount: reviews.length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.ratingValue,
        bestRating: 5,
      },
    })),
  };
}

/* ---------- ItemList (standalone) ---------- */

export function itemListSchema(
  name: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/* ---------- SpeakableSpecification ---------- */

export function speakableSchema(url: string, cssSelectors: string[] = ["h1", ".sg-blog-h2", ".sg-blog-p"]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

/* ---------- ProfessionalService ---------- */

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Shree Gauli — Digital Marketing Consultant",
    url: SITE_URL,
    image: `${SITE_URL}/shree-gauli.png`,
    description:
      "Dallas-based digital marketing consultant specializing in SEO, Google Ads, and lead conversion systems for healthcare practices and service businesses.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.7767,
      longitude: -96.797,
    },
    areaServed: [
      { "@type": "City", name: "Dallas" },
      { "@type": "State", name: "Texas" },
      { "@type": "Country", name: "US" },
    ],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Content Strategy",
            description:
              "Technical audits, keyword strategy, and content systems for organic growth.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Ads & Paid Media",
            description:
              "Campaign management with real attribution and conversion tracking.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lead Conversion & Automation",
            description:
              "CRM workflows, AI follow-up, and lead-routing systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Reporting & Dashboards",
            description:
              "Live dashboards tied to business outcomes with GA4 and Looker Studio.",
          },
        },
      ],
    },
  };
}
