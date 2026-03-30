import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { ServiceCategory } from "@/config/services/categories";

type Props = {
  category: ServiceCategory;
  activeServiceSlug?: string;
  children: React.ReactNode;
};

export function ServiceSidebarLayout({ category, activeServiceSlug, children }: Props) {
  const heroImage = category.heroImage ?? category.thumbnail;
  const heroDescription = category.longDescription ?? category.description;

  return (
    <main className="bg-bg-page">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-br-light bg-black">
        <div className="relative min-h-[34dvh] md:min-h-[40dvh]">
          <Image
            src={heroImage}
            alt={category.title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-black/20" />

          <div className="container-page relative flex min-h-[34dvh] flex-col justify-end pt-[calc(var(--header-h,96px)+1.5rem)] pb-10 md:min-h-[40dvh] md:pt-[calc(var(--header-h,96px)+2rem)] md:pb-12">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
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

            {category.meta ? (
              <p className="typo-kicker text-white/80">{category.meta}</p>
            ) : null}

            <h1 className="mt-2 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {category.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-10 md:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-br-light/50 pl-4 md:pl-5 py-3 bg-bg-section">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tx-muted">
                Подуслуги
              </p>

              <nav aria-label="Подуслуги" className="mt-4 space-y-1">
                <SidebarLink
                  href={`/services/${category.slug}`}
                  title="Общ преглед"
                  active={!activeServiceSlug}
                />

                {category.services.map((service) => (
                  <SidebarLink
                    key={service.slug}
                    href={`/services/${category.slug}/${service.slug}`}
                    title={service.title}
                    active={activeServiceSlug === service.slug}
                  />
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN */}
          <div className="min-w-0">{children}</div>
        </div>
      </section>
    </main>
  );
}

type SidebarLinkProps = {
  href: string;
  title: string;
  active?: boolean;
};

function SidebarLink({ href, title, active = false }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "block border-l-2 py-2.5 pl-4 pr-2 text-sm leading-6 transition",
        active
          ? "border-accent text-tx-primary"
          : "border-transparent text-tx-secondary hover:border-accent-hover/70 hover:text-tx-primary hover:bg-bg-section"
      )}
    >
      {title}
    </Link>
  );
}
