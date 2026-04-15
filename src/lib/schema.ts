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
    jobTitle: "Full-Stack Web Developer & SEO Consultant",
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
      "Next.js",
      "React",
      "TypeScript",
      "WordPress",
      "Shopify",
      "SEO",
      "AEO/GEO",
      "n8n Automation",
      "Tailwind CSS",
      "Prisma",
      "Supabase",
    ],
  };
}

/* ---------- WebSite + SearchAction ---------- */

export function websiteSearchActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shree Gauli — Full-Stack Web Developer & SEO Consultant",
    url: SITE_URL,
    description:
      "Full-stack web developer building custom websites and web apps with Next.js, WordPress, and Shopify — plus SEO, AEO/GEO, and automation for businesses across the US.",
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
      jobTitle: "Full-Stack Web Developer & SEO Consultant",
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
    name: "Shree Gauli — Full-Stack Web Developer & SEO Consultant",
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
    name: "Shree Gauli — Full-Stack Web Developer & SEO Consultant",
    url: SITE_URL,
    image: `${SITE_URL}/shree-gauli.png`,
    description:
      "Full-stack web developer building custom websites and web apps with Next.js, WordPress, and Shopify — plus SEO, AEO/GEO, and automation for businesses across the US.",
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
      name: "Web Development & SEO Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web App Development",
            description:
              "Custom websites and web applications built with Next.js, React, TypeScript, and Tailwind CSS.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WordPress Development",
            description:
              "Professional WordPress sites with custom themes, speed optimization, and SEO.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Shopify Development",
            description:
              "Shopify stores with custom theme design, product SEO, and conversion optimization.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO / AEO / GEO",
            description:
              "Technical SEO, AI search optimization, and geo-targeted search strategies.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Marketing Automation",
            description:
              "n8n workflows, AI chatbots, appointment reminders, and CRM integrations.",
          },
        },
      ],
    },
  };
}

/* ---------- EducationalOccupationalCredential ---------- */

export interface CredentialInput {
  name: string;
  focus: string;
  issuer: string;
  dateISO: string;
  verifyUrl: string;
}

export function credentialListSchema(credentials: CredentialInput[]) {
  return credentials.map((c) => ({
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: `${c.name} — ${c.focus}`,
    description: `Acadium apprenticeship completion certificate for ${c.focus}. 3-month mentored engagement delivering real client projects.`,
    credentialCategory: "certificate",
    recognizedBy: {
      "@type": "Organization",
      name: c.issuer,
      url: "https://acadium.com",
    },
    dateCreated: c.dateISO,
    url: c.verifyUrl,
    about: {
      "@type": "Person",
      name: "Shree Krishna Gauli",
      url: SITE_URL,
    },
  }));
}
