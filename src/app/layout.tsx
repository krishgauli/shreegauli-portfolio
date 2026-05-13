import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import PersonSchema from "@/components/PersonSchema";
import CookieConsent from "@/components/CookieConsent";
import { Providers } from "@/components/Providers";
import { BRAND_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "optional",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

export const viewport: Viewport = {
  themeColor: "#FDFAF5",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: `Dallas Digital Marketing Consultant & Product Manager | ${BRAND_NAME}`,
  description:
    "Dallas Digital Marketing Consultant, Automation Strategist, and Product Manager. SEO, AEO/GEO, paid media, and automation for 15+ clients across the US.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "digital marketing consultant",
    "automation strategist",
    "product manager dallas",
    "SEO consultant",
    "AEO GEO optimization",
    "paid media specialist",
    "Dallas marketing consultant",
    SITE_NAME,
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `Dallas Digital Marketing Consultant & Product Manager | ${BRAND_NAME}`,
    description:
      "Dallas Digital Marketing Consultant, Automation Strategist, and Product Manager. SEO, AEO/GEO, paid media, and automation for 15+ clients across the US.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `Dallas Digital Marketing Consultant & Product Manager | ${BRAND_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Dallas Digital Marketing Consultant & Product Manager | ${BRAND_NAME}`,
    description:
      "Dallas Digital Marketing Consultant, Automation Strategist, and Product Manager. SEO, AEO/GEO, paid media, and automation for 15+ clients across the US.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#7C3AED] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          <PersonSchema />
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
