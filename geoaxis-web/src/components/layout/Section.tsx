import clsx from "clsx";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "hero" | "compactHero";
  tone?: "page" | "section" | "muted" | "brand" | "inverse";
  children: React.ReactNode;
};

const toneClassMap: Record<NonNullable<SectionProps["tone"]>, string> = {
  page: "bg-bg-page",
  section: "bg-bg-section",
  muted: "bg-bg-muted",
  brand: "bg-bg-brand",
  inverse: "bg-bg-inverse text-tx-inverse",
};

const variantClassMap: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "pt-12 sm:pt-14 lg:pt-24 pb-16 sm:pb-20 lg:pb-24",
  hero: "pt-[calc(var(--header-h)+4rem)] pb-16 sm:pb-20",
  compactHero:
    "pt-[calc(var(--header-h)+2.25rem)] pb-10 sm:pt-[calc(var(--header-h)+2.75rem)] sm:pb-12 lg:pt-[calc(var(--header-h)+3rem)] lg:pb-14 border-b border-br-light",
};

export function Section({
  id,
  className,
  containerClassName,
  variant = "default",
  tone = "section",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative",
        toneClassMap[tone],
        variantClassMap[variant],
        className
      )}
    >
      <div className={clsx("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
