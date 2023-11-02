import { sideNavItems } from "@/config/docs";
import { absoluteUrl } from "@/lib/utils";
import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = sideNavItems.flatMap((item) => {
    return item.items.map((subItem) => {
      return {
        url: absoluteUrl(`${subItem.href}`),
        lastModified: new Date(),
      };
    });
  });

  return [
    ...routes,
    {
      url: absoluteUrl(`/`),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl(`/builder`),
      lastModified: new Date(),
    },
  ];
}
