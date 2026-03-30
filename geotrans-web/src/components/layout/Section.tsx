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
  muted: "muted-section",
  brand: "bg-bg-soft",
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
          : "py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      <div className={clsx("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
