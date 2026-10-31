import clsx from "clsx";
import { TRUST_ITEMS } from "@/config/content/trust";
import { IconBadge } from "./IconBadge";
import { Text } from "./Text";

// Four proof points. "overlay" sits on the home hero photo; "light" is a strip on white;
// "row" is the same four points without boxes.
export function TrustBar({
  variant = "light",
  className,
}: {
  variant?: "light" | "overlay" | "row";
  className?: string;
}) {
  const overlay = variant === "overlay";

  if (variant === "row") {
    return (
      <ul className={clsx("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
        {TRUST_ITEMS.map(({ icon, title, text }) => (
          <li key={title} className="flex items-start gap-3.5">
            <IconBadge icon={icon} />
            <div className="min-w-0">
              <Text size="small" weight="semibold" tone="strong">
                {title}
              </Text>
              <Text size="small" tone="muted">
                {text}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={clsx(
        "grid grid-cols-1 gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4",
        overlay ? "on-dark bg-white/12 ring-1 ring-white/12 backdrop-blur-md" : "bg-br-light ring-1 ring-br-light",
        className
      )}
    >
      {TRUST_ITEMS.map(({ icon, title, text }) => (
        <li key={title} className={clsx("flex items-start gap-3.5 px-5 py-4", overlay ? "bg-bg-deep/55" : "bg-bg-page")}>
          <IconBadge icon={icon} dark={overlay} />
          <div className="min-w-0">
            <Text size="small" weight="semibold" tone="strong">
              {title}
            </Text>
            <Text size="small" tone="muted">
              {text}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
