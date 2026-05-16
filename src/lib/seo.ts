import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const defaultImage = "/og-image.jpg";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Override OG image (default: /og-image.jpg) */
  ogImage?: string;
  /** Mark noindex (e.g. landing page variants) */
  noindex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = defaultImage,
  noindex = false,
}: SeoOptions): Metadata {
  const absolutePageUrl = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    /* E-E-A-T: attaches a named author to every page */
    authors: [{ name: SITE_NAME, url: `${SITE_URL}/about` }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absolutePageUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@ShreeGauli",
      site: "@ShreeGauli",
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };
}
