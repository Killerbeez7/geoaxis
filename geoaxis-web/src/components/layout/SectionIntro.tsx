export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="typo-kicker text-accent">{eyebrow}</p> : null}
      <h2 className="typo-h2 mt-2">{title}</h2>
      {description ? <p className="typo-subtitle mt-3 max-w-3xl">{description}</p> : null}
    </div>
  );
}
