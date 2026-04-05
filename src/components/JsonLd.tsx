/**
 * Reusable JSON-LD structured data component.
 *
 * Usage:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", ... }} />
 *
 * Supports a single schema object or an array of objects (rendered as
 * separate <script> tags so validators can parse each independently).
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
