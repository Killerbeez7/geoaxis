import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  /** Optional link or button shown to the right on wide screens */
  action?: ReactNode;
  dark?: boolean;
  id?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  action,
  dark = false,
  id,
  className,
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={clsx(
        action && !centered && "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={clsx("max-w-3xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <p className={clsx("typo-eyebrow", dark ? "text-accent-on-dark" : "text-accent-text")}>
            {eyebrow}
          </p>
        ) : null}
        <Heading id={id} className={clsx(Heading === "h1" ? "typo-h1" : "typo-h2", eyebrow && "mt-4")}>
          {title}
        </Heading>
        {description ? (
          <p className={clsx("typo-lead mt-4", centered && "mx-auto", "max-w-2xl")}>{description}</p>
        ) : null}
      </div>
      {action ? <div className={clsx("shrink-0", centered && "mt-6 flex justify-center")}>{action}</div> : null}
    </div>
  );
}
