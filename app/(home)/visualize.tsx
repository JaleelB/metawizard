"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Visualize() {
  const { theme } = useTheme();

  return (
    <section
      id="features"
      className="container space-y-12 py-8 md:py-12 lg:py-24"
    >
      <div className="max-w-[58rem] space-y-4">
        <h2 className="text-[#44BCFF] font-semibold">Visualize</h2>
        <h3 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Experience Your Metadata in a New Light, Code-Free
        </h3>
        <p className="w-full max-w-2xl text-muted-foreground">
          Concentrate on the content, not the coding. Connect your ideas and
          watch as they transform into structured metadata ready for your
          Next.js project.
        </p>
      </div>
      <div className="relative">
        <div className="relative mx-auto">
          <div className="rounded-2xl border border-slate-900/10 bg-slate-900/5 dark:border-white/10 dark:bg-white/5 p-2">
            {theme === "dark" ? (
              <Image
                src="/builder-frame-dark.png"
                alt="hero banner"
                width="1512"
                height="852"
                className="rounded-xl"
              />
            ) : (
              <Image
                src="/builder-frame-light.png"
                alt="hero banner"
                width="1512"
                height="852"
                className="rounded-xl"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
