import clsx from "clsx";
import type { ReactNode } from "react";

export type SectionTone = "page" | "subtle" | "inverse" | "deep";

/** Geo-line backgrounds from globals.css; see DESIGN-SYSTEM.md for where each one belongs */
export type Pattern = "contours" | "cta" | "footer" | "hero" | "summit" | "globe" | "topo" | "grid" | "network";

const TONES: Record<SectionTone, string> = {
  page: "bg-bg-page",
  subtle: "bg-bg-subtle",
  inverse: "bg-bg-inverse on-dark",
  deep: "bg-bg-deep on-dark",
};

const SPACING = {
  default: "py-16 md:py-24",
  compact: "py-12 md:py-16",
  none: "",
} as const;

type Props = {
  id?: string;
  tone?: SectionTone;
  spacing?: keyof typeof SPACING;
  /** Geo lines in the background */
  pattern?: Pattern;
  className?: string;
  containerClassName?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = "page",
  spacing = "default",
  pattern,
  className,
  containerClassName,
  children,
  ...rest
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"]}
      className={clsx("relative", TONES[tone], SPACING[spacing], pattern && `pattern-${pattern}`, className)}
    >
      <div className={clsx("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
