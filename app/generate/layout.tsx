import DocsHeader from "@/components/docs-header";
import { DocsSidebarNav } from "@/components/docs-side-nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { sideNavItems } from "@/config/docs";

export default async function GeneratePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DocsHeader />
      <div className="relative container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <DocsSidebarNav items={sideNavItems} />
          </div>
        </aside>
        <ScrollArea className="relative flex-1 min-h-[calc(100vh - 56px)] scrollbar-hide">
          {children}
          <ScrollBar className="hidden" />
        </ScrollArea>
      </div>
    </div>
  );
}
