import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { LuArrowRight } from "react-icons/lu";

type Props = {
  children: ReactNode;
  /** Link target; without it the chip is a button */
  href?: string;
  onClick?: () => void;
  /** Toggle state for filter chips */
  selected?: boolean;
  tone?: "light" | "dark";
  size?: "sm" | "md";
  arrow?: boolean;
  /** Analytics event name, picked up by AnalyticsClicks */
  track?: string;
  className?: string;
};

const TONES = {
  light: {
    idle: "border-br-default bg-bg-page text-tx-secondary hover:border-br-accent hover:text-accent-text",
    selected: "border-bg-inverse bg-bg-inverse text-tx-inverse",
  },
  dark: {
    idle: "border-white/20 bg-white/8 text-tx-inverse hover:border-accent-fill hover:bg-accent-fill hover:text-tx-on-accent",
    selected: "border-accent-fill bg-accent-fill text-tx-on-accent",
  },
} as const;

// Pill-shaped link or toggle: quick choices, filters, jump links, related topics.
export function Chip({
  children,
  href,
  onClick,
  selected = false,
  tone = "light",
  size = "md",
  arrow = false,
  track,
  className,
}: Props) {
  const classes = clsx(
    "typo-small group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-medium transition-colors duration-200",
    size === "sm" ? "h-9 px-3.5" : "h-10 px-4",
    selected ? TONES[tone].selected : TONES[tone].idle,
    className
  );

  const content = (
    <>
      {children}
      {arrow ? (
        <LuArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href) {
    return href.startsWith("/") ? (
      <Link href={href} className={classes} data-track={track}>
        {content}
      </Link>
    ) : (
      <a href={href} className={classes} data-track={track}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={classes} data-track={track}>
      {content}
    </button>
  );
}
