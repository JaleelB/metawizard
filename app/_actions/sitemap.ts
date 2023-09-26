import { z } from "zod";
import { getAllDataFromStore, openDB, dbName } from "./db";
import { sitemapConfigSchema } from "@/schemas/schema";
import { type siteConfig } from "./site";

export type sitemapConfig = z.infer<typeof sitemapConfigSchema>;

export async function generatesiteMapXMLContent() {
  const db = await openDB(dbName);
  const sitemapConfigData = (await getAllDataFromStore(
    db,
    "sitemapConfig"
  )) as sitemapConfig[];

  const siteConfigData = (await getAllDataFromStore(
    db,
    "siteConfig"
  )) as siteConfig[];

  const siteConfig = siteConfigData[0];
  const sitemapConfig = sitemapConfigData[0];

  if (sitemapConfig.generateSitemapFile) {
    const endpointUrl = `${siteConfig.siteUrl}/`;

    if (sitemapConfig.generateStaticSitemapFile) {
      const urlElements = sitemapConfig.siteEndpoints
        ?.map(
          (endpoint) =>
            `
                <url>
                    <loc>${`${endpointUrl}${endpoint.endpoint}`}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>${endpoint.changeFrequency}</changefreq>
                    <priority>${endpoint.priority}</priority>
                </url>
            `
        )
        .join("");

      const staticContent = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        >
            ${urlElements}
        </urlset>
       `;

      return staticContent;
    } else {
      const dynamicContent = `
        import { MetadataRoute } from 'next'

        export default function sitemap(): MetadataRoute.Sitemap {
            const routes = config.siteEndpoints.map(
                (endpoint: {
                    url: string;
                    changeFrequency:
                        | "never"
                        | "always"
                        | "hourly"
                        | "daily"
                        | "weekly"
                        | "monthly"
                        | "yearly";
                    priority: string;
                }) => ({
                    url: endpointUrl + endpoint.endpoint,
                    lastModified: new Date().toISOString(),
                    changeFrequency: endpoint.changeFrequency,
                    priority: parseFloat(endpoint.priority),
                })
            );

            return [
              ...routes,    
            ]
        }
      `;
      return dynamicContent;
    }
  } else {
    console.log("Sitemap file generation is disabled");
    return null;
  }
}
