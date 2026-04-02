import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { serviceCategories } from "@/config/services/categories";
import { ServicePageLayout } from "../../ServicePageLayout";

import { createSeo } from "@/lib/seo";
import { brand } from "@/config/content/brand";

export async function generateMetadata({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;

  const category = serviceCategories.find((item) => item.slug === categorySlug);
  const service = category?.services.find((item) => item.slug === serviceSlug);

  if (!category || !service) {
    return createSeo({
      title: "Услуга",
      description: `Подробности за услугата на ${brand.name}.`,
      path: `/services/${categorySlug}/${serviceSlug}`,
    });
  }

  return createSeo({
    title: service.title,
    description: service.longDescription ?? service.description,
    path: `/services/${categorySlug}/${serviceSlug}`,
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

  const relatedServices = category.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <ServicePageLayout category={category} activeServiceSlug={service.slug}>
      <article className="space-y-14 md:space-y-16">
        {/* PAGE HERO */}
        <section className="grid items-start gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <div className="relative overflow-hidden rounded-[28px] border border-br-light bg-bg-surface">
            <div className="relative aspect-[4/3] min-h-[280px]">
              <Image
                src={heroImage}
                alt={service.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:pt-2">
            {service.meta ? (
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent/80">
                {service.meta}
              </p>
            ) : null}

            <h1 className="mt-3 text-3xl font-semibold leading-tight text-tx-primary md:text-4xl">
              {service.title}
            </h1>

            <p className="mt-6 text-base leading-8 text-tx-secondary md:text-lg">
              {description}
            </p>
          </div>
        </section>

        {/* WHEN / DOCS */}
        {(service.neededWhen?.length || service.requiredDocs?.length) && (
          <section className="grid gap-8 md:grid-cols-2">
            {service.neededWhen?.length ? (
              <div>
                <h2 className="text-2xl font-semibold text-tx-primary">
                  Кога е необходима
                </h2>

                <ul className="mt-5 space-y-3">
                  {service.neededWhen.map((item) => (
                    <li key={item} className="text-base leading-7 text-tx-secondary">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {service.requiredDocs?.length ? (
              <div>
                <h2 className="text-2xl font-semibold text-tx-primary">
                  Необходими документи
                </h2>

                <ul className="mt-5 space-y-3">
                  {service.requiredDocs.map((item) => (
                    <li key={item} className="text-base leading-7 text-tx-secondary">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        )}

        {/* WHAT YOU RECEIVE */}
        {service.deliverables?.length ? (
          <section className="grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-10">
            <div>
              <h2 className="text-2xl font-semibold text-tx-primary">Какво получавате</h2>

              <ul className="mt-5 space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="text-base leading-7 text-tx-secondary">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-br-light bg-bg-surface">
              <div className="relative aspect-[4/3] min-h-[260px]">
                <Image
                  src={service.thumbnail}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        ) : null}

        {/* PROCESS */}
        {service.processSteps?.length ? (
          <section>
            <h2 className="text-2xl font-semibold text-tx-primary">
              Как протича услугата
            </h2>

            <div className="mt-8 space-y-6">
              {service.processSteps.map((step, index) => (
                <div
                  key={step}
                  className="grid gap-4 border-l-2 border-br-light pl-5 md:grid-cols-[auto_1fr]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-tx-inverse">
                    {index + 1}
                  </div>

                  <p className="text-base leading-7 text-tx-secondary">{step}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* CONTEXT */}
        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-tx-primary">
              Какво включва услугата
            </h2>

            <p className="mt-5 text-base leading-8 text-tx-secondary">
              Услугата включва измерване, обработка на данни и подготовка на необходимите
              материали според конкретния имот, терен или проект. Работата се съобразява с
              особеностите на случая и целта на последващото използване.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-tx-primary">Защо е важна</h2>

            <p className="mt-5 text-base leading-8 text-tx-secondary">
              Точно подготвените данни и документация намаляват риска от грешки, забавяния
              и допълнителни разходи в следващите етапи на проектиране, строителство или
              административна процедура.
            </p>
          </div>
        </section>

        {/* RELATED */}
        {relatedServices.length > 0 ? (
          <section>
            <p className="typo-kicker text-accent">Свързани услуги</p>

            <h2 className="mt-3 text-2xl font-semibold text-tx-primary">
              Още от категория {category.title}
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${category.slug}/${item.slug}`}
                  className="group rounded-[24px] border border-br-light bg-bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-br-strong hover:shadow-[0_10px_24px_rgba(0,0,0,0.05)]"
                >
                  <p className="text-lg font-semibold text-tx-primary">{item.title}</p>

                  {item.meta ? (
                    <p className="mt-2 text-sm text-tx-secondary">{item.meta}</p>
                  ) : null}

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-tx-secondary">
                    {item.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                    Виж услугата
                    <span aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* CTA */}
        <section className="border-t border-br-light pt-10 md:pt-12">
          <div className="max-w-3xl">
            <p className="typo-kicker text-accent">Консултация</p>

            <h2 className="mt-3 text-2xl font-semibold text-tx-primary md:text-3xl">
              Нуждаете се от насоки за Вашия случай?
            </h2>

            <p className="mt-4 text-base leading-8 text-tx-secondary">
              Свържете се с нас за консултация и ще получите по-ясна представа каква
              услуга е необходима, какви документи може да са нужни и какви са логичните
              следващи стъпки.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-tx-inverse transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                Изпратете запитване
              </Link>

              <Link
                href={`/services/${category.slug}`}
                className="inline-flex items-center justify-center rounded-xl border border-br-light bg-transparent px-6 py-3 text-sm font-semibold text-tx-primary transition-colors duration-300 hover:border-br-strong hover:bg-bg-surface"
              >
                Назад към категорията
              </Link>
            </div>
          </div>
        </section>
      </article>
    </ServicePageLayout>
  );
}
