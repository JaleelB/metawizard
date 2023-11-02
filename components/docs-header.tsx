import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";
import { DarkModeToggle } from "./dark-mode-toggle";

export default function DocsHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="px-4 md:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-[30px] w-[30px] text-primary" />
          <h4 className="hidden sm:block font-heading font-semibold text-lg">
            {siteConfig.name}
          </h4>
        </Link>
        <nav className="flex items-center">
          <DarkModeToggle />
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.twitter className="h-4 w-4 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
