export default async function ConfigurePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container max-w-[700px] flex-grow flex flex-col py-16">
      {children}
    </main>
  );
}
