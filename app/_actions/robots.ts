import { z } from "zod";
import { getAllDataFromStore, openDB, dbName } from "./db";
import { robotsConfigSchema } from "@/schemas/schema";
import { type siteConfig } from "./site";
import { type sitemapConfig } from "./sitemaps";

export type robotsConfig = z.infer<typeof robotsConfigSchema>;

export async function generateRobotsTxtContent() {
  const db = await openDB(dbName);

  const robotsConfigData = (await getAllDataFromStore(
    db,
    "robotsConfig"
  )) as robotsConfig[];

  const sitemapConfigData = (await getAllDataFromStore(
    db,
    "sitemapConfig"
  )) as sitemapConfig[];

  const siteConfigData = (await getAllDataFromStore(
    db,
    "siteConfig"
  )) as siteConfig[];

  const sitemapConfig = sitemapConfigData[0];
  const robotsConfig = robotsConfigData[0];
  const siteConfig = siteConfigData[0];
  let sitemapUrl;

  if (sitemapConfig.generateSitemapFile) {
    sitemapUrl = `${siteConfig.siteUrl}/sitemap.xml`;
  }

  if (robotsConfig.generateRobotsFile) {
    if (robotsConfig.generateStaticRobotsFile) {
      const staticContent = `
        User-agent: *
        Disallow: 
        Sitemap: ${sitemapUrl}
    `;

      return staticContent;
    } else {
      const dynamicContent = `
        import { MetadataRoute } from 'next'

        export default function robots(): MetadataRoute.Robots {
            return {
                rules: {
                    userAgent: '*',
                    allow: '/',
                    disallow: '/private/',
                },
                sitemap: '${sitemapUrl}',
            }
        }
    `;

      return dynamicContent;
    }
  } else {
    console.log("Robots file generation is disabled");
    return null;
  }
}
