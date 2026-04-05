import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import PersonSchema from "@/components/PersonSchema";
import { Providers } from "@/components/Providers";
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
  themeColor: "#070B14",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Shree Krishna Gauli — Digital Marketing Consultant",
  description:
    "Work directly with Shree Krishna Gauli on SEO, Google Ads, and marketing automation systems built for measurable growth.",
  keywords: [
    "digital marketing consultant",
    "SEO consultant",
    "Google Ads specialist",
    "marketing automation",
    "Shree Krishna Gauli",
    "Dallas",
  ],
  authors: [{ name: "Shree Krishna Gauli", url: "https://shreegauli.com" }],
  creator: "Shree Krishna Gauli",
  metadataBase: new URL("https://shreegauli.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shreegauli.com",
    siteName: "Shree Krishna Gauli",
    title: "Shree Krishna Gauli — Digital Marketing Consultant",
    description:
      "Work directly with Shree Krishna Gauli on SEO, Google Ads, and marketing automation systems built for measurable growth.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shree Krishna Gauli — Digital Marketing Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Krishna Gauli — Digital Marketing Consultant",
    description:
      "Work directly with Shree Krishna Gauli on SEO, Google Ads, and marketing automation systems built for measurable growth.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
        </Providers>
      </body>
    </html>
  );
}
