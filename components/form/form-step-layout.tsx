import PreviewSection from "../builder/preview-section";

export default function FormStepLayout({
  children,
  code,
  title,
}: {
  children: React.ReactNode;
  code: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden flex flex-col lg:flex-row">
      {children}
      <PreviewSection code={code} title={title} />
    </div>
  );
}
