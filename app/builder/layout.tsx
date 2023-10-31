import BuilderNav from "@/components/builder-nav";

export default async function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <BuilderNav />
      {children}
    </main>
  );
}
