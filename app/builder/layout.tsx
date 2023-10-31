import BuilderNav from "@/components/builder-nav";

export default async function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <main className="w-screen h-screen overflow-hidden">
    <BuilderNav />
    {children}
  </main>;
}
