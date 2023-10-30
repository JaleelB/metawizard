import { z } from "zod";
import { robotsConfigSchema } from "@/schemas/schema";
import { type siteConfig } from "./site";
import { type sitemapConfig } from "./sitemap";
import { retrieveFromStorage } from "@/hooks/storage";

export type robotsConfig = z.infer<typeof robotsConfigSchema>;

export async function generateRobotsContent() {
  const robotsConfigData = await retrieveFromStorage<robotsConfig>(
    "robotsConfig",
    "session"
  );

  const sitemapConfigData = await retrieveFromStorage<sitemapConfig>(
    "sitemapConfig",
    "session"
  );

  const siteConfigData = await retrieveFromStorage<siteConfig>(
    "siteConfig",
    "session"
  );

  let sitemapUrl;

  if (sitemapConfigData?.generateSitemapFile) {
    sitemapUrl = `${siteConfigData?.siteUrl}/sitemap.xml`;
  }

  if (robotsConfigData?.generateRobotsFile) {
    if (robotsConfigData?.generateStaticRobotsFile) {
      let staticRobotsContent = "";
      robotsConfigData?.rules?.forEach((rule) => {
        staticRobotsContent += `
          User-Agent: ${rule.userAgent}
          Allow: ${rule.allow}
          Disallow: ${rule.disallow}
          ${
            rule.crawlDelay && rule.crawlDelay !== "Default"
              ? `Crawl-Delay: ${rule.crawlDelay}`
              : ""
          }
        `;
      });
      return `
      // Static robots.txt
      // app/robots.txt

      ${staticRobotsContent}
      ${robotsConfigData?.host ? `Host: ${robotsConfigData?.host}` : ""}
      Sitemap: ${sitemapUrl}
    `;
    } else {
      let dynamicRobotsContent = "rules: [";
      robotsConfigData?.rules?.forEach((rule) => {
        dynamicRobotsContent += `
        {
          User-Agent: '${rule.userAgent}',
          Allow: '${rule.allow}',
          Disallow: '${rule.disallow}',
          ${rule.crawlDelay ? `Crawl-Delay: ${rule.crawlDelay},` : ""}
        },
      `;
      });
      dynamicRobotsContent += "],";
      return `
      // Dynamic robots.ts
      // app/robots.ts

      import { MetadataRoute } from 'next'

      export default function robots(): MetadataRoute.Robots {
        return {
          ${dynamicRobotsContent}
          Host: "${robotsConfigData?.host || ""}",
          Sitemap: ${sitemapUrl}
        }
      }
    `;
    }
  } else {
    console.log("Robots file generation is disabled");
    return null;
  }
}
