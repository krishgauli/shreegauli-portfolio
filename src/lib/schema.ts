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
