import { z } from "zod";
import { siteImagesConfigSchema } from "@/schemas/schema";
import { type siteConfig } from "./site";
import { retrieveFromStorage } from "@/hooks/storage";

export type siteImagesConfigType = z.infer<typeof siteImagesConfigSchema>;

export async function generateOpenGraphTwitterImage() {
  const siteConfigData = await retrieveFromStorage<siteConfig>(
    "siteConfig",
    "session"
  );

  const siteImagesConfig = await retrieveFromStorage<siteImagesConfigType>(
    "siteImagesConfig",
    "session"
  );

  if (siteImagesConfig?.autoGenerateOpenGraphImage) {
    return `//app/opengraph-image.tsx | twitter-image.tsx
  
    import { ImageResponse } from 'next/server'

    export const runtime = 'edge'
    
    // Image metadata
    export const alt = '${siteConfigData?.siteName} Open Graph Image'
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
                siteImagesConfig?.openGraphImageStyles?.fontSize || "64px"
              },
              background: ${
                siteImagesConfig?.openGraphImageStyles?.backgroundColor ||
                "#fff"
              },
              color: ${siteImagesConfig?.openGraphImageStyles?.color || "#000"},
              borderRadius: ${
                siteImagesConfig?.openGraphImageStyles?.borderRadius || "8px"
              },
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ${
              siteImagesConfig?.openGraphImageStyles?.text ||
              siteConfigData?.siteName
            }
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
    }`;
  } else {
    return null;
  }
}

export async function generateSiteLogo() {
  const siteConfigData = await retrieveFromStorage<siteConfig>(
    "siteConfig",
    "session"
  );

  const siteImagesConfig = await retrieveFromStorage<siteImagesConfigType>(
    "siteImagesConfig",
    "session"
  );

  if (siteImagesConfig?.autoGenerateSiteLogo) {
    return `// /app/icon.tsx

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
              fontSize: ${siteImagesConfig?.siteLogoStyles?.fontSize || "60px"},
              background: ${
                siteImagesConfig?.siteLogoStyles?.backgroundColor || "#fff"
              },
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: ${siteImagesConfig?.siteLogoStyles?.color || "#000"},
              borderRadius: ${
                siteImagesConfig?.siteLogoStyles?.borderRadius || "8px"
              }
            }}
          >
            ${
              siteImagesConfig?.siteLogoStyles?.text ||
              siteConfigData?.siteName.slice(0, 1)
            }
          </div>
        ),
          
        {..size,}
      )
    }`;
  } else {
    return null;
  }
}
