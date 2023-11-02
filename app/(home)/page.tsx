import Image from "next/image";

import OpenSource from "@/app/(home)/open-source";
import Features from "@/app/(home)/site-features";
import SiteHero from "./hero";
import Visualize from "./visualize";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between px-4 py-12 md:py-20 xl:p-24">
      <SiteHero />
      <Visualize />
      <Features />
      <OpenSource />
    </main>
  );
}
