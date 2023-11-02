"use client";
import Link from "next/link";
import { Doc } from "contentlayer/generated";
import { NavItem, NavItemWithChildren } from "types/nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";
import { sideNavItems } from "@/config/docs";
import { retrieveFromStorage } from "@/hooks/storage";
import { sitemapConfig } from "@/data/sitemap";
import { robotsConfig } from "@/data/robots";
import { siteManifestConfig } from "@/data/manifest";
import { siteImagesConfigType } from "@/data/images";
import { authorType, siteConfig } from "@/data/site";
import React, { use } from "react";

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

export async function isGeneratingMetadataObject() {
  const authorConfigData = await retrieveFromStorage<authorType>(
    "authorConfig",
    "session"
  );
  const siteConfigData = await retrieveFromStorage<siteConfig>(
    "siteConfig",
    "session"
  );

  const isEmptyObject = (obj: authorType | siteConfig | null): boolean => {
    if (obj === null) {
      return true; // Treat null as an empty object
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const isAuthorConfigEmpty = isEmptyObject(authorConfigData);
  const isSiteConfigEmpty = isEmptyObject(siteConfigData);

  return !isAuthorConfigEmpty && !isSiteConfigEmpty;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const [pager, setPager] = React.useState<{
    prev: NavItem | null;
    next: NavItem | null;
  } | null>(null);
  // const pager = await getPagerForDoc(doc);

  React.useEffect(() => {
    async function getPager() {
      const pager = await getPagerForDoc(doc);
      setPager(pager);
    }

    getPager();
  }, [doc]);

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
  const generatingMetadataFiles = await isGeneratingMetadataFiles();
  const generatingMetadataObject = await isGeneratingMetadataObject();

  const flattenedLinks = [
    null,
    ...flatten(sideNavItems).filter((link) => {
      if (link?.title === "Image Files" && !generatingImages) {
        return false; // Exclude "Image Files" link if not generating images
      }
      if (link?.title === "Metadata Files" && !generatingMetadataFiles) {
        return false; // Exclude "Metadata Files" link if not generating metadata
      }
      if (link?.title === "Metadata Object" && !generatingMetadataObject) {
        return false; // Exclude "Metadata Objects" link if not generating metadata
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
