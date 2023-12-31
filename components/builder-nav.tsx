import Link from "next/link";
import { Icons } from "./ui/icons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { siteConfig } from "@/config/site";
import { DarkModeToggle } from "./dark-mode-toggle";

export default function BuilderNav() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 w-full border-b bg-background/95 backdrop-blur flex items-center supports-backdrop-blur:bg-background/60 sticky top-0 z-50">
      <div className="w-full px-6 h-14 md:h-[65px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-[30px] w-[30px] text-primary" />
          <h4 className="hidden sm:block font-heading font-semibold text-lg">
            {siteConfig.name}
          </h4>
        </Link>
        <nav className="flex items-center gap-2">
          <div className="hidden lg:flex gap-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" className="gap-2" size="sm">
                <Icons.gitHub className="h-4 w-4 text-primary" />
                <span className="font-normal text-sm">Github Source</span>
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              href={`${siteConfig.links.github}/issues`}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" className="gap-2" size="sm">
                <Icons.circle className="h-4 w-4 text-primary" />
                <span className="font-normal text-sm">Report an Issue</span>
                <span className="sr-only">GitHub Issues</span>
              </Button>
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center">
              <DarkModeToggle />
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-9 px-0 hidden md:inline-flex"
                )}
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.twitter className="h-3 w-3 text-primary" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
