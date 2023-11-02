import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Metawizard",
    description:
      "An open-source metadata builder tool for generating metadata and metadata file conventions for Next.js apps.",
    images: "",
    creator: "@jal_eell",
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
