import { z } from "zod";
import { siteManifestConfigSchema } from "@/schemas/schema";
import { retrieveFromStorage } from "@/hooks/storage";

export type siteManifestConfig = z.infer<typeof siteManifestConfigSchema>;

export async function generateWebManifest() {
  const siteManifestConfigData = await retrieveFromStorage<siteManifestConfig>(
    "siteManifestConfig",
    "session"
  );

  if (siteManifestConfigData) {
    if (siteManifestConfigData.generateStaticSiteManifestFile) {
      return `// app/manifest.json | app/manifest.webmanifest
      {
        "name": "${siteManifestConfigData.name || ""}",
        "short_name": "${siteManifestConfigData.short_name || ""}",
        "description": "${siteManifestConfigData.description || ""}",
        "start_url": "${siteManifestConfigData.start_url || ""}",
        "display": "${siteManifestConfigData.display || ""}",
        "theme_color": "${siteManifestConfigData.theme_color || ""}",
        "background_color": "${siteManifestConfigData.background_color || ""}",
        "icons": [
          ${siteManifestConfigData.icons?.map(
            (icon) => `
          {
            "src": "${icon.src || ""}",
            "sizes": "${icon.sizes || ""}",
            "type": "${icon.type || ""}",
          }
        `
          )}
        ],
      }`;
    } else {
      return `// app/manifest.ts

      import { MetadataRoute } from 'next'

      export default function manifest(): MetadataRoute.Manifest {
        return {
          name: "${siteManifestConfigData.name || ""}",
          short_name: "${siteManifestConfigData.short_name || ""}",
          description: "${siteManifestConfigData.description || ""}",
          start_url: "${siteManifestConfigData.start_url || ""}",
          display: "${siteManifestConfigData.display || ""}",
          theme_color: "${siteManifestConfigData.theme_color || ""}",
          background_color: "${siteManifestConfigData.background_color || ""}",
          icons: [
            ${siteManifestConfigData.icons?.map(
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
      }`;
    }
  } else {
    console.log("Site Manifest file generation is disabled");
    return null;
  }
}
