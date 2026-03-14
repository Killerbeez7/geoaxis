import { notFound } from "next/navigation";
import ServiceDetails from "../../ServiceDetails";
import ServiceSidebar from "../../ServiceSidebar";
import ServiceTabs from "../../ServiceTab";
import { getServiceBySlugs, serviceCategories } from "../../config/service-categories";

type PageProps = {
  params: Promise<{
    category: string;
    service: string;
  }>;
};

export function generateStaticParams() {
  return serviceCategories.flatMap((category) =>
    category.items.map((item) => ({
      category: category.slug,
      service: item.slug,
    }))
  );
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { category, service } = await params;

  const data = getServiceBySlugs(category, service);
  if (!data) notFound();

  return (
    <main className="bg-bg-page">
      <section className="border-b border-br-light bg-bg-section pt-28 pb-10 md:pt-36">
        <div className="container-page">
          <p className="typo-kicker">Услуги</p>
          <h1 className="mt-3 typo-h2">{data.category.title}</h1>
          <p className="mt-4 max-w-2xl typo-body text-tx-secondary">
            {data.category.intro}
          </p>

          <ServiceTabs activeCategorySlug={data.category.slug} />
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <ServiceSidebar
            category={data.category}
            activeServiceSlug={data.service.slug}
          />

          <ServiceDetails categoryTitle={data.category.title} service={data.service} />
        </div>
      </section>
    </main>
  );
}
