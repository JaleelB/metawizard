import { DocsSidebarNav } from "@/components/side-nav";
import { SidebarNavItem } from "@/types/nav";

export default async function GeneratePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems: SidebarNavItem[] = [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/generate",
          items: [],
        },
        {
          title: "Metadata",
          href: "/generate/metadata",
          items: [],
        },
        {
          title: "Image Configuration",
          href: "/generate/image-configuration",
          items: [],
        },
        {
          title: "Metadata Files",
          href: "/generate/metadata-files",
          items: [],
        },
      ],
    },
  ];

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <DocsSidebarNav items={navItems} />
        </div>
      </aside>
      {children}
    </div>
  );
}
