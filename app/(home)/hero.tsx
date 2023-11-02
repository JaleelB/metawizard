import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export default function SiteHero() {
  return (
    <section className="pt-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mb-5 text-4xl font-bold leading-tight sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight text-center">
            Craft and manage SEO-friendly metadata for your Next.js
            <span className="relative inline-flex sm:inline">
              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative"> projects </span>
            </span>
          </h1>

          <p className="mx-auto px-6 max-w-[810px] text-center text-lg text-muted-foreground">
            Designed for Next.js 13+ apps, our tool simplifies the process of
            creating and managing your site&rsquo;s metadata, ensuring
            you&rsquo;re ready to make a powerful impact from day one.
          </p>

          <div className="md:px-8 sm:items-center sm:justify-center sm:px-0 space-y-3 sm:space-y-0 sm:space-x-6 sm:flex mt-9">
            <div className="relative inline-flex group w-full sm:w-fit">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <Link
                href="/builder"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full px-8 py-7 text-[18px] transition-all duration-200 sm:w-auto rounded-xl relative "
                )}
                role="button"
              >
                Start building now
              </Link>
            </div>

            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full px-8 py-7 text-lg transition-all duration-200 sm:w-auto rounded-xl border-2 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              )}
              role="button"
            >
              <Icons.gitHub className="h-6 w-6 mr-2" />
              Github
            </Link>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="relative">
          <div className="relative mx-auto">
            <div className="rounded-2xl border border-slate-900/10 bg-slate-900/5 dark:border-white/10 dark:bg-white/5 p-2">
              <Image
                src="/hero-banner.png"
                alt="hero banner"
                width="1729"
                height="982"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
