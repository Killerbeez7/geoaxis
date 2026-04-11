import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "glass" | "glassInverse" | "glassAccent";

type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function CtaButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyles = clsx(
    "inline-flex items-center justify-center gap-2",
    "font-semibold",
    "rounded-2xl",
    "transition-all duration-200",
    "shadow-lg hover:shadow-xl",
    "hover:scale-105",
    "active:scale-100",
    "leading-none"
  );

  const sizes: Record<Size, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm md:text-base",
    lg: "px-6 py-3 text-sm md:text-lg",
  };

  const variants: Record<Variant, string> = {
    primary: clsx("bg-accent", "text-tx-inverse", "hover:bg-accent-hover"),

    outline: clsx(
      "border border-accent",
      "text-accent",
      "hover:bg-accent hover:text-tx-inverse"
    ),

    glass: clsx(
      "bg-(--surface-overlay-sm) backdrop-blur-md",
      "border border-(--surface-overlay-lg)",
      "text-white",
      "hover:bg-(--surface-overlay-lg)"
    ),
    glassInverse: clsx(
      "bg-(--surface-overlay-lg) backdrop-blur-md",
      "border border-br-strong",
      "text-tx-muted",
      "hover:bg-(--surface-overlay-lg)"
    ),
    glassAccent: clsx(
      "bg-(--surface-overlay-sm) backdrop-blur-md",
      "border border-white/20",
      "text-white",
      "hover:bg-(--surface-overlay-lg)"
    ),
  };

  const finalClass = clsx(baseStyles, sizes[size], variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={finalClass}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={finalClass}>
      {children}
    </button>
  );
}
