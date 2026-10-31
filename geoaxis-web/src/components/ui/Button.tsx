import Link from "next/link";
import clsx from "clsx";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { LuArrowRight } from "react-icons/lu";

export type ButtonVariant = "primary" | "dark" | "outline" | "outline-light" | "link" | "link-light";
export type ButtonSize = "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "rounded-xl bg-accent-fill text-tx-on-accent shadow-cta hover:bg-accent-fill-hover",
  dark: "rounded-xl bg-bg-inverse text-tx-inverse hover:bg-bg-brand",
  outline:
    "rounded-xl border border-br-default bg-bg-page text-tx-primary hover:border-br-accent hover:text-accent-text",
  "outline-light":
    "rounded-xl border border-br-on-dark bg-white/5 text-tx-inverse hover:border-white/30 hover:bg-white/10",
  link: "text-accent-text hover:underline underline-offset-4",
  "link-light": "text-accent-on-dark hover:underline underline-offset-4",
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

// Text links share the type size of their button size, without the box
const LINK_SIZES: Record<ButtonSize, string> = {
  md: "text-sm",
  lg: "text-base",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  arrow?: boolean;
  /** Analytics event name, picked up by AnalyticsClicks */
  track?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:|viber:)/.test(href);
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  arrow,
  track,
  className,
  type = "button",
  onClick,
  ...buttonProps
}: Props) {
  const isLink = variant === "link" || variant === "link-light";
  const classes = clsx(
    "group inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition duration-200",
    "disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant],
    isLink ? LINK_SIZES[size] : SIZES[size],
    className
  );

  const content = (
    <>
      {icon ? <span aria-hidden="true" className="inline-flex shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {arrow ? (
        <LuArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href) {
    if (isExternal(href)) {
      const opensTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          data-track={track}
          onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
          {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        data-track={track}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} data-track={track} onClick={onClick} {...buttonProps}>
      {content}
    </button>
  );
}
