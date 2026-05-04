import { notFound, permanentRedirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

import { SITE_URL } from "@/config/site";
import type { Service, ServiceCategory } from "@/config/services/categories";
import { createSeo, createServiceSeo } from "@/lib/seo-builder";
import { getServiceFAQSchema, getServiceSchema } from "@/lib/schemas";
import { getDedicatedServiceRouteParams, getServiceBySlugs } from "@/lib/selectors";
import { getServiceHref } from "@/utils/urlHelpers";
import { normalizeParagraphs } from "@/utils/normalizeText";
import { ServicePageLayout } from "../../ServicePageLayout";

const FALLBACK_WHEN_INTRO =
  "Услугата е подходяща, когато трябва да се подготви следваща стъпка на база точни данни за имота или обекта.";
const FALLBACK_DOCS_INTRO =
  "В началото са най-полезни основните данни за имота, наличните документи и кратко описание на целта.";
const FALLBACK_PROCESS_INTRO =
  "Работата започва с уточняване на конкретния случай, след което се определят необходимите измервания, документи и материали.";
const FALLBACK_DELIVERABLES_INTRO =
  "Резултатът трябва да даде ясна и използваема основа за следващата стъпка.";

type Props = {
  params: Promise<{
    category: string;
    service: string;
  }>;
};

function toSeoDescription(description: string | string[] | undefined, fallback: string) {
  if (Array.isArray(description)) return description.join(" ");
  return description ?? fallback;
}

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

  const { category, service } = result;

  if (!service.hasDedicatedPage) {
    return createSeo({
      title: service.title,
      description: toSeoDescription(service.longDescription, service.description),
      canonical: `/uslugi/${category.slug}`,
      image:
        service.heroImage ||
        service.thumbnail ||
        category.heroImage ||
        category.thumbnail,
      noIndex: true,
    });
  }

  return createServiceSeo(category, service);
}

export async function generateStaticParams() {
  return getDedicatedServiceRouteParams();
}

export default async function ServicePage({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const result = getServiceBySlugs(categorySlug, serviceSlug);

  if (!result) notFound();

  if (!result.service.hasDedicatedPage) {
    permanentRedirect(`/uslugi/${result.category.slug}#${result.service.slug}`);
  }

  const servicePath = `/uslugi/${result.category.slug}/${result.service.slug}`;
  const serviceSchema = getServiceSchema(SITE_URL, servicePath, result.service);
  const faqSchema = getServiceFAQSchema(result.service);

  return (
    <ServicePageLayout category={result.category} service={result.service}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      ) : null}

      <DedicatedServiceContent category={result.category} service={result.service} />
    </ServicePageLayout>
  );
}

function DedicatedServiceContent({
  category,
  service,
}: {
  category: ServiceCategory;
  service: Service;
}) {
  const paragraphs = normalizeParagraphs(service.longDescription ?? service.description);
  const introParagraphs = paragraphs.slice(0, 2);
  const content = service.content;
  const relatedServices = category.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 4);

  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(18rem,0.32fr)]">
      <div className="min-w-0">
        <section>
          <p className="typo-kicker">{category.shortTitle ?? category.title}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-tx-primary">
            За услугата
          </h2>
          <div className="mt-6 space-y-5 text-[1.03rem] leading-8 text-tx-secondary">
            {introParagraphs.map((paragraph, index) => (
              <p key={`service-intro-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>

        <EditorialListSection
          title="Кога е подходяща"
          intro={content?.whenIntro ?? FALLBACK_WHEN_INTRO}
          items={content?.neededWhen}
        />

        <EditorialTextSection
          title="Какво е важно да знаете"
          paragraphs={content?.importantToKnow}
        />

        <EditorialListSection
          title="Какво е добре да подготвите"
          intro={content?.docsIntro ?? FALLBACK_DOCS_INTRO}
          items={content?.requiredDocs}
        />

        <ProcessSection
          items={content?.processSteps}
          intro={content?.processIntro ?? FALLBACK_PROCESS_INTRO}
        />

        <EditorialListSection
          title="Какво получавате"
          intro={content?.deliverablesIntro ?? FALLBACK_DELIVERABLES_INTRO}
          items={content?.deliverables}
        />
      </div>

      <aside className="space-y-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
        <div className="relative aspect-4/3 overflow-hidden rounded-card bg-bg-muted shadow-sm">
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) calc(100vw - 2rem), 380px"
            quality={74}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-inverse/20 via-transparent to-transparent" />
        </div>

        <div className="border-l border-br-accent-soft pl-5">
          <p className="typo-kicker">Категория</p>
          <Link
            href={`/uslugi/${category.slug}`}
            className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-tx-primary transition hover:text-accent-strong"
          >
            {category.title}
            <MdArrowRightAlt className="text-xl" />
          </Link>
          <p className="mt-3 text-sm leading-6 text-tx-muted">
            Вижте и останалите услуги в тази категория, ако случаят Ви включва
            допълнителни измервания или документи.
          </p>
        </div>

        {relatedServices.length ? (
          <div className="border-t border-br-light pt-6">
            <p className="typo-kicker">Свързани услуги</p>
            <div className="mt-3 divide-y divide-br-light">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={getServiceHref(category.slug, related)}
                  className="group flex items-center justify-between gap-4 py-3 text-sm font-semibold text-tx-secondary transition hover:text-accent-strong"
                >
                  <span>{related.shortTitle ?? related.title}</span>
                  <MdArrowRightAlt className="shrink-0 text-lg transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </aside>
    </article>
  );
}

function EditorialListSection({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items?: string[];
}) {
  if (!items?.length) return null;

  return (
    <section className="mt-14 border-t border-br-light pt-9">
      <h2 className="text-2xl font-semibold leading-tight text-tx-primary">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-tx-secondary">{intro}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item, index) => (
          <li
            key={`${title}-item-${index}`}
            className="flex gap-3 text-base leading-7 text-tx-secondary"
          >
            <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EditorialTextSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs?: string[];
}) {
  if (!paragraphs?.length) return null;

  return (
    <section className="mt-14 border-t border-br-light pt-9">
      <h2 className="text-2xl font-semibold leading-tight text-tx-primary">{title}</h2>
      <div className="mt-5 max-w-3xl space-y-5 text-base leading-7 text-tx-secondary">
        {paragraphs.map((paragraph, index) => (
          <p key={`${title}-paragraph-${index}`}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ProcessSection({ items, intro }: { items?: string[]; intro: string }) {
  if (!items?.length) return null;

  return (
    <section className="mt-14 border-t border-br-light pt-9">
      <h2 className="text-2xl font-semibold leading-tight text-tx-primary">
        Как протича работата
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-tx-secondary">{intro}</p>
      <ol className="mt-7 space-y-6 border-l border-br-accent-soft pl-5">
        {items.map((step, index) => (
          <li key={`process-step-${index}`} className="relative">
            <span className="absolute -left-[2.05rem] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-bg-page text-xs font-semibold tabular-nums text-accent-strong ring-1 ring-br-accent-soft">
              {index + 1}
            </span>
            <p className="text-base leading-7 text-tx-secondary">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
