import { z } from "zod";
import { sitemapConfigSchema } from "@/schemas/schema";
import { type siteConfig } from "./site";
import { retrieveFromStorage } from "@/hooks/storage";

export type sitemapConfig = z.infer<typeof sitemapConfigSchema>;

export async function generatesiteMapContent() {
  const sitemapConfigData = await retrieveFromStorage<sitemapConfig>(
    "sitemapConfig",
    "session"
  );

  const siteConfigData = await retrieveFromStorage<siteConfig>(
    "siteConfig",
    "session"
  );

  if (sitemapConfigData?.generateSitemapFile) {
    const endpointUrl = `${siteConfigData?.siteUrl}/`;

    if (sitemapConfigData?.generateStaticSitemapFile) {
      return `
      // Static sitemap.xml
      // app/sitemap.xml

      <?xml version="1.0" encoding="UTF-8"?>
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      >
      ${sitemapConfigData?.siteEndpoints?.map(
        (endpoint) => `
          <url>
            <loc>${`${endpointUrl}${endpoint.endpoint}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>${endpoint.changeFrequency}</changefreq>
            <priority>${endpoint.priority}</priority>
          </url>
        `
      )}
      </urlset>
      `;
    } else {
      const siteEndpoints = sitemapConfigData?.siteEndpoints;

      return `
      // Dynamic sitemap.ts
      // app/sitemap.ts

      import { MetadataRoute } from 'next'

      export default function sitemap(): MetadataRoute.Sitemap {

        const endpoints = [${siteEndpoints?.map(
          (endpoint) => `
          {
            endpoint: "${endpoint.endpoint}",
            changeFrequency: "${endpoint.changeFrequency}",
            priority: ${endpoint.priority},
          },`
        )}
        ];

        const routes = endpoints.map(
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
              url: endpoint Url + endpoint.endpoint,
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
    }
  } else {
    console.log("Sitemap file generation is disabled");
    return null;
  }
}
