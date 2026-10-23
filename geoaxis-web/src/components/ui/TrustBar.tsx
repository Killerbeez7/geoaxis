import clsx from "clsx";
import { TRUST_ITEMS } from "@/config/content/trust";
import { IconBadge } from "./IconBadge";

// Four proof points. "overlay" sits on the home hero photo; "light" is a strip on white.
export function TrustBar({ variant = "light", className }: { variant?: "light" | "overlay"; className?: string }) {
  const overlay = variant === "overlay";

  return (
    <ul
      className={clsx(
        "grid grid-cols-1 gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4",
        overlay ? "bg-white/12 ring-1 ring-white/12 backdrop-blur-md" : "bg-br-light ring-1 ring-br-light",
        className
      )}
    >
      {TRUST_ITEMS.map(({ icon, title, text }) => (
        <li
          key={title}
          className={clsx("flex items-center gap-3.5 px-5 py-4", overlay ? "bg-bg-deep/55" : "bg-bg-page")}
        >
          <IconBadge icon={icon} dark={overlay} />
          <div className="min-w-0">
            <p className={clsx("typo-small font-semibold", overlay ? "text-tx-inverse" : "text-tx-primary")}>
              {title}
            </p>
            <p className={clsx("typo-caption", overlay ? "text-tx-inverse-muted" : "text-tx-muted")}>{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
