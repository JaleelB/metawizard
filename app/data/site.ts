import { z } from "zod";
import { authorConfigSchema } from "@/schemas/schema";
import { siteImagesConfigType } from "./images";
import { retrieveFromStorage } from "@/hooks/storage";
import { siteConfigSchema } from "@/schemas/schema";

export type siteConfig = z.infer<typeof siteConfigSchema>;

export async function generatesiteConfigData() {
  const siteConfig = await retrieveFromStorage<siteConfig>(
    "siteConfig",
    "session"
  );

  return {
    siteName: siteConfig?.siteName ?? "",
    siteDescription: siteConfig?.siteDescription ?? "",
    siteUrl: siteConfig?.siteUrl ?? "",
    siteKeywords: siteConfig?.siteKeywords ?? [],
  };
}

export type authorType = z.infer<typeof authorConfigSchema>;

export async function generateAuthorData() {
  const authorConfig = await retrieveFromStorage<authorType>(
    "authorConfig",
    "session"
  );

  return {
    authors: authorConfig?.authors ?? [],
    creator: authorConfig?.creator ?? "",
    twitterUsername: authorConfig?.twitterUsername ?? "",
  };
}

export async function generateMetadataObject() {
  const { siteName, siteDescription, siteUrl, siteKeywords } =
    await generatesiteConfigData();

  const { authors, creator, twitterUsername } = await generateAuthorData();

  const siteImagesConfig = await retrieveFromStorage<siteImagesConfigType>(
    "siteImagesConfig",
    "session"
  );

  // Construct the metadata string template
  const metadataTemplate = `export const metadata: Metadata = {
  metadataBase: new URL('${siteUrl}'),
  title: {
    default: '${siteName}',
    template: \`\$%s - ${siteName}\`,
  },
  description: '${siteDescription}',
  keywords: [
    ${siteKeywords.map((keywordObj) => `'${keywordObj.text}'`).join(", ")}
  ],
  authors: [
    ${authors?.map(
      (author) => `
      {
        name: "${author.name}",
        url: "${author.url}",
      }
    `
    )}
  ],
  creator: '${creator}',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: '${siteUrl}',
    title: '${siteName}',
    description: '${siteDescription}',
    siteName: '${siteName}',
  },
  twitter: {
    card: "summary_large_image",
    title: '${siteName}',
    description: '${siteDescription}',
    images: '${
      siteImagesConfig?.openGraphImageStyles ? ["${siteUrl}/og.jpg"] : ""
    }',
    creator: '${twitterUsername ? `@${twitterUsername}` : ""}',
  },
  icons: {
    icon: "/favicon.ico",
  },
};`;

  return metadataTemplate;
}
