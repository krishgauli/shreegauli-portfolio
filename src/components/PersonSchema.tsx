export default function PersonSchema() {
  const SITE_URL = 'https://shreegauli.com';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Shree Krishna Gauli',
    jobTitle: 'Digital Marketing Specialist',
    description:
      'Digital marketing specialist focusing on SEO, paid media, social media, and marketing automation. Based in Dallas, TX.',
    url: SITE_URL,
    email: 'hello@shreegauli.com',
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
      'https://linkedin.com/in/shreegauli',
      'https://github.com/shreegauli',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shree Krishna Gauli',
    url: SITE_URL,
    description:
      'SEO, paid media, social media, and automation systems for brands that want clear growth.',
    author: {
      '@id': `${SITE_URL}/#person`,
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
    </>
  );
}
