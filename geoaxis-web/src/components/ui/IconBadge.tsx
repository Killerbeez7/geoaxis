import clsx from "clsx";
import type { IconType } from "react-icons";

type Props = {
  icon: IconType;
  dark?: boolean;
  size?: "md" | "lg";
  className?: string;
};

export function IconBadge({ icon: Icon, dark = false, size = "md", className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "inline-flex shrink-0 items-center justify-center rounded-xl ring-1",
        size === "lg" ? "h-12 w-12" : "h-10 w-10",
        dark
          ? "bg-white/8 text-accent-on-dark ring-white/12"
          : "bg-accent-soft text-accent-text ring-br-accent/40",
        className
      )}
    >
      <Icon className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} />
    </span>
  );
}
