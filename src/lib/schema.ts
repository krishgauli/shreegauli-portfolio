/**
 * Schema.org structured-data generators.
 *
 * Each function returns a plain object ready to be passed to <JsonLd />.
 * All URLs are absolute with the SITE_URL prefix.
 */

import {
  BUSINESS_NAME,
  SITE_EMAIL,
  SITE_LOCATION,
  SITE_NAME,
  SITE_PHONE_E164,
  SITE_URL,
} from "@/lib/site";

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
    serviceType: name,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#local-business`,
      name: BUSINESS_NAME,
      url: SITE_URL,
      telephone: SITE_PHONE_E164,
      email: SITE_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_LOCATION.city,
        addressRegion: SITE_LOCATION.region,
        addressCountry: SITE_LOCATION.country,
      },
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${SITE_LOCATION.city}, ${SITE_LOCATION.region}`,
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
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    givenName: "Shree Krishna",
    familyName: "Gauli",
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/shree-gauli.png`,
      width: 400,
      height: 400,
      caption: "Shree Krishna Gauli — Digital Marketing Consultant & Product Manager, Dallas TX",
    },
    description:
      "Digital Marketing Consultant, Automation Strategist, and Product Manager based in Dallas, TX. Specializes in SEO, AEO/GEO, n8n automation, paid media, and full-stack web development with Next.js, WordPress, and Shopify. Trusted by 15+ clients across healthcare, finance, SaaS, and e-commerce.",
    jobTitle: "Digital Marketing Consultant | Automation Strategist | Product Manager",
    email: `mailto:${SITE_EMAIL}`,
    telephone: SITE_PHONE_E164,
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Digital Marketing Consultant",
        description: "Delivers SEO, AEO/GEO, paid media, and content strategies that drive measurable revenue outcomes for healthcare, finance, SaaS, and e-commerce businesses.",
        occupationalCategory: "15-1199",
        estimatedSalary: { "@type": "MonetaryAmountDistribution", currency: "USD", duration: "P1Y", median: 95000 },
      },
      {
        "@type": "Occupation",
        name: "Product Manager",
        description: "Leads Agile and Waterfall software delivery, coordinates cross-functional engineering and marketing teams, and manages roadmaps for digital products.",
      },
      {
        "@type": "Occupation",
        name: "Marketing Automation Engineer",
        description: "Designs and deploys n8n workflows, AI chatbots, CRM automations, and appointment-reminder systems that save 20+ hours per week for client teams.",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_LOCATION.city,
      addressRegion: SITE_LOCATION.region,
      addressCountry: SITE_LOCATION.country,
    },
    areaServed: [
      { "@type": "City", name: "Dallas" },
      { "@type": "State", name: "Texas" },
      { "@type": "Country", name: "United States" },
    ],
    sameAs: [
      "https://www.linkedin.com/in/gauli/",
      "https://www.facebook.com/profile.php?id=61582408185149",
      "https://x.com/ShreeGauli",
      `${SITE_URL}/about`,
    ],
    knowsAbout: [
      "Search Engine Optimization (SEO)",
      "Answer Engine Optimization (AEO)",
      "Generative Engine Optimization (GEO)",
      "Technical SEO Audits",
      "Local SEO & Google Business Profile",
      "Marketing Automation with n8n",
      "AI Chatbots and CRM Integration",
      "Google Ads & Paid Media",
      "Next.js & React Development",
      "WordPress Development",
      "Shopify Development",
      "TypeScript & Tailwind CSS",
      "Prisma ORM & Supabase",
      "Product Management & Agile",
      "Healthcare Digital Marketing",
      "E-commerce SEO",
    ],
    knowsLanguage: [{ "@type": "Language", name: "English" }],
    nationality: { "@type": "Country", name: "United States" },
  };
}

/* ---------- WebSite + SearchAction ---------- */

export function websiteSearchActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Shree Gauli — Digital Marketing Consultant & Product Manager",
    url: SITE_URL,
    description:
      "Digital Marketing Consultant, Automation Strategist, and Product Manager specializing in SEO, AEO/GEO, paid media, and team leadership. Trusted by 15+ clients across the US.",
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
    },
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
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/shree-gauli.png`,
      jobTitle: "Digital Marketing Consultant | Automation Strategist | Product Manager",
      sameAs: ["https://www.linkedin.com/in/gauli/", "https://www.facebook.com/profile.php?id=61582408185149", "https://x.com/ShreeGauli"],
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
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
    "@type": "ProfessionalService",
    name: "Shree Gauli — Digital Marketing Consultant & Product Manager",
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
    "@id": `${SITE_URL}/#local-business`,
    name: "Shree Gauli — Digital Marketing Consultant & Product Manager",
    url: SITE_URL,
    image: `${SITE_URL}/shree-gauli.png`,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "Digital Marketing Consultant, Automation Strategist, and Product Manager specializing in SEO, AEO/GEO, paid media, and team leadership. Trusted by 15+ clients across the US.",
    telephone: SITE_PHONE_E164,
    email: SITE_EMAIL,
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: `${SITE_URL}/about`,
    },
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
    sameAs: [
      "https://www.linkedin.com/in/gauli/",
      "https://www.facebook.com/profile.php?id=61582408185149",
      "https://x.com/ShreeGauli",
    ],
    areaServed: [
      { "@type": "City", name: "Dallas" },
      { "@type": "State", name: "Texas" },
      { "@type": "Country", name: "US" },
    ],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development & Digital Marketing Services",
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
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Paid Media & Google Ads",
            description:
              "Google Ads strategy, campaign setup, attribution tracking, and ROI optimization for service businesses.",
          },
        },
      ],
    },
  };
}

/* ---------- ProfilePage (for About page E-E-A-T) ---------- */

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `About ${SITE_NAME} — Digital Marketing Consultant & Product Manager`,
    url: `${SITE_URL}/about`,
    inLanguage: "en-US",
    dateModified: "2025-05-16",
    description:
      "Professional profile and career history of Shree Krishna Gauli — Digital Marketing Consultant, Automation Strategist, and Product Manager based in Dallas, TX.",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      givenName: "Shree Krishna",
      familyName: "Gauli",
      jobTitle: "Digital Marketing Consultant | Automation Strategist | Product Manager",
      description:
        "Digital Marketing Consultant, Automation Strategist, and Product Manager based in Dallas, TX. 15+ clients served across healthcare, finance, SaaS, and e-commerce. Specialist in SEO, AEO/GEO, n8n automation, paid media, and full-stack web development.",
      url: SITE_URL,
      image: `${SITE_URL}/shree-gauli.png`,
      email: `mailto:${SITE_EMAIL}`,
      telephone: SITE_PHONE_E164,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_LOCATION.city,
        addressRegion: SITE_LOCATION.region,
        addressCountry: SITE_LOCATION.country,
      },
      sameAs: [
        "https://www.linkedin.com/in/gauli/",
        "https://www.facebook.com/profile.php?id=61582408185149",
        "https://x.com/ShreeGauli",
      ],
      worksFor: {
        "@type": "Organization",
        name: BUSINESS_NAME,
        url: SITE_URL,
      },
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
