import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";

export default function SiteHeader() {
  return (
    <header className="z-50 h-20 w-full">
      <div className="container flex items-center justify-between gap-4 h-full md:py-0">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-[30px] w-[30px] text-primary" />
          <h4 className="font-bold text-lg">{siteConfig.name}</h4>
        </Link>
        <nav className="flex items-center">
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "w-full px-4 ml-2 transition-all duration-200 sm:w-auto rounded-lg font-medium"
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
