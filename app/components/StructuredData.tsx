import { studio, works } from '@/lib/works';

const SITE_URL = 'https://qualiseramdesign.com';

export default function StructuredData() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: studio.name,
    description:
      'Bespoke furniture studio. Hand-built tables, cabinets, and built-ins in walnut, cherry, ash, and salvage.',
    url: SITE_URL,
    foundingDate: String(studio.established),
    founder: {
      '@type': 'Person',
      name: 'Edward Reno',
      jobTitle: 'Furniture Maker',
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Columbia University' },
        { '@type': 'CollegeOrUniversity', name: 'University of Chicago' },
      ],
    },
    slogan: studio.motto.la,
    logo: `${SITE_URL}/brand/seal.png`,
    image: `${SITE_URL}/og.jpg`,
    sameAs: [],
    knowsAbout: [
      'Bespoke furniture',
      'Cabinetmaking',
      'Live-edge tables',
      'Parquetry',
      'Hand carving',
      'Wood joinery',
    ],
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#works`,
    name: 'Works',
    numberOfItems: works.length,
    itemListElement: works.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: w.name.en,
        description: w.description.en,
        material: w.material.en,
        dateCreated: w.year ? String(w.year) : undefined,
        creator: { '@type': 'Person', name: 'Edward Reno' },
        image: `${SITE_URL}/images/${w.folder}/${encodeURIComponent(w.images[w.primaryImageIndex])}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}
