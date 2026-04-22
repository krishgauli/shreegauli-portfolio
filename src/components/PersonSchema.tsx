import {
  BUSINESS_NAME,
  SITE_EMAIL,
  SITE_LOCATION,
  SITE_NAME,
  SITE_PHONE_E164,
  SITE_URL,
} from "@/lib/site";

export default function PersonSchema() {
  const PERSON_ID = `${SITE_URL}/#person`;
  const WEBSITE_ID = `${SITE_URL}/#website`;
  const BUSINESS_ID = `${SITE_URL}/#local-business`;
  const SERVICE_ID = `${SITE_URL}/#professional-service`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    jobTitle: 'Full-Stack Web Developer & SEO Consultant',
    description:
      'Full-stack web developer and SEO consultant specializing in Next.js, WordPress, Shopify, SEO/AEO/GEO, and marketing automation. Based in Dallas, TX.',
    url: SITE_URL,
    image: `${SITE_URL}/shree-gauli.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_LOCATION.city,
      addressRegion: SITE_LOCATION.region,
      addressCountry: SITE_LOCATION.country,
    },
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'WordPress',
      'Shopify',
      'Search Engine Optimization',
      'Answer Engine Optimization',
      'Marketing Automation',
      'n8n',
      'Tailwind CSS',
      'Prisma',
      'Supabase',
    ],
    sameAs: [
      'https://www.linkedin.com/in/gauli/',
    ],
    worksFor: {
      '@id': BUSINESS_ID,
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Shree Krishna Gauli',
    url: SITE_URL,
    description:
      'Work directly with Shree Krishna Gauli on custom web development, SEO, and marketing automation systems built for measurable growth.',
    author: {
      '@id': PERSON_ID,
    },
    publisher: {
      '@id': BUSINESS_ID,
    },
    inLanguage: 'en-US',
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/shree-gauli.png`,
    email: SITE_EMAIL,
    telephone: SITE_PHONE_E164,
    founder: {
      '@id': PERSON_ID,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_LOCATION.city,
      addressRegion: SITE_LOCATION.region,
      addressCountry: SITE_LOCATION.country,
    },
    sameAs: [
      'https://www.linkedin.com/in/gauli/',
    ],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${SITE_LOCATION.city}, ${SITE_LOCATION.region}`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE_EMAIL,
      telephone: SITE_PHONE_E164,
      areaServed: 'US',
      availableLanguage: ['en'],
    },
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: 'Shree Krishna Gauli - Web Development & SEO Consulting',
    url: SITE_URL,
    telephone: SITE_PHONE_E164,
    email: SITE_EMAIL,
    serviceType: [
      'Custom Web Application Development',
      'WordPress Development',
      'Shopify Development',
      'Search Engine Optimization',
      'Marketing Automation Consulting',
    ],
    provider: {
      '@id': PERSON_ID,
    },
    brand: {
      '@id': BUSINESS_ID,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_LOCATION.city,
      addressRegion: SITE_LOCATION.region,
      addressCountry: SITE_LOCATION.country,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${SITE_LOCATION.city}, ${SITE_LOCATION.region}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}
