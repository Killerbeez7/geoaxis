import clsx from "clsx";
import { BRAND_WORDMARK_PRIMARY, BRAND_WORDMARK_SECONDARY } from "@/config/content/brand";

const LOGO_GOLD = "#d7af43";
const LOGO_SAGE = "#82998d";

// D · Network: four survey points tied to a gold point in the middle, on a 64-unit grid.
// The lines stop 1.7 units short of every point, so the gaps stay transparent on any background.
// The points and spokes follow `currentColor`; the outer ties are sage, the centre is gold.
const FRAME = "M15.08 42.24L24.92 19.76M31.87 16.83L46.13 22.17M50.05 29.11L46.95 45.89M40.84 50.37L18.16 47.63";
const SPOKES = "M17.1 43.81L25.32 37.42M28.13 20.08L29.44 25.97M46.26 26.13L37.57 30.05M42.67 47.01L35.61 38.53";
const POINTS = [
  [13, 47],
  [27, 15],
  [51, 24],
  [46, 51],
] as const;

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="9 10 46 46"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={clsx("shrink-0", className)}
    >
      <path d={FRAME} stroke={LOGO_SAGE} strokeWidth={2} />
      <path d={SPOKES} stroke="currentColor" strokeWidth={3} />
      {POINTS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.5} fill="currentColor" />
      ))}
      <circle cx={31} cy={33} r={5.5} fill={LOGO_GOLD} />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={clsx("h-8 w-8", markClassName)} />
      <span className="text-xl font-semibold tracking-tight">
        {BRAND_WORDMARK_PRIMARY}
        <span style={{ color: LOGO_GOLD }}>{BRAND_WORDMARK_SECONDARY}</span>
      </span>
    </span>
  );
}
