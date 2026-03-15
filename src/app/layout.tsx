import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070B14",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Shree Krishna Gauli — Digital Marketing Specialist",
  description:
    "SEO, paid media, social media, and automation systems for brands that want clear growth. Based in Dallas. Working globally.",
  keywords: [
    "digital marketing specialist",
    "SEO",
    "paid media",
    "social media marketing",
    "n8n automation",
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
    title: "Shree Krishna Gauli — Digital Marketing Specialist",
    description:
      "SEO, paid media, social media, and automation systems for brands that want clear growth.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shree Krishna Gauli — Digital Marketing Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Krishna Gauli — Digital Marketing Specialist",
    description:
      "SEO, paid media, social media, and automation systems for brands that want clear growth.",
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
        {children}
      </body>
    </html>
  );
}
