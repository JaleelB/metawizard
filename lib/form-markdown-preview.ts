import { State } from "@/state/form-state";

export function generateSiteDetailsContent(state: State) {
  const formData = state.siteConfigData;
  const keywords = formData.siteKeywords
    .map((tag) => `"${tag.text}"`)
    .join(", ");

  return `
    // /app/layout.tsx
    import type { Metadata } from "next"

    export const metadata: Metadata = {
      title: {
        default: "${formData.siteName || ""}",
        template: \`%s - ${formData.siteName || ""}\`,
      },
      description: "${formData.siteDescription || ""}",
      keywords: [
        ${keywords}
      ],
      // ... (other properties)
      themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
      ],
      openGraph: {
        // ... (other properties)
        url: "${formData.siteUrl || ""}",
        title: "${formData.siteName || ""}",
        description: "${formData.siteDescription || ""}",
        siteName: "${formData.siteName || ""}",
      },
      twitter: {
        title: "${formData.siteName || ""}",
        description: "${formData.siteDescription || ""}",
      },
    };
  `;
}

export function generateSiteImagesContent(state: State) {
  const formData = state.siteImagesConfigData;
  const openGraphTwitterCode = `
    // /app/open-graph-image.tsx | /app/twitter-image.tsx

    import { ImageResponse } from 'next/server'

    export const runtime = 'edge'
    
    // Image metadata
    export const alt = '${formData.siteLogoStyles?.text} Open Graph Image'
    export const size = {
        width: 1200,
        height: 630,
    }
    
    export const contentType = 'image/png'
    
    export default async function Image() {
        const interSemiBold = fetch(
            new URL('./Inter-SemiBold.ttf', import.meta.url)
        ).then((res) => res.arrayBuffer())
        
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: ${
                          formData.openGraphImageStyles?.fontSize || "64px"
                        },
                        background: ${
                          formData.openGraphImageStyles?.backgroundColor ||
                          "#fff"
                        },
                        color: ${
                          formData.openGraphImageStyles?.color || "#000"
                        },
                        borderRadius: ${
                          formData.openGraphImageStyles?.borderRadius || "8px"
                        },
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    ${formData.openGraphImageStyles?.text || ""}
                </div>
            ),
            {
              ...size,
              fonts: [
                {
                  name: 'Inter',
                  data: await interSemiBold,
                  style: 'normal',
                  weight: 400,
                },
              ],
            }
        )
    }
  `;

  const siteLogoCode = `
    // /app/icon.tsx

    import { ImageResponse } from 'next/server'

    export const runtime = 'edge'
    
    export const size = {
        width: 32,
        height: 32,
    }
    export const contentType = 'image/png'
    
    export default function Icon() {
        return new ImageResponse(
            (
                <div
                  style={{
                    fontSize: ${formData.siteLogoStyles?.fontSize || "60px"},
                    background: ${
                      formData.siteLogoStyles?.backgroundColor || "#fff"
                    },
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: ${formData.siteLogoStyles?.color || "#000"},
                    borderRadius: ${
                      formData.siteLogoStyles?.borderRadius || "8px"
                    }
                  }}
                >
                    ${formData.siteLogoStyles?.text || "siteName"}
                </div>
            ),
            
            {..size,}
        )
    }
  `;

  let result = "";

  if (formData.autoGenerateSiteLogo) {
    result += siteLogoCode;
  }

  if (formData.autoGenerateOpenGraphImage) {
    result += `\n${openGraphTwitterCode}`;
  }

  if (!result) {
    result = `<img src={null} alt="Site Logo" className="border" />`;
  }

  return result;
}

export function generateAuthorDetailsContent(state: State) {
  const formData = state.authorConfigData;

  return `
    // app/layout.tsx

    import type { Metadata } from "next"

    export const metadata: Metadata = {
      ...
      authors: [
        ${formData.authors?.map(
          (author) => `{
            name: "${author.name}",
            url: "${author.url}",
          }`
        )}
      ],
      creator:  "${formData.creator || ""}",
      twitter: {
        ...
        creator: "@${formData.twitterUsername || ""}",
      },
    }
  `;
}

export function generateRobotsFileContent(state: State) {
  const formData = state.robotsConfigData;
  const siteConfig = state.siteConfigData;
  const sitemapConfig = state.sitemapConfigData;

  if (formData.generateRobotsFile) {
    if (formData.generateStaticRobotsFile) {
      let staticRobotsContent = "";
      formData.rules?.forEach((rule) => {
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
      ${formData.host ? `Host: ${formData.host}` : ""}
      ${
        sitemapConfig.generateSitemapFile
          ? `Sitemap: ${siteConfig.siteUrl}/sitemap.xml`
          : ""
      }`;
    } else {
      let dynamicRobotsContent = "rules: [";
      formData.rules?.forEach((rule) => {
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
          Host: "${formData.host || ""}",
          ${
            sitemapConfig.generateSitemapFile
              ? `Sitemap: ${siteConfig.siteUrl}/sitemap.xml`
              : ""
          }
        }
      }`;
    }
  }
}

export function generateSitemapDetailsContent(state: State) {
  const formData = state.sitemapConfigData;
  const siteConfig = state.siteConfigData;

  if (formData.generateSitemapFile) {
    const endpointUrl = `${siteConfig.siteUrl}`;

    if (formData.generateStaticSitemapFile) {
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
      ${formData.siteEndpoints?.map(
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
      const siteEndpoints = formData.siteEndpoints;

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
          }`
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
    }
  }
}

export function generateManifestDetailsContent(state: State) {
  const formData = state.siteManifestConfigData;

  if (formData.generateSiteManifestFile) {
    if (formData.generateStaticSiteManifestFile) {
      return `
      // app/manifest.json | app/manifest.webmanifest

      {
        "name": "${formData.name || ""}",
        "short_name": "${formData.short_name || ""}",
        "description": "${formData.description || ""}",
        "start_url": "${formData.start_url || ""}",
        "display": "${formData.display || ""}",
        "theme_color": "${formData.theme_color || ""}",
        "background_color": "${formData.background_color || ""}",
        "icons": [
          ${formData.icons?.map(
            (icon) => `
          {
            "src": "${icon.src || ""}",
            "sizes": "${icon.sizes || ""}",
            "type": "${icon.type || ""}",
          }
        `
          )}
        ],
      }
      `;
    } else {
      return `
      // app/manifest.ts 

      import { MetadataRoute } from 'next'
 
      export default function manifest(): MetadataRoute.Manifest {
        return {
          name: "${formData.name || ""}",
          short_name: "${formData.short_name || ""}",
          description: "${formData.description || ""}",
          start_url: "${formData.start_url || ""}",
          display: "${formData.display || ""}",
          theme_color: "${formData.theme_color || ""}",
          background_color: "${formData.background_color || ""}",
          icons: [
            ${formData.icons?.map(
              (icon) => `
            {
              src: "${icon.src || ""}",
              sizes: "${icon.sizes || ""}",
              type: "${icon.type || ""}",
            }
          `
            )}
          ],
        }
      }
      `;
    }
  }
}
