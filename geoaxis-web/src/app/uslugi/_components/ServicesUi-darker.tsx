import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { MdArrowRightAlt } from "react-icons/md";
import type { ReactNode } from "react";

import { CtaButton } from "@/components/parts/CtaButton";
import type { Service, ServiceCategory } from "@/config/services/categories";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type ServicesHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  tone?: "dark" | "light";
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
};

export function ServicesHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "object-[72%_50%]",
  tone = "light",
  breadcrumbs,
  children,
}: ServicesHeroProps) {
  const isLight = tone === "light";

  return (
    <section
      className={clsx(
        "relative isolate overflow-hidden",
        isLight
          ? "border-b border-br-default bg-bg-section shadow-[inset_0_-1px_0_rgba(20,33,27,0.08)]"
          : "bg-bg-inverse"
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 -z-20",
          isLight ? "bg-bg-section" : "bg-bg-inverse"
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          preload
          sizes="100vw"
          className={clsx(
            "object-cover",
            imagePosition,
            isLight && "brightness-[.82] contrast-150 saturate-125"
          )}
        />
      </div>

      <div
        className={clsx(
          "absolute inset-0 -z-10",
          isLight ? "bg-bg-section/10" : "bg-bg-inverse/58"
        )}
      />
      <div
        className={clsx(
          "absolute inset-0 -z-10 bg-linear-to-r",
          isLight
            ? "from-bg-page/96 via-bg-page/54 to-transparent"
            : "from-bg-inverse/94 via-bg-inverse/76 to-bg-inverse/28"
        )}
      />
      <div
        className={clsx(
          "absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t to-transparent",
          isLight ? "from-bg-section/68" : "from-bg-inverse/72"
        )}
      />

      <div className="container-page relative flex min-h-[clamp(25rem,54dvh,34rem)] flex-col justify-end pb-10 pt-[calc(var(--header-h)+3rem)] sm:pb-12 lg:pb-14">
        {breadcrumbs?.length ? (
          <Breadcrumbs items={breadcrumbs} tone={tone} />
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? (
            <p
              className={clsx(
                "typo-kicker",
                isLight ? "text-accent" : "text-tx-inverse/72"
              )}
            >
              {eyebrow}
            </p>
          ) : null}

          <h1
            className={clsx(
              "mt-3 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl",
              isLight ? "text-tx-primary" : "text-tx-inverse"
            )}
          >
            {title}
          </h1>

          <p
            className={clsx(
              "mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8",
              isLight ? "text-tx-secondary" : "text-tx-inverse/82"
            )}
          >
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

export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: BreadcrumbItem[];
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";

  return (
    <nav
      aria-label="Навигация"
      className={clsx(
        "mb-5 text-sm",
        isLight ? "text-tx-muted" : "text-tx-inverse/68"
      )}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <span className={isLight ? "text-tx-muted/45" : "text-tx-inverse/34"}>
                /
              </span>
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className={clsx(
                  "transition",
                  isLight ? "hover:text-accent-strong" : "hover:text-tx-inverse"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLight ? "text-tx-primary" : "text-tx-inverse"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ServiceSubnav({
  category,
  activeServiceSlug,
}: {
  category: ServiceCategory;
  activeServiceSlug?: string;
}) {
  return (
    <div className="border-b border-br-light bg-bg-section/80">
      <div className="container-page py-3">
        <nav
          aria-label="Услуги в категорията"
          className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <SubnavLink
            href={`/uslugi/${category.slug}`}
            label="Общ преглед"
            active={!activeServiceSlug}
          />
          {category.services.map((service) => (
            <SubnavLink
              key={service.slug}
              href={`/uslugi/${category.slug}/${service.slug}`}
              label={service.shortTitle ?? service.title}
              active={activeServiceSlug === service.slug}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

function SubnavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition",
        active
          ? "border-accent/45 bg-accent/10 text-accent-strong shadow-sm"
          : "border-br-light bg-bg-page text-tx-secondary hover:border-br-accent-soft hover:bg-bg-section hover:text-tx-primary"
      )}
    >
      {label}
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="typo-kicker text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="typo-h2 mt-2">{title}</h2>
      {description ? <p className="typo-subtitle mt-3 max-w-3xl">{description}</p> : null}
    </div>
  );
}

export function CategoryOverviewCard({ category }: { category: ServiceCategory }) {
  const href = `/uslugi/${category.slug}`;
  const title = category.shortTitle ?? category.title;
  const visibleServices = category.services.slice(0, 3);
  const hiddenCount = Math.max(category.services.length - visibleServices.length, 0);

  return (
    <Link
      href={href}
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-card border border-br-light bg-bg-page",
        "shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-br-accent-soft hover:shadow-md"
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-muted">
        <Image
          src={category.thumbnail}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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

        <p className="mt-3 text-[15px] leading-7 text-tx-muted">
          {category.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleServices.map((service) => (
            <span
              key={service.slug}
              className="rounded-full border border-br-light bg-bg-muted px-3 py-1 text-xs text-tx-muted"
            >
              {service.shortTitle ?? service.title}
            </span>
          ))}
          {hiddenCount > 0 ? (
            <span className="rounded-full border border-br-light bg-bg-muted px-3 py-1 text-xs text-tx-muted">
              +{hiddenCount}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-sm text-tx-muted">{category.services.length} услуги</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">
            Виж повече
            <MdArrowRightAlt className="text-lg transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ServiceSummaryCard({
  category,
  service,
}: {
  category: ServiceCategory;
  service: Service;
}) {
  const href = `/uslugi/${category.slug}/${service.slug}`;
  const description = service.longDescription ?? service.description;

  return (
    <Link
      href={href}
      className={clsx(
        "group grid overflow-hidden rounded-card border border-br-light bg-bg-page",
        "shadow-sm transition duration-300 hover:border-br-accent-soft hover:shadow-md sm:grid-cols-[14rem_1fr]"
      )}
    >
      <div className="relative min-h-[190px] overflow-hidden bg-bg-muted sm:min-h-full">
        <Image
          src={service.thumbnail}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, 14rem"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 sm:p-6">
        {service.meta ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {service.meta}
          </p>
        ) : null}

        <h3 className="mt-2 text-xl font-semibold leading-tight text-tx-primary md:text-2xl">
          {service.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-tx-muted">
          {description}
        </p>

        {service.neededWhen?.length ? (
          <ul className="mt-4 grid gap-2">
            {service.neededWhen.slice(0, 2).map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-tx-secondary">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">
          Детайли за услугата
          <MdArrowRightAlt className="text-lg transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function InfoList({
  title,
  items,
  columns = true,
}: {
  title: string;
  items?: string[];
  columns?: boolean;
}) {
  if (!items?.length) return null;

  return (
    <section className="rounded-card border border-br-light bg-bg-page p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold leading-tight text-tx-primary">{title}</h2>
      <ul
        className={clsx(
          "mt-5 grid gap-3",
          columns && items.length > 2 ? "sm:grid-cols-2 sm:gap-x-8" : ""
        )}
      >
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-7 text-tx-secondary">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProcessList({ steps }: { steps?: string[] }) {
  if (!steps?.length) return null;

  return (
    <section className="rounded-card border border-br-light bg-bg-page p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold leading-tight text-tx-primary">Как протича</h2>
      <ol className="mt-5 grid gap-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-br-accent-soft bg-accent/10 text-sm font-semibold text-accent-strong">
              {index + 1}
            </span>
            <p className="pt-1 text-[15px] leading-7 text-tx-secondary">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function HelpPanel({
  title = "Не сте сигурни коя услуга е подходяща?",
  description = "Опишете накратко случая. Ще ви насочим какви документи са нужни и коя е най-подходящата следваща стъпка.",
  secondaryHref = "/uslugi/konsultacia",
  secondaryLabel = "Консултация",
}: {
  title?: string;
  description?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-card border border-br-light bg-bg-section p-6 shadow-sm sm:p-8">
      <div className="absolute inset-y-0 left-0 w-1 bg-accent/70" />
      <div className="max-w-3xl">
        <p className="typo-kicker text-accent">Насоки</p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-tx-primary">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-tx-muted">{description}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CtaButton href="/contacts" className="min-h-12 w-full sm:w-auto">
          Изпрати запитване
        </CtaButton>
        <CtaButton
          href={secondaryHref}
          variant="soft"
          className="min-h-12 w-full sm:w-auto"
        >
          {secondaryLabel}
        </CtaButton>
      </div>
    </section>
  );
}
