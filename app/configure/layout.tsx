export default async function ConfigurePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-grow w-screen h-screen">{children}</main>;
}
