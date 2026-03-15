import type { Metadata } from "next";

const siteUrl = "https://shreegauli.com";
const siteName = "Shree Krishna Gauli";
const defaultImage = "/og-image.jpg";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: SeoOptions): Metadata {
  const absoluteUrl = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: defaultImage,
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
      images: [defaultImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
