import BuilderNav from "@/components/builder-nav";

export default async function ConfigurePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <main className="w-screen h-screen overflow-hidden">
    <BuilderNav />
    {children}
  </main>;
}
