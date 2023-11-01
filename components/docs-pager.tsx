import Link from "next/link";
import { Doc } from "contentlayer/generated";
import { NavItem, NavItemWithChildren } from "types/nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";
import { sideNavItems } from "@/config/docs";
import { retrieveFromStorage } from "@/hooks/storage";
import { sitemapConfig } from "@/app/data/sitemaps";
import { robotsConfig } from "@/app/data/robots";
import { siteManifestConfig } from "@/app/data/manifest";
import { siteImagesConfigType } from "@/app/data/images";

type DocsPagerProps = {
  doc: Doc;
};

export async function isGeneratingImageFiles() {
  const siteImagesConfig = await retrieveFromStorage<siteImagesConfigType>(
    "siteImagesConfig",
    "session"
  );
  return (
    siteImagesConfig?.autoGenerateSiteLogo === true ||
    siteImagesConfig?.autoGenerateOpenGraphImage === true
  );
}

export async function isGeneratingMetadataFiles() {
  const sitemapConfigData = await retrieveFromStorage<sitemapConfig>(
    "sitemapConfig",
    "session"
  );
  const robotsConfigData = await retrieveFromStorage<robotsConfig>(
    "robotsConfig",
    "session"
  );
  const siteManifestConfigData = await retrieveFromStorage<siteManifestConfig>(
    "siteManifestConfig",
    "session"
  );

  return (
    sitemapConfigData?.generateSitemapFile === true ||
    robotsConfigData?.generateRobotsFile === true ||
    siteManifestConfigData?.generateSiteManifestFile === true
  );
}

export async function DocsPager({ doc }: DocsPagerProps) {
  const pager = await getPagerForDoc(doc);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between pb-20">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: "outline" })}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
        >
          {pager.next.title}
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export async function getPagerForDoc(doc: Doc) {
  const generatingImages = await isGeneratingImageFiles();
  const generatingMetadata = await isGeneratingMetadataFiles();

  const flattenedLinks = [
    null,
    ...flatten(sideNavItems).filter((link) => {
      if (link?.title === "Image Files" && !generatingImages) {
        return false; // Exclude "Image Files" link if not generating images
      }
      if (link?.title === "Metadata Files" && !generatingMetadata) {
        return false; // Exclude "Metadata Files" link if not generating metadata
      }
      return true; // Include all other links
    }),
    null,
  ];

  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link);
    }, [])
    .filter((link) => !link?.disabled);
}
