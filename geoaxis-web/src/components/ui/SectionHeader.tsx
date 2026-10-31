import clsx from "clsx";
import type { ReactNode } from "react";
import { Eyebrow, Heading, Text } from "./Text";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  /** Optional link or button shown to the right on wide screens */
  action?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  action,
  id,
  className,
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={clsx(
        action && !centered && "flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10",
        className
      )}
    >
      <div className={clsx("max-w-3xl", centered && "mx-auto text-center")}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading as={as} id={id} className={clsx(eyebrow && "mt-3")}>
          {title}
        </Heading>
        {description ? (
          <Text size="lead" className={clsx("mt-3 max-w-2xl", centered && "mx-auto")}>
            {description}
          </Text>
        ) : null}
      </div>
      {action ? <div className={clsx("shrink-0", centered && "mt-6 flex justify-center")}>{action}</div> : null}
    </div>
  );
}
