import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
// Components
import { serviceCategories } from "@/config/services/categories";
import { ServiceSidebarLayout } from "../../ServiceSidebarLayout";
// SEO
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

  return (
    <ServiceSidebarLayout category={category} activeServiceSlug={service.slug}>
      <article className="space-y-12 md:space-y-14">
        {/* HERO IMAGE */}
        <section className="relative aspect-16/7 min-h-[260px] overflow-hidden rounded-[24px]">
          <Image
            src={heroImage}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            {service.meta && (
              <p className="text-xs uppercase tracking-[0.2em] text-white/75">
                {service.meta}
              </p>
            )}

            <h1 className="typo-h3 font-semibold text-tx-inverse/95">{service.title}</h1>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/* LEFT CONTENT */}
          <div>
            <p className="max-w-3xl text-base leading-8 text-tx-secondary md:text-lg">
              {description}
            </p>

            <div className="mt-10 space-y-6">
              <h2 className="text-2xl font-semibold text-tx-primary">
                Какво представлява услугата
              </h2>

              <p className="text-base leading-7 text-tx-secondary">
                Услугата осигурява точна основа за вземане на решения, проектиране и
                последващи административни действия. Подходът е съобразен с конкретния
                имот, терен и инвестиционно намерение.
              </p>

              <p className="text-base leading-7 text-tx-secondary">
                Извършва се прецизно измерване, обработка на данни и подготовка на
                необходимата документация, така че резултатите да могат да бъдат
                използвани директно в следващите етапи.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <h2 className="text-2xl font-semibold text-tx-primary">Защо е важна</h2>

              <p className="text-base leading-7 text-tx-secondary">
                Точните измервания и правилно подготвената документация намаляват риска от
                грешки, забавяния и допълнителни разходи в по-късен етап.
              </p>

              <p className="text-base leading-7 text-tx-secondary">
                Това позволява на проектанти, инвеститори и институции да работят върху
                надеждна основа и да вземат информирани решения.
              </p>
            </div>

            {service.processSteps?.length && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-tx-primary">
                  Как протича услугата
                </h2>

                <div className="mt-6 space-y-5">
                  {service.processSteps.map((step, index) => (
                    <div key={step} className="flex gap-4">
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-tx-inverse">
                        {index + 1}
                      </div>

                      <p className="text-base leading-7 text-tx-secondary">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-8">
            {service.neededWhen?.length && (
              <div>
                <h3 className="text-lg font-semibold text-tx-primary">
                  Кога е необходима
                </h3>

                <ul className="mt-4 space-y-3">
                  {service.neededWhen.map((item) => (
                    <li key={item} className="text-sm leading-6 text-tx-secondary">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.requiredDocs?.length && (
              <div>
                <h3 className="text-lg font-semibold text-tx-primary">
                  Необходими документи
                </h3>

                <ul className="mt-4 space-y-3">
                  {service.requiredDocs.map((item) => (
                    <li key={item} className="text-sm leading-6 text-tx-secondary">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.deliverables?.length && (
              <div>
                <h3 className="text-lg font-semibold text-tx-primary">
                  Какво получавате
                </h3>

                <ul className="mt-4 space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="text-sm leading-6 text-tx-secondary">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-br-light pt-6">
              <h3 className="text-lg font-semibold text-tx-primary">Следваща стъпка</h3>

              <p className="mt-3 text-sm leading-6 text-tx-secondary">
                Свържете се с нас за консултация и насоки според Вашия случай.
              </p>

              <Link
                href="/contacts"
                className="mt-5 inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-tx-inverse transition hover:-translate-y-0.5"
              >
                Изпратете запитване
              </Link>
            </div>
          </aside>
        </section>
      </article>
    </ServiceSidebarLayout>
  );
}
