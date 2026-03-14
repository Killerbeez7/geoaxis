import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
//content
import { siteContent } from "@/config/site-content";
import { getServiceBySlug, getServiceSlugs } from "@/utils/selectors";
//meta data
import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import { getServiceSchema } from "@/utils/structured-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { title: "Услугата не е намерена" };

  const brandName = siteContent.brand.name;

  return {
    title: `${service.title} в София | ${brandName}`,
    description: `${service.title} в София и Софийска област. Професионални геодезически услуги с ясни срокове и надеждна документация.`,
    openGraph: {
      title: `${service.title} | ${brandName}`,
      description: service.description,
      images: [service.ogImage ?? service.thumbnail],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();

  return (
    <main className="relative min-h-screen bg-(--bg-page) pt-28 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceSchema(SITE_URL, service)),
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="shrink-0 text-6xl text-(--color-accent bg-accent/10 p-5 rounded-2xl">
            {service.icon ?? "📐"}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-(--text-primary)">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-(--text-secondary)">{service.description}</p>
          </div>
        </div>

        {/* Service Details */}
        <div className="mt-16 grid gap-10 lg:gap-12">
          <DetailSection
            title="Кога е необходимо?"
            items={service.neededWhen}
            icon={<FaCheckCircle className="text-(--color-success)" />}
          />
          <DetailSection
            title="Какво е необходимо?"
            items={service.requiredDocs}
            icon={<FaArrowRight className="text-(--color-accent)" />}
          />
          <DetailSection
            title="Какво получавате?"
            items={service.deliverables}
            icon={<FaCheckCircle className="text-(--color-success)" />}
          />
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-linear-to-br from-(--color-nav) to-black p-10 text-white shadow-2xl">
          <h2 className="text-3xl font-bold">Искате оферта за {service.title}?</h2>
          <div className="mt-8 flex gap-4">
            <Link
              href="/contacts"
              className="rounded-xl bg-(--color-btn-primary) px-8 py-4 font-semibold hover:scale-105 transition-all"
            >
              Изпратете запитване
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailSection({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-(--bg-surface) p-8 shadow-lg border border-(--color-border-light)">
      <div className="flex items-center gap-4">
        {icon}
        <h2 className="text-2xl font-bold text-(--text-primary)">{title}</h2>
      </div>

      <ul className="mt-6 space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4 text-(--text-secondary)">
            <span className="text-(--color-success)">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
