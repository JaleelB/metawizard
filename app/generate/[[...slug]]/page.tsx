import { allDocs } from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { cn } from "@/lib/utils";
import "../../mdx.css";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

type DocPageProps = {
  params: {
    slug: string[];
  };
};

async function geContentFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || "";
  const content = allDocs.find((content) => content.slugAsParams === slug);

  if (!content) {
    null;
  }

  return content;
}

export default async function GeneratedPage({ params }: DocPageProps) {
  const content = await geContentFromParams({ params });

  if (!content) {
    notFound();
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-4xl">
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {content.title}
          </h1>
          {content.description && (
            <p className="text-muted-foreground">
              <Balancer>{content.description}</Balancer>
            </p>
          )}
        </div>
        <div className="pb-12 pt-8">
          <Mdx code={content.body.code} />
        </div>
      </div>
    </main>
  );
}
