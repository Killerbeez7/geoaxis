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
      <article className="mx-auto max-w-5xl">
        {/* SERVICES LIST */}
        <section className="mt-12 space-y-16 md:space-y-20">
          {category.services.map((service, index) => {
            const imageLeft = index % 2 === 0;
            const imageSrc = service.thumbnail;

            return (
              <section
                key={service.slug}
                className="grid items-start gap-8 md:grid-cols-2 md:gap-10"
              >
                <div className={imageLeft ? "" : "md:order-2"}>
                  <div className="relative overflow-hidden rounded-[20px] bg-bg-surface">
                    <div className="relative aspect-4/3 min-h-[260px]">
                      <Image
                        src={imageSrc}
                        alt={service.title}
                        fill
                        // className="object-cover scale-75"
                        className="object-cover scale-90"
                      />
                    </div>
                  </div>
                </div>

                <div className={imageLeft ? "" : "md:order-1"}>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-tx-primary md:text-3xl">
                    {service.title}
                  </h3>

                  <div className="mt-5 space-y-4 text-base leading-8 text-tx-secondary">
                    <p>{service.longDescription ?? service.description}</p>

                    {service.neededWhen?.length ? (
                      <ul className="space-y-2 pt-1">
                        {service.neededWhen.slice(0, 5).map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </section>
            );
          })}
        </section>

        {/* CTA */}
        <section className="mt-16 border-t border-br-light pt-10 md:pt-12">
          <div className="max-w-2xl">
            <p className="typo-kicker text-accent">Запитване</p>

            <h3 className="mt-3 typo-h3 text-tx-primary">Нуждаете се от консултация?</h3>

            <p className="mt-4 typo-body text-tx-secondary">
              Свържете се с нас и ще получите насоки според Вашия случай, нуждите на имота
              и следващите стъпки.
            </p>

            <div className="mt-7">
              <a
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-tx-inverse transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                Изпратете запитване
              </a>
            </div>
          </div>
        </section>
      </article>
    </ServicePageLayout>
  );
}
