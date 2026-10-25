import clsx from "clsx";
import { TRUST_ITEMS } from "@/config/content/trust";
import { IconBadge } from "./IconBadge";
import { Text } from "./Text";

// Four proof points as a strip on a light background.
export function TrustBar({ className }: { className?: string }) {

  return (
    <ul
      className={clsx(
        "grid grid-cols-1 gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4",
        "bg-br-light ring-1 ring-br-light",
        className
      )}
    >
      {TRUST_ITEMS.map(({ icon, title, text }) => (
        <li key={title} className="flex items-start gap-3.5 bg-bg-page px-5 py-4">
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
