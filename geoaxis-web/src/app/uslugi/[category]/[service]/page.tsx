import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import clsx from "clsx";

import { serviceCategories } from "@/config/services/categories";
import { ServicePageLayout } from "../../ServicePageLayout";

import { createSeo, createServiceSeo } from "@/lib/seo-builder";
import { getServiceFAQSchema } from "@/lib/schemas";

type Props = {
  params: Promise<{
    category: string;
    service: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;

  const category = serviceCategories.find((item) => item.slug === categorySlug);
  const service = category?.services.find((item) => item.slug === serviceSlug);

  if (!category || !service) {
    return createSeo({
      title: "Услуга",
      description: "Подробности за услугата.",
      canonical: `/uslugi/${categorySlug}/${serviceSlug}`,
    });
  }

  return createServiceSeo(category, service);
}

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
      {(() => {
        const faq = getServiceFAQSchema(service);
        return faq ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
          />
        ) : null;
      })()}
      <article className="mx-auto max-w-4xl">
        {/* ============ HERO SECTION ============ */}
        <section className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-10 lg:gap-14 md:items-center">
          {/* Image — full bleed on mobile */}
          <div
            className={clsx(
              "relative -mx-4 sm:-mx-6 md:mx-0",
              "md:rounded-[20px] md:overflow-hidden",
              "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
            )}
          >
            <div className="relative aspect-[4/3] md:aspect-[4/3.5]">
              <Image
                src={heroImage}
                alt={service.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-1 md:px-0">
            {/* Meta tag */}
            {service.meta && (
              <p
                className={clsx(
                  "inline-block",
                  "text-[10px] sm:text-[11px]",
                  "uppercase tracking-[0.16em]",
                  "text-accent font-semibold"
                )}
              >
                {service.meta}
              </p>
            )}

            {/* Title */}
            <h1
              className={clsx(
                "mt-2 md:mt-3",
                "text-2xl sm:text-3xl md:text-[2.1rem]",
                "font-semibold leading-[1.15] tracking-tight",
                "text-tx-primary"
              )}
            >
              {service.title}
            </h1>

            {/* Description */}
            <p
              className={clsx(
                "mt-4 md:mt-5",
                "text-[15px] sm:text-base",
                "leading-[1.7] text-tx-secondary"
              )}
            >
              {description}
            </p>

            {/* CTAs */}
            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contacts"
                className={clsx(
                  "inline-flex items-center justify-center",
                  "rounded-xl bg-accent",
                  "px-5 py-3 sm:px-6",
                  "text-sm font-semibold text-tx-inverse",
                  "shadow-md shadow-accent/20",
                  "transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25"
                )}
              >
                Изпратете запитване
              </Link>

              <Link
                href={`/uslugi/${category.slug}`}
                className={clsx(
                  "inline-flex items-center justify-center",
                  "rounded-xl",
                  "px-4 py-3",
                  "text-sm font-medium text-tx-muted",
                  "transition-colors duration-200",
                  "hover:text-tx-primary"
                )}
              >
                ← Към категорията
              </Link>
            </div>
          </div>
        </section>

        {/* ============ PRIMARY LIST ============ */}
        {primaryList && (
          <section className="mt-12 sm:mt-14 pt-10 border-t border-br-light">
            <SectionHeader>{primaryList.title}</SectionHeader>

            <ul className="mt-5 sm:mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
              {primaryList.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className={clsx(
                      "mt-[9px] shrink-0",
                      "h-1.5 w-1.5 rounded-full bg-accent/70"
                    )}
                  />
                  <span className="text-[15px] leading-[1.65] text-tx-secondary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ============ PROCESS STEPS ============ */}
        {service.processSteps?.length ? (
          <section className="mt-12 sm:mt-14 pt-10 border-t border-br-light">
            <SectionHeader>Как протича</SectionHeader>

            <div className="mt-6 space-y-4">
              {service.processSteps.slice(0, 4).map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div
                    className={clsx(
                      "flex shrink-0 items-center justify-center",
                      "h-8 w-8 rounded-full",
                      "bg-bg-muted border border-br-light",
                      "text-sm font-semibold text-tx-muted"
                    )}
                  >
                    {index + 1}
                  </div>
                  <p className="pt-1 text-[15px] leading-[1.65] text-tx-secondary">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : service.requiredDocs?.length &&
          primaryList?.title !== "Необходими документи" ? (
          <section className="mt-12 sm:mt-14 pt-10 border-t border-br-light">
            <SectionHeader>Необходими документи</SectionHeader>

            <ul className="mt-5 sm:mt-6 space-y-3">
              {service.requiredDocs.slice(0, 6).map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className={clsx(
                      "mt-[9px] shrink-0",
                      "h-1.5 w-1.5 rounded-full bg-accent/70"
                    )}
                  />
                  <span className="text-[15px] leading-[1.65] text-tx-secondary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* ============ FINAL CTA ============ */}
        <section
          className={clsx("mt-14 sm:mt-16 pt-10 sm:pt-12", "border-t border-br-light")}
        >
          <div className="max-w-xl">
            <p
              className={clsx(
                "text-[11px] uppercase tracking-[0.14em]",
                "text-accent font-semibold"
              )}
            >
              Следваща стъпка
            </p>

            <h2
              className={clsx(
                "mt-2",
                "text-xl sm:text-2xl md:text-[1.65rem]",
                "font-semibold leading-tight text-tx-primary"
              )}
            >
              Нужна Ви е консултация?
            </h2>

            <p
              className={clsx(
                "mt-3 sm:mt-4",
                "text-[15px] leading-[1.65] text-tx-secondary"
              )}
            >
              Опишете накратко Вашия случай и ще получите насоки за подходящата услуга и
              следващите стъпки.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/contacts"
                className={clsx(
                  "inline-flex items-center justify-center",
                  "rounded-xl bg-accent",
                  "px-5 py-3 sm:px-6",
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
                Всички услуги
              </Link>
            </div>
          </div>
        </section>
      </article>
    </ServicePageLayout>
  );
}

/* ============ HELPER COMPONENTS ============ */

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={clsx(
        "text-lg sm:text-xl md:text-[1.35rem]",
        "font-semibold text-tx-primary"
      )}
    >
      {children}
    </h2>
  );
}
