import clsx from "clsx";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Buttons under the description */
  actions?: ReactNode;
  /** Right column on wide screens (image, contact card…) */
  aside?: ReactNode;
  /** Extra content under the actions */
  children?: ReactNode;
  size?: "default" | "compact";
};

// The single header pattern for every inner page: subtle surface, contour lines, breadcrumb, H1.
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
  children,
  size = "default",
}: Props) {
  return (
    <section className="pattern-contours border-b border-br-light bg-bg-subtle">
      <div
        className={clsx(
          "container-page pt-[calc(var(--header-h)+2rem)]",
          size === "compact" ? "pb-10 md:pb-12" : "pb-12 md:pt-[calc(var(--header-h)+3rem)] md:pb-16"
        )}
      >
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-8" /> : null}

        <div
          className={clsx(
            aside && "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-14"
          )}
        >
          <div className="max-w-3xl">
            {eyebrow ? <p className="typo-eyebrow text-accent-text">{eyebrow}</p> : null}
            <h1 className={clsx("typo-h1", eyebrow && "mt-4")}>{title}</h1>
            {description ? <div className="typo-lead mt-5 max-w-2xl">{description}</div> : null}
            {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
            {children}
          </div>

          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
