import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { GeistSans } from "geist/font";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://metawizard.vercel.app/"),
  title: {
    default: "Metawizard",
    template: `$%s - Metawizard`,
  },
  description:
    "An open-source metadata builder tool for generating metadata and metadata file conventions for Next.js apps.",
  keywords: [
    "Next.js",
    "metadata",
    "SEO",
    "next-seo",
    "metadata builder",
    "next.js metadata builder",
    "Next.js SEO builder",
    "Next.js metadata integration",
    "seo management",
    "metadata management",
  ],
  authors: [
    {
      name: "Jaleel Bennett",
      url: "https://twitter.com/jal_eell",
    },
  ],
  creator: "JaleelB",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://metawizard.vercel.app/",
    title: "Metawizard",
    description:
      "An open-source metadata builder tool for generating metadata and metadata file conventions for Next.js apps.",
    siteName: "Metawizard",
    images: [
      {
        url: `${siteConfig.url}/web-shot.png`,
        width: 1200,
        height: 715,
        alt: "Callsquare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metawizard",
    description:
      "An open-source metadata builder tool for generating metadata and metadata file conventions for Next.js apps.",
    creator: "@jal_eell",
    images: [`${siteConfig.url}/web-shot.png`],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
        <Toaster />
        <Script
          async
          src={process.env.UMAMI_URL}
          data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
        />
      </body>
    </html>
  );
}
