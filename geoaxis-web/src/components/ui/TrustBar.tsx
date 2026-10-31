import clsx from "clsx";
import { TRUST_ITEMS } from "@/config/content/trust";
import { IconBadge } from "./IconBadge";
import { Text } from "./Text";

// Four proof points. "overlay" sits on the home hero photo; "light" is a strip on white;
// "list" is a quiet vertical list for side panels.
export function TrustBar({
  variant = "light",
  className,
}: {
  variant?: "light" | "overlay" | "list";
  className?: string;
}) {
  const overlay = variant === "overlay";

  if (variant === "list") {
    return (
      <ul className={clsx("grid gap-4", className)}>
        {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3.5">
            {/* Same 40px icon column as the contact rows above, so icons and text line up */}
            <span aria-hidden="true" className="inline-flex w-10 shrink-0 justify-center pt-0.5">
              <Icon className="h-5 w-5 text-accent-text" />
            </span>
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
