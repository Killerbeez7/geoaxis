import clsx from "clsx";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "hero";
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
        variant === "hero"
          ? "pt-[calc(var(--header-h)+4rem)] pb-16 sm:pb-20"
          : "pt-12 sm:pt-14 lg:pt-24 pb-16 sm:pb-20 lg:pb-24",
        className
      )}
    >
      <div className={clsx("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
