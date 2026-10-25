import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Eyebrow, Heading, Text } from "./Text";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Buttons under the description */
  actions?: ReactNode;
  /** Right column on wide screens (image, navigation card…) */
  aside?: ReactNode;
  /** Extra content under the actions */
  children?: ReactNode;
  size?: "default" | "compact";
  /** Decorative background image instead of the contour pattern */
  backdrop?: string;
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
  backdrop,
}: Props) {
  return (
    <section
      className={clsx(
        "on-light border-b border-br-light bg-bg-subtle",
        backdrop ? "relative isolate overflow-hidden" : "pattern-contours"
      )}
    >
      {backdrop ? (
        <>
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-[58%_50%] brightness-90 contrast-125 saturate-125 sm:object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-bg-page/98 via-bg-page/65 to-bg-subtle/10" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-bg-subtle/80 to-transparent" />
        </>
      ) : null}
      <div
        className={clsx(
          "container-page pt-[calc(var(--header-h)+1.5rem)] md:pt-[calc(var(--header-h)+2.5rem)]",
          size === "compact" ? "pb-10 md:pb-14" : "pb-12 md:pb-16"
        )}
      >
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-8 md:mb-10" /> : null}

        <div
          className={clsx(
            aside && "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-16"
          )}
        >
          <div className="max-w-3xl">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <Heading as="h1" className={clsx(eyebrow && "mt-4")}>
              {title}
            </Heading>
            {description ? (
              <Text as="div" size="lead" className="mt-5 max-w-2xl">
                {description}
              </Text>
            ) : null}
            {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
            {children}
          </div>

          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
