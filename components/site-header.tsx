import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";

export default function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full bg-background/75 backdrop-blur">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-[30px] w-[30px] text-primary" />
          <h4 className="hidden sm:block font-heading font-semibold text-lg">
            {siteConfig.name}
          </h4>
        </Link>
        <nav className="flex items-center">
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full ml-2 text-xs font-normal text-white transition-all duration-200 sm:w-auto rounded-lg  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            )}
            role="button"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
