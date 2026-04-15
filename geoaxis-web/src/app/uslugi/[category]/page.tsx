import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";

import { serviceCategories } from "@/config/services/categories";
import { ServicePageLayout } from "../ServicePageLayout";

import { createCategorySeo, createSeo } from "@/lib/seo-builder";
import { getCategoryBySlug } from "@/lib/selectors";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return createSeo({
      title: "Услуги",
      description: "Разгледайте геодезическите услуги на GeoAxis.",
      canonical: "/uslugi",
    });
  }

  return createCategorySeo(categoryData);
}

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
      <article>
        {/* Services list */}
        <section className="mt-10 sm:mt-12 space-y-16 sm:space-y-20 md:space-y-24">
          {category.services.map((service, index) => {
            const imageLeft = index % 2 === 0;
            const imageSrc = service.thumbnail;
            const serviceHref = `/uslugi/${category.slug}/${service.slug}`;

            return (
              <section
                key={service.slug}
                className={clsx(
                  "grid items-center gap-6 sm:gap-8",
                  "md:grid-cols-2 md:gap-10 lg:gap-14"
                )}
              >
                {/* Image */}
                <div className={imageLeft ? "" : "md:order-2"}>
                  <Link
                    href={serviceHref}
                    className={clsx(
                      "block relative group",
                      /* Full bleed on mobile */
                      "-mx-4 sm:-mx-6 md:mx-0",
                      "md:rounded-[20px] md:overflow-hidden",
                      "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)]",
                      "transition-shadow duration-300",
                      "hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)]"
                    )}
                  >
                    <div className="relative aspect-4/3 md:aspect-[4/3.2] overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={clsx(
                          "object-cover",
                          "transition-transform duration-500",
                          "group-hover:scale-[1.03]"
                        )}
                      />
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className={clsx("px-1 md:px-0", imageLeft ? "" : "md:order-1")}>
                  {/* Meta */}
                  {service.meta && (
                    <p
                      className={clsx(
                        "text-[11px] sm:text-xs",
                        "uppercase tracking-[0.16em]",
                        "text-accent/95 font-semibold"
                      )}
                    >
                      {service.meta}
                    </p>
                  )}

                  {/* Title */}
                  <h3
                    className={clsx(
                      service.meta ? "mt-2" : "",
                      "text-xl sm:text-2xl md:text-[1.7rem]",

                      "font-semibold leading-[1.2] tracking-tight",
                      "text-tx-primary"
                    )}
                  >
                    <Link
                      href={serviceHref}
                      className="hover:text-accent transition-colors duration-200"
                    >
                      {service.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p
                    className={clsx(
                      "mt-3 sm:mt-4",
                      "text-[15px] md:text-base leading-[1.75] text-tx-secondary"
                    )}
                  >
                    {service.longDescription ?? service.description}
                  </p>

                  {/* Needed when list */}
                  {service.neededWhen?.length ? (
                    <ul className="mt-4 space-y-2">
                      {service.neededWhen.slice(0, 4).map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            className={clsx(
                              "mt-[8px] shrink-0",
                              "h-1.5 w-1.5 rounded-full bg-accent/70"
                            )}
                          />
                          <span className="text-[14px] leading-[1.6] text-tx-secondary">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* CTA */}
                  <div className="mt-5 sm:mt-6">
                    <Link
                      href={serviceHref}
                      className={clsx(
                        "inline-flex items-center gap-2",
                        "text-sm font-semibold text-accent",
                        "transition-all duration-200",
                        "hover:gap-3"
                      )}
                    >
                      Научете повече
                      <span className="text-[13px]">→</span>
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section
          className={clsx("mt-16 sm:mt-20 pt-10 sm:pt-12", "border-t border-br-light")}
        >
          <div className="max-w-xl">
            <p
              className={clsx(
                "text-[11px] uppercase tracking-[0.14em]",
                "text-accent font-semibold"
              )}
            >
              Не сте сигурни коя услуга ви трябва?
            </p>

            <h2
              className={clsx(
                "mt-2",
                "text-xl sm:text-2xl",
                "font-semibold leading-tight text-tx-primary"
              )}
            >
              Ще ви помогнем да изберете
            </h2>

            <p className={clsx("mt-3", "text-[15px] leading-[1.65] text-tx-secondary")}>
              Опишете накратко Вашия случай и ще получите насоки за подходящата услуга и
              следващите стъпки.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contacts"
                className={clsx(
                  "inline-flex items-center justify-center",
                  "rounded-xl bg-accent",
                  "px-5 py-3",
                  "text-sm font-semibold text-tx-inverse",
                  "shadow-md shadow-accent/20",
                  "transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25"
                )}
              >
                Направете запитване
              </Link>

              <Link
                href="/uslugi"
                className={clsx(
                  "inline-flex items-center justify-center",
                  "rounded-xl",
                  "px-4 py-3",
                  "text-sm font-medium text-tx-muted",
                  "transition-colors duration-200",
                  "hover:text-tx-primary"
                )}
              >
                Всички категории
              </Link>
            </div>
          </div>
        </section>
      </article>
    </ServicePageLayout>
  );
}
