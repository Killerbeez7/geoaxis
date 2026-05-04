import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { MdArrowRightAlt } from "react-icons/md";
import type { ReactNode } from "react";
import type { Service, ServiceCategory } from "@/config/services/categories";
import { getServiceHref } from "@/utils/urlHelpers";
import { normalizeParagraphs } from "@/utils/normalizeText";

type ServicesHeroProps = {
  kicker?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  children?: ReactNode;
};

export function ServicesHero({
  kicker,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "object-[72%_50%]",
  children,
}: ServicesHeroProps) {
  return (
    <section
      className={clsx(
        "relative isolate overflow-hidden",
        "border-b border-br-default bg-bg-section shadow-[inset_0_-1px_0_rgba(20,33,27,0.08)]"
      )}
    >
      <div className="absolute inset-0 -z-20 bg-bg-section">
        <Image
          src={image}
          alt={imageAlt}
          fill
          preload
          sizes="100vw"
          className={clsx(
            "object-cover brightness-90 contrast-125 saturate-125",
            imagePosition
          )}
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-bg-section/20" />
      <div
        className={clsx(
          "absolute inset-0 -z-10 bg-linear-to-r",
          "from-bg-page/98 via-bg-page/62 to-bg-section/8"
        )}
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t to-transparent from-bg-section/80" />

      <div className="container-page relative flex min-h-[clamp(25rem,54dvh,34rem)] flex-col justify-end pb-10 pt-[calc(var(--header-h)+3rem)] sm:pb-12 lg:pb-14">
        <div className="max-w-3xl">
          {kicker ? <p className={clsx("typo-kicker", "text-accent")}>{kicker}</p> : null}

          <h1 className="mt-3 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl text-tx-primary">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-tx-secondary">
            {description}
          </p>

          {children ? (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// category cards used in /uslugi
export function CategoryOverviewCard({ category }: { category: ServiceCategory }) {
  const href = `/uslugi/${category.slug}`;
  const title = category.shortTitle ?? category.title;

  return (
    <Link
      href={href}
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-card border border-br-light bg-bg-page",
        "shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-br-accent-soft hover:shadow-md"
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-bg-muted">
        <Image
          src={category.thumbnail}
          alt={category.title}
          fill
          sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) calc((100vw - 4rem) / 2), 400px"
          quality={70}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {category.meta ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {category.meta}
          </p>
        ) : null}

        <h3 className="mt-2 text-xl font-semibold leading-tight text-tx-primary">
          {title}
        </h3>

        <p className="mt-3 text-[15px] leading-7 text-tx-muted">{category.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-sm font-semibold text-tx-muted">
            {category.services.length} услуги
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">
            Виж повече
            <MdArrowRightAlt className="text-lg transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// list of all services in category page
export function CategoryServicesList({ category }: { category: ServiceCategory }) {
  const midpoint = Math.ceil(category.services.length / 2);
  const leftColumn = category.services.slice(0, midpoint);
  const rightColumn = category.services.slice(midpoint);

  return (
    <nav aria-label="Услуги в категорията" className="py-4 md:py-5">
      <p className="text-sm font-bold leading-6 text-tx-primary md:text-base">
        Всички услуги:
      </p>

      <div className="mt-2 grid gap-1 md:grid-cols-2 sm:gap-x-6">
        <ol className="space-y-1">
          {leftColumn.map((service, index) => (
            <li key={service.slug}>
              <Link
                href={getServiceHref(category.slug, service)}
                className="group flex min-h-11 items-center gap-3 rounded-lg py-2.5 text-left transition hover:bg-bg-section sm:px-2"
              >
                <span className="text-sm font-semibold tabular-nums text-accent-strong">
                  {String(index + 1).padEnd(2, ".")}
                </span>
                <span className="min-w-0 flex-1 text-[15px] font-medium leading-6 text-tx-primary transition group-hover:text-accent-strong">
                  {service.shortTitle ?? service.title}
                </span>
                <MdArrowRightAlt className="shrink-0 text-xl text-tx-muted transition group-hover:translate-x-0.5 group-hover:text-accent-strong" />
              </Link>
            </li>
          ))}
        </ol>

        <ol className="space-y-1">
          {rightColumn.map((service, index) => (
            <li key={service.slug}>
              <Link
                href={getServiceHref(category.slug, service)}
                className="group flex min-h-11 items-center gap-3 rounded-lg py-2.5 text-left transition hover:bg-bg-section sm:px-2"
              >
                <span className="text-sm font-semibold tabular-nums text-accent-strong">
                  {String(index + 1 + midpoint).padEnd(2, ".")}
                </span>
                <span className="min-w-0 flex-1 text-[15px] font-medium leading-6 text-tx-primary transition group-hover:text-accent-strong">
                  {service.shortTitle ?? service.title}
                </span>
                <MdArrowRightAlt className="shrink-0 text-xl text-tx-muted transition group-hover:translate-x-0.5 group-hover:text-accent-strong" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

// info about each service

export function CategoryServiceDetails({
  service,
  categorySlug,
}: {
  service: Service;
  categorySlug: string;
}) {
  const description = service.longDescription ?? service.description;

  return (
    <section
      id={service.slug}
      // className="scroll-mt-[calc(var(--header-h)+2rem)] py-9 first:pt-0 last:pb-0 md:py-12"
      className="scroll-mt-[calc(var(--header-h)+2rem)] border-b border-br-light py-9 first:pt-0 last:border-b-0 last:pb-0 md:py-12"
    >
      {/* <div className="grid gap-6 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.45fr)] lg:gap-12"> */}
      <div className="grid gap-8 lg:grid-cols-[minmax(16rem,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="lg:pt-1">
          <div className="relative aspect-4/3 overflow-hidden rounded-card bg-bg-muted shadow-sm">
            <Image
              src={service.thumbnail}
              alt={service.title}
              fill
              sizes="(max-width: 1024px) calc(100vw - 2rem), 420px"
              quality={74}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg-inverse/20 via-transparent to-transparent" />
          </div>
        </div>

        <div>
          <div className="max-w-2xl">
            {service.meta ? (
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {service.meta}
              </p>
            ) : null}

            <h2 className="typo-h2 mt-2 md:text-3xl leading-tight">
              {service.shortTitle ?? service.title}
            </h2>

            <div className="space-y-4 mt-4 leading-relaxed text-muted-foreground">
              {normalizeParagraphs(description).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              <div className="mt-5 sm:mt-6">
                <Link
                  href={getServiceHref(categorySlug, service)}
                  className={clsx(
                    "inline-flex items-center gap-2",
                    "text-sm font-semibold text-accent",
                    "transition-all duration-200",
                    "hover:gap-3"
                  )}
                >
                  Научете повече
                  <span className="text-[13px]">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
