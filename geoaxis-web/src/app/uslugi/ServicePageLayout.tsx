import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { SERVICES_HERO_MIN_HEIGHT } from "./services-hero.constants";
import { ServiceCategory } from "@/config/services/categories";
import { Section } from "@/components/layout/Section";
import FinalCTA from "@/components/sections/FinalCta";

type Props = {
  category: ServiceCategory;
  activeServiceSlug?: string;
  children: React.ReactNode;
};

export function ServicePageLayout({ category, activeServiceSlug, children }: Props) {
  const heroImage = category.thumbnail;
  const heroDescription = category.longDescription ?? category.description;

  return (
    <main className="bg-bg-page">
      {/* HERO */}
      <section
        className={clsx(
          "relative isolate overflow-hidden border-b border-br-light bg-white",
          SERVICES_HERO_MIN_HEIGHT
        )}
      >
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={category.title}
            fill
            priority
            className="object-cover object-[50%_30%]"
          />
        </div>

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/20 to-transparent" />
        {/* <div className="absolute inset-0 bg-black/55" /> */}
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/35 to-black/15" /> */}

        <div className="container-page relative pt-[calc(var(--header-h,96px)+2.5rem)] pb-14 md:pt-[calc(var(--header-h,96px)+3rem)] md:pb-16">
          {activeServiceSlug && (
            <nav aria-label="Breadcrumb" className="text-sm text-white/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Начало
                  </Link>
                </li>

                <li className="text-white/35">/</li>

                <li>
                  <Link href="/uslugi" className="transition hover:text-white">
                    Услуги
                  </Link>
                </li>

                <li className="text-white/35">/</li>

                <li className="text-white">{category.title}</li>
              </ol>
            </nav>
          )}

          {category.meta ? (
            // <p className="mt-6 typo-kicker text-accent">{category.meta}</p>
            <p className="mt-6 typo-kicker text-white/65">{category.meta}</p>
          ) : null}

          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {category.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
            {heroDescription}
          </p>

          {/* LIGHT TOP NAV INSTEAD OF SIDEBAR */}
          <div className="mt-8 flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <Section>{children}</Section>
      <FinalCTA />
    </main>
  );
}

type SubnavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
};

function SubnavLink({ href, label, active = false }: SubnavLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center rounded-full px-4 py-2 text-sm transition",
        active
          ? "bg-white text-tx-primary"
          : "border border-white/10 bg-white/5 text-white/85 backdrop-blur-sm hover:bg-white/15 hover:text-white"
      )}
    >
      {label}
    </Link>
  );
}
