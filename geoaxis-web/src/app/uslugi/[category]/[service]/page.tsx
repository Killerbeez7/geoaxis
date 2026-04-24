import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaButton } from "@/components/parts/CtaButton";
import { SITE_URL } from "@/config/site";
import { createSeo, createServiceSeo } from "@/lib/seo-builder";
import { getServiceFAQSchema, getServiceSchema } from "@/lib/schemas";
import { getServiceBySlugs, getServiceRouteParams } from "@/lib/selectors";
import { ServicePageLayout } from "../../ServicePageLayout";
import { HelpPanel, InfoList, ProcessList } from "../../_components/ServicesUi";

type Props = {
  params: Promise<{
    category: string;
    service: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const result = getServiceBySlugs(categorySlug, serviceSlug);

  if (!result) {
    return createSeo({
      title: "Услуга",
      description: "Подробности за геодезическа услуга.",
      canonical: `/uslugi/${categorySlug}/${serviceSlug}`,
      noIndex: true,
    });
  }

  return createServiceSeo(result.category, result.service);
}

export async function generateStaticParams() {
  return getServiceRouteParams();
}

export default async function ServicePage({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const result = getServiceBySlugs(categorySlug, serviceSlug);

  if (!result) notFound();

  const { category, service } = result;
  const servicePath = `/uslugi/${category.slug}/${service.slug}`;
  const description = service.longDescription ?? service.description;
  const faq = getServiceFAQSchema(service);
  const jsonLd = [getServiceSchema(SITE_URL, servicePath, service), faq].filter(Boolean);

  return (
    <ServicePageLayout category={category} service={service}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd),
        }}
      />

      <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
        <div className="space-y-6">
          <section className="rounded-card border border-br-light bg-bg-muted p-5 sm:p-6">
            <p className="typo-kicker text-accent">Накратко</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-tx-primary">
              Какво решава тази услуга
            </h2>
            <p className="mt-4 text-base leading-8 text-tx-secondary">{description}</p>
          </section>

          <InfoList title="Кога е нужна" items={service.neededWhen} />
          <InfoList title="Какво получавате" items={service.deliverables} />
          <InfoList title="Необходими документи" items={service.requiredDocs} />
          <ProcessList steps={service.processSteps} />
        </div>

        <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <div className="rounded-card border border-br-light bg-bg-page p-5 shadow-sm sm:p-6">
            <p className="typo-kicker text-accent">Следваща стъпка</p>
            <h2 className="mt-2 text-xl font-semibold leading-tight text-tx-primary">
              Изпратете кратко запитване
            </h2>
            <p className="mt-3 text-sm leading-6 text-tx-muted">
              Напишете адрес или идентификатор на имота и какво искате да направите. Ще
              върнем ясен отговор какво е нужно.
            </p>

            <CtaButton href="/contacts" className="mt-5 min-h-12 w-full">
              Свържи се
            </CtaButton>

            <Link
              href={`/uslugi/${category.slug}`}
              className="mt-4 inline-flex text-sm font-medium text-tx-muted transition hover:text-accent-strong"
            >
              Всички услуги в категорията
            </Link>
          </div>
        </aside>

        <div className="lg:col-span-2">
          <HelpPanel
            title="Имате по-специфичен казус?"
            description="Не е нужно да знаете точната услуга предварително. Изпратете кратко описание и ще ви върнем конкретна насока."
            secondaryHref={`/uslugi/${category.slug}`}
            secondaryLabel="Към категорията"
          />
        </div>
      </article>
    </ServicePageLayout>
  );
}
