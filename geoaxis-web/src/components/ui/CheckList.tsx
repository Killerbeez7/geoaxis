import clsx from "clsx";
import { LuCheck } from "react-icons/lu";

export function CheckList({
  items,
  dark = false,
  className,
}: {
  items: readonly string[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <ul className={clsx("grid gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={clsx(
              "mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              dark ? "bg-accent/20 text-accent-on-dark" : "bg-accent-soft text-accent-text"
            )}
          >
            <LuCheck className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
