import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

// Text building blocks. Sizes come from the type scale in globals.css; colours follow
// the surface (light or .on-dark), so the same component works on every background.

type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

type HeadingProps = {
  as?: HeadingTag;
  /** Visual size; defaults to the size of the tag */
  size?: HeadingSize;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"h2">, "children">;

const TAG_SIZE: Partial<Record<HeadingTag, HeadingSize>> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h5",
};

export function Heading({ as: Tag = "h2", size, className, children, ...props }: HeadingProps) {
  return (
    <Tag className={clsx(`typo-${size ?? TAG_SIZE[Tag] ?? "h4"}`, className)} {...props}>
      {children}
    </Tag>
  );
}

type TextSize = "lead" | "body" | "small";
type TextTone = "default" | "strong" | "muted" | "accent";
type TextWeight = "regular" | "medium" | "semibold";

const TEXT_SIZE: Record<TextSize, string> = {
  lead: "typo-lead",
  body: "typo-body",
  small: "typo-small",
};

const TEXT_TONE: Record<TextTone, string | undefined> = {
  default: undefined,
  strong: "tone-strong",
  muted: "tone-muted",
  accent: "tone-accent",
};

const TEXT_WEIGHT: Record<TextWeight, string | undefined> = {
  regular: undefined,
  medium: "font-medium",
  semibold: "font-semibold",
};

type TextProps<T extends ElementType> = {
  as?: T;
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Text<T extends ElementType = "p">({
  as,
  size = "body",
  tone = "default",
  weight = "regular",
  className,
  children,
  ...props
}: TextProps<T>) {
  const Tag: ElementType = as ?? "p";
  return (
    <Tag className={clsx(TEXT_SIZE[size], TEXT_TONE[tone], TEXT_WEIGHT[weight], className)} {...props}>
      {children}
    </Tag>
  );
}

/** Uppercase kicker above a title. `rule` adds the short gold line. */
export function Eyebrow({
  children,
  rule = true,
  tone = "accent",
  as: Tag = "p",
  className,
}: {
  children: ReactNode;
  rule?: boolean;
  tone?: "accent" | "muted";
  as?: "p" | "span" | "div";
  className?: string;
}) {
  return (
    <Tag className={clsx(rule ? "typo-eyebrow" : "typo-label", tone === "accent" ? "tone-accent" : "tone-muted", className)}>
      {children}
    </Tag>
  );
}

type BadgeTone = "accent" | "neutral" | "on-dark" | "on-image";

const BADGE_TONE: Record<BadgeTone, string> = {
  accent: "bg-accent-soft text-accent-text ring-1 ring-br-accent/35",
  neutral: "bg-bg-subtle text-tx-secondary ring-1 ring-br-light",
  "on-dark": "bg-white/10 text-tx-inverse ring-1 ring-white/15",
  "on-image": "bg-bg-deep/60 text-tx-inverse ring-1 ring-white/15 backdrop-blur-sm",
};

/** Small static pill: a time frame, a count, a category tag. */
export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "typo-badge inline-flex h-6 w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-2.5",
        BADGE_TONE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
