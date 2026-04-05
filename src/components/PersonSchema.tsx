export default function PersonSchema() {
  const SITE_URL = 'https://shreegauli.com';
  const PERSON_ID = `${SITE_URL}/#person`;
  const WEBSITE_ID = `${SITE_URL}/#website`;
  const ORG_ID = `${SITE_URL}/#organization`;
  const SERVICE_ID = `${SITE_URL}/#professional-service`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Shree Krishna Gauli',
    jobTitle: 'Digital Marketing Consultant',
    description:
      'Digital marketing consultant focusing on SEO, paid media, social media, and marketing automation. Based in Dallas, TX.',
    url: SITE_URL,
    image: `${SITE_URL}/shree-gauli.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dallas',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    knowsAbout: [
      'Search Engine Optimization',
      'Paid Media',
      'Social Media Marketing',
      'Marketing Automation',
      'n8n',
      'Google Analytics',
      'Google Ads',
      'Meta Ads',
      'Content Strategy',
    ],
    sameAs: [
      'https://www.linkedin.com/in/gauli/',
    ],
    worksFor: {
      '@id': ORG_ID,
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Shree Krishna Gauli',
    url: SITE_URL,
    description:
      'Work directly with Shree Krishna Gauli on SEO, Google Ads, and marketing automation systems built for measurable growth.',
    author: {
      '@id': PERSON_ID,
    },
    publisher: {
      '@id': ORG_ID,
    },
    inLanguage: 'en-US',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Shree Krishna Gauli Consulting',
    url: SITE_URL,
    founder: {
      '@id': PERSON_ID,
    },
    sameAs: [
      'https://www.linkedin.com/in/gauli/',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'US',
    },
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: 'Shree Krishna Gauli - Digital Marketing Consulting',
    url: SITE_URL,
    serviceType: [
      'Search Engine Optimization',
      'Paid Media Consulting',
      'Marketing Automation Consulting',
      'Social Media Marketing Consulting',
    ],
    provider: {
      '@id': PERSON_ID,
    },
    brand: {
      '@id': ORG_ID,
    },
    areaServed: {
      '@type': 'Country',
      name: 'US',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}
