"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types/nav";
import { siteImagesConfigType } from "@/data/images";
import React from "react";
import { retrieveFromStorage } from "@/hooks/storage";
import { sitemapConfig } from "@/data/sitemaps";
import { robotsConfig } from "@/data/robots";
import { siteManifestConfig } from "@/data/manifest";
import {
  isGeneratingImageFiles,
  isGeneratingMetadataFiles,
} from "./docs-pager";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const [showImageConventions, setShowImageConventions] = React.useState(false);
  const [showMetadataConventions, setShowMetadataConventions] =
    React.useState(false);

  const pathname = usePathname();

  React.useEffect(() => {
    async function checkImageGeneration() {
      const generating = await isGeneratingImageFiles();
      setShowImageConventions(generating);

      const generatingMetadata = await isGeneratingMetadataFiles();
      setShowMetadataConventions(generatingMetadata);
    }

    checkImageGeneration();
  }, []);

  const filteredItems = items.map((item) => {
    if (item.title === "Getting Started") {
      return {
        ...item,
        items: item.items.filter(
          (subItem) =>
            (subItem.title !== "Image Files" || showImageConventions) &&
            (subItem.title !== "Metadata Files" || showMetadataConventions)
        ),
      };
    }
    return item;
  });

  return filteredItems.length ? (
    <aside className="fixed z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <div className="relative overflow-hidden h-full pr-6">
        <div className="w-full">
          {filteredItems.map((item, index) => (
            <div key={index} className={cn("pb-4")}>
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {item.title}
              </h4>
              {item?.items?.length && (
                <DocsSidebarNavItems items={item.items} pathname={pathname} />
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        )
      )}
    </div>
  ) : null;
}
