import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { serviceCategories } from "@/config/services/categories";
import { ServicePageLayout } from "../ServicePageLayout";

import { brand } from "@/config/content/brand";
import { createSeo } from "@/lib/seo";
import { getCategoryBySlug } from "@/lib/selectors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return createSeo({
      title: "Услуги",
      description: `Разгледайте геодезическите услуги на ${brand.name}.`,
      path: "/services",
    });
  }

  return createSeo({
    title: categoryData.title,
    description: categoryData.longDescription ?? categoryData.description,
    path: `/services/${categoryData.slug}`,
    image: categoryData.heroImage ?? categoryData.thumbnail,
  });
}

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
    <ServicePageLayout category={category}>
      <div className="space-y-12">
        <section className="max-w-3xl">
          <p className="typo-kicker text-accent">Подуслуги</p>

          <h2 className="mt-3 typo-h3 text-tx-primary">
            Изберете услуга според конкретната нужда
          </h2>

          <p className="mt-4 typo-body text-tx-secondary">
            По-долу ще откриете конкретните услуги в тази категория. Всяка страница
            съдържа кратко описание, приложимост, възможни документи и следващи стъпки, за
            да се ориентирате по-лесно.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {category.services.map((service, index) => {
            const imageLeft = index % 2 === 0;

            return (
              <Link
                key={service.slug}
                href={`/services/${category.slug}/${service.slug}`}
                className="group overflow-hidden rounded-[28px] border border-br-light bg-bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-br-strong hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:col-span-2"
              >
                <div
                  className={`grid gap-0 md:grid-cols-2 ${
                    imageLeft ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div className="relative min-h-[260px]">
                    <Image
                      src={service.heroImage ?? service.thumbnail}
                      alt={service.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                    {service.meta ? (
                      <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">
                        {service.meta}
                      </p>
                    ) : null}

                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-tx-primary md:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-tx-secondary">
                      {service.longDescription ?? service.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                      Виж подробности
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="border-t border-br-light pt-10 md:pt-12">
          <div className="max-w-2xl">
            <p className="typo-kicker text-accent">Запитване</p>

            <h3 className="mt-3 typo-h3 text-tx-primary">
              Не сте сигурни коя услуга е подходяща?
            </h3>

            <p className="mt-4 typo-body text-tx-secondary">
              Опишете накратко Вашия случай и ще получите насоки за най-подходящата
              услуга, както и какви документи и следващи стъпки може да са нужни.
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
                Всички категории
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ServicePageLayout>
  );
}
