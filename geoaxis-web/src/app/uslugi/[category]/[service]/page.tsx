import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { serviceCategories } from "@/config/services/categories";
import { ServicePageLayout } from "../../ServicePageLayout";

import { createSeo } from "@/lib/seo-builder";
import { brand } from "@/config/content/brand";

export async function generateMetadata({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;

  const category = serviceCategories.find((item) => item.slug === categorySlug);
  const service = category?.services.find((item) => item.slug === serviceSlug);

  if (!category || !service) {
    return createSeo({
      title: "Услуга",
      description: `Подробности за услугата на ${brand.name}.`,
      path: `/uslugi/${categorySlug}/${serviceSlug}`,
    });
  }

  return createSeo({
    title: service.title,
    description: service.longDescription ?? service.description,
    path: `/uslugi/${categorySlug}/${serviceSlug}`,
    image: service.heroImage ?? service.thumbnail,
  });
}

type Props = {
  params: Promise<{
    category: string;
    service: string;
  }>;
};

export async function generateStaticParams() {
  return serviceCategories.flatMap((category) =>
    category.services.map((service) => ({
      category: category.slug,
      service: service.slug,
    }))
  );
}

export default async function ServicePage({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;

  const category = serviceCategories.find((item) => item.slug === categorySlug);
  if (!category) notFound();

  const service = category.services.find((item) => item.slug === serviceSlug);
  if (!service) notFound();

  const heroImage = service.heroImage ?? service.thumbnail;
  const description = service.longDescription ?? service.description;

  const primaryList = service.neededWhen?.length
    ? {
        title: "Подходяща при",
        items: service.neededWhen,
      }
    : service.deliverables?.length
      ? {
          title: "Какво получавате",
          items: service.deliverables,
        }
      : service.requiredDocs?.length
        ? {
            title: "Необходими документи",
            items: service.requiredDocs,
          }
        : null;

  return (
    <ServicePageLayout category={category} activeServiceSlug={service.slug}>
      <article className="mx-auto max-w-4xl">
        {/* TOP */}
        <section className="grid items-start gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <div className="relative overflow-hidden rounded-[24px] bg-bg-surface">
            <div className="relative aspect-[4/3] min-h-[260px]">
              <Image
                src={heroImage}
                alt={service.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:pt-1">
            {service.meta ? (
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent/80">
                {service.meta}
              </p>
            ) : null}

            <h1 className="mt-3 text-3xl font-semibold leading-tight text-tx-primary md:text-4xl">
              {service.title}
            </h1>

            <p className="mt-5 text-base leading-8 text-tx-secondary">{description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-tx-inverse transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                Изпратете запитване
              </Link>

              <Link
                href={`/uslugi/${category.slug}`}
                className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-tx-secondary transition-colors duration-300 hover:text-tx-primary"
              >
                Назад към категорията
              </Link>
            </div>
          </div>
        </section>

        {/* MAIN LIST */}
        {primaryList ? (
          <section className="mt-12 border-t border-br-light pt-10">
            <h2 className="text-2xl font-semibold text-tx-primary">
              {primaryList.title}
            </h2>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {primaryList.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-7 text-tx-secondary"
                >
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* OPTIONAL SECONDARY INFO */}
        {service.processSteps?.length ? (
          <section className="mt-12 border-t border-br-light pt-10">
            <h2 className="text-2xl font-semibold text-tx-primary">Как протича</h2>

            <div className="mt-6 space-y-4">
              {service.processSteps.slice(0, 4).map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-surface text-sm font-semibold text-tx-primary">
                    {index + 1}
                  </div>

                  <p className="text-base leading-7 text-tx-secondary">{step}</p>
                </div>
              ))}
            </div>
          </section>
        ) : service.requiredDocs?.length &&
          primaryList?.title !== "Необходими документи" ? (
          <section className="mt-12 border-t border-br-light pt-10">
            <h2 className="text-2xl font-semibold text-tx-primary">
              Необходими документи
            </h2>

            <ul className="mt-5 space-y-3">
              {service.requiredDocs.slice(0, 6).map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-7 text-tx-secondary"
                >
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* CTA */}
        <section className="mt-14 border-t border-br-light pt-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-tx-primary md:text-3xl">
              Нужна Ви е консултация?
            </h2>

            <p className="mt-4 text-base leading-8 text-tx-secondary">
              Опишете накратко Вашия случай и ще получите насоки за подходящата услуга и
              следващите стъпки.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-tx-inverse transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                Направете запитване
              </Link>

              <Link
                href="/uslugi"
                className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-tx-secondary transition-colors duration-300 hover:text-tx-primary"
              >
                Всички услуги
              </Link>
            </div>
          </div>
        </section>
      </article>
    </ServicePageLayout>
  );
}
