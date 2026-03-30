import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { serviceCategories } from "@/config/services/categories";
import { ServiceSidebarLayout } from "../ServiceSidebarLayout";
import { Section } from "@/components/layout/Section";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;

  const category = serviceCategories.find((item) => item.slug === categorySlug);

  if (!category) notFound();

  return (
    <ServiceSidebarLayout category={category}>
      <Section className="space-y-14 md:space-y-16">
        {/* INTRO */}
        <section className="max-w-4xl">
          <p className="typo-kicker text-accent">Категория</p>

          <h2 className="mt-3 typo-h2 text-tx-primary">{category.title}</h2>

          <p className="mt-5 max-w-3xl typo-body text-tx-secondary">
            {category.longDescription ?? category.description}
          </p>

          <div className="mt-8 grid gap-6 border-t border-br-light pt-7 md:grid-cols-3 md:gap-8">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-tx-muted">
                Подуслуги
              </p>
              <p className="text-3xl font-semibold leading-none text-tx-muted">
                {category.services.length}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-tx-muted">
                Подход
              </p>
              <p className="text-base leading-7 text-tx-muted">
                Точност, яснота и практични насоки
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-tx-muted">
                Подходящо за
              </p>
              <p className="text-base leading-7 text-tx-muted">
                Имотни, строителни и административни казуси
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES INTRO */}
        <section className="max-w-3xl">
          <p className="typo-kicker text-accent">Подуслуги</p>

          <h3 className="mt-3 typo-h3 text-tx-primary">Изберете конкретна услуга</h3>

          <p className="mt-4 typo-body text-tx-secondary">
            Всяка услуга има собствена страница с подробно описание, изображения, процес
            на работа, необходими документи и полезни насоки според конкретния случай.
          </p>
        </section>

        {/* SERVICES GRID */}
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            {category.services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${category.slug}/${service.slug}`}
                className="group overflow-hidden rounded-[24px] border border-br-light bg-bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-br-strong hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={service.thumbnail}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    {service.meta ? (
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/75">
                        {service.meta}
                      </p>
                    ) : null}

                    <h3 className="mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <p className="line-clamp-3 text-sm leading-6 text-tx-secondary md:text-[15px]">
                    {service.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                    Виж подробности
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-br-light pt-10 md:pt-12">
          <div className="max-w-2xl">
            <p className="typo-kicker text-accent">Запитване</p>

            <h3 className="mt-3 typo-h3 text-tx-primary">
              Не сте сигурни коя услуга е подходяща?
            </h3>

            <p className="mt-4 typo-body text-tx-secondary">
              Опишете накратко Вашия случай и ще получите насоки за подходящата услуга,
              нужните документи и логичните следващи стъпки.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-tx-inverse transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                Изпратете запитване
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-br-light bg-transparent px-6 py-3 text-sm font-semibold text-tx-primary transition-colors duration-300 hover:border-br-strong hover:bg-bg-surface"
              >
                Всички услуги
              </Link>
            </div>
          </div>
        </section>
      </Section>
    </ServiceSidebarLayout>
  );
}
