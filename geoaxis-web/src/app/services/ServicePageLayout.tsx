import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { ServiceCategory } from "@/config/services/categories";

type Props = {
  category: ServiceCategory;
  activeServiceSlug?: string;
  children: React.ReactNode;
};

export function ServicePageLayout({ category, activeServiceSlug, children }: Props) {
  const heroImage = category.heroImage ?? category.thumbnail;
  const heroDescription = category.longDescription ?? category.description;

  return (
    <main className="bg-bg-page">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-br-light bg-white">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={category.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/45 to-black/25" />

        <div className="container-page relative pt-[calc(var(--header-h,96px)+2.5rem)] pb-14 md:pt-[calc(var(--header-h,96px)+3rem)] md:pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Начало
                </Link>
              </li>

              <li className="text-white/35">/</li>

              <li>
                <Link href="/services" className="transition hover:text-white">
                  Услуги
                </Link>
              </li>

              <li className="text-white/35">/</li>

              <li className="text-white">{category.title}</li>
            </ol>
          </nav>

          {/* {category.meta ? (
            <p className="mt-6 typo-kicker text-accent">{category.meta}</p>
          ) : null} */}

          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {category.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
            {heroDescription}
          </p>

          {/* LIGHT TOP NAV INSTEAD OF SIDEBAR */}
          <div className="mt-8 flex flex-wrap gap-3">
            <SubnavLink
              href={`/services/${category.slug}`}
              label="Общ преглед"
              active={!activeServiceSlug}
            />

            {category.services.map((service) => (
              <SubnavLink
                key={service.slug}
                href={`/services/${category.slug}/${service.slug}`}
                label={service.title}
                active={activeServiceSlug === service.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-10 md:py-14 lg:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">{children}</div>
        </div>
      </section>
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
          : "border border-white/20 bg-white/10 text-white/85 backdrop-blur-sm hover:bg-white/15 hover:text-white"
      )}
    >
      {label}
    </Link>
  );
}
