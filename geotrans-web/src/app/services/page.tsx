import Link from "next/link";
import { serviceCategories } from "./config/service-categories";

export default function ServicesPage() {
  return (
    <main className="bg-bg-page">
      <section className="border-b border-br-light bg-bg-section pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="container-page max-w-3xl text-center">
          <p className="typo-kicker">Услуги</p>
          <h1 className="mt-3 typo-h2">Геодезически услуги</h1>
          <p className="mt-5 typo-body text-tx-secondary">
            Разгледайте основните категории услуги и изберете най-подходящата според вашия
            обект, имот или проект.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceCategories.map((category) => {
              const firstItem = category.items[0];
              const href = `/services/${category.slug}/${firstItem.slug}`;

              return (
                <Link
                  key={category.slug}
                  href={href}
                  className="group rounded-[--radius-card] border border-br-light bg-bg-section p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                    Категория
                  </div>

                  <h2 className="typo-h3 transition-colors group-hover:text-accent">
                    {category.title}
                  </h2>

                  <p className="mt-4 typo-body text-tx-secondary">{category.intro}</p>

                  <div className="mt-6 text-sm font-medium text-accent">
                    Разгледайте услугите →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
