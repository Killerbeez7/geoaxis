import clsx from "clsx";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "hero";
  tone?: "page" | "section" | "muted" | "brand" | "inverse";
  children: React.ReactNode;
};

export function Section({ id, className, variant = "default", children }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative",
        variant === "hero"
          ? "pt-[calc(var(--header-h)+4rem)] pb-16 sm:pb-20"
          : "py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      <div className={clsx("container-page")}>{children}</div>
    </section>
  );
}
