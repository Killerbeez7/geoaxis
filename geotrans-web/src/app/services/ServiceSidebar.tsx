import Link from "next/link";
import clsx from "clsx";
import type { ServiceCategory } from "./config/service-categories";

export default function ServiceSidebar({
  category,
  activeServiceSlug,
}: {
  category: ServiceCategory;
  activeServiceSlug: string;
}) {
  return (
    <aside className="self-start lg:sticky lg:top-28">
      <div className="rounded-[--radius-card] border border-br-light bg-bg-section p-3 shadow-sm">
        <div className="mb-3 px-3 pt-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          {category.title}
        </div>

        <nav className="space-y-2">
          {category.items.map((item) => {
            const href = `/services/${category.slug}/${item.slug}`;
            const isActive = item.slug === activeServiceSlug;

            return (
              <Link
                key={item.slug}
                href={href}
                className={clsx(
                  "block rounded-2xl px-4 py-3 text-sm transition",
                  isActive
                    ? "bg-bg-brand-soft font-semibold text-tx-primary"
                    : "text-tx-secondary hover:bg-bg-muted hover:text-tx-primary"
                )}
              >
                {item.shortTitle}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
