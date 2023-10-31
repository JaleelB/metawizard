export default function FormStepHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-12">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
        {title}
      </h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
