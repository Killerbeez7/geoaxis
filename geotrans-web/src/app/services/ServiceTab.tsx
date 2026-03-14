import Link from "next/link";
import clsx from "clsx";
import { serviceCategories } from "./config/service-categories";

export default function ServiceTabs({
  activeCategorySlug,
}: {
  activeCategorySlug: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {serviceCategories.map((category) => {
        const href = `/services/${category.slug}/${category.items[0].slug}`;
        const isActive = category.slug === activeCategorySlug;

        return (
          <Link
            key={category.slug}
            href={href}
            className={clsx(
              "rounded-full px-5 py-2.5 text-sm font-medium transition",
              isActive
                ? "bg-accent text-white shadow-sm"
                : "border border-br-default bg-bg-section text-tx-primary hover:border-accent/30 hover:text-accent"
            )}
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
}
