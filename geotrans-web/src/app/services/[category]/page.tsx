import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { serviceCategories } from "../config/service-categories";
import { CtaButton } from "@/components/parts/CtaButton";

type PageProps = {
  params: {
    category: string;
    service: string;
  };
};

export default function ServiceDetailPage({ params }: PageProps) {
  const category = serviceCategories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const service = category.items.find((i) => i.slug === params.service);
  if (!service) notFound();

  return (
    <main className="bg-bg-page">
      <section className="border-b border-br-light bg-bg-section pt-28 pb-10 md:pt-36">
        <div className="container-page">
          <p className="typo-kicker">Услуги</p>
          <h1 className="mt-3 typo-h2">{category.title}</h1>
          <p className="mt-4 max-w-2xl typo-body">{category.intro}</p>

          {/* top tabs */}
          <div className="mt-8 flex flex-wrap gap-3">
            {serviceCategories.map((tab) => {
              const firstItem = tab.items[0];
              const href = `/services/${tab.slug}/${firstItem.slug}`;

              const isActive = tab.slug === category.slug;

              return (
                <Link
                  key={tab.slug}
                  href={href}
                  className={
                    isActive
                      ? "rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
                      : "rounded-full border border-br-default bg-bg-section px-5 py-2.5 text-sm font-medium text-tx-primary transition hover:border-accent/30 hover:text-accent"
                  }
                >
                  {tab.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          {/* sidebar */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-[--radius-card] border border-br-light bg-bg-section p-3">
              <div className="mb-3 px-3 pt-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                {category.title}
              </div>

              <nav className="space-y-2">
                {category.items.map((item) => {
                  const href = `/services/${category.slug}/${item.slug}`;
                  const isActive = item.slug === service.slug;

                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      className={
                        isActive
                          ? "block rounded-2xl bg-bg-brand-soft px-4 py-3 text-sm font-semibold text-tx-primary"
                          : "block rounded-2xl px-4 py-3 text-sm text-tx-secondary transition hover:bg-bg-muted hover:text-tx-primary"
                      }
                    >
                      {item.shortTitle}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* content */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[28px] border border-br-light bg-bg-section shadow-sm">
              <div className="relative aspect-[16/7]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                <h2 className="typo-h2">{service.title}</h2>
                <p className="mt-4 typo-subtitle">{service.excerpt}</p>

                <div className="mt-6 space-y-5">
                  {service.content.map((paragraph, index) => (
                    <p key={index} className="typo-body">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <CtaButton href="/contacts" size="lg">
                    Изпратете запитване
                  </CtaButton>

                  <CtaButton href="/projects" size="lg">
                    Вижте проекти
                  </CtaButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
