import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { serviceCategories } from "@/config/services/categories";
import { getCategoryIcon } from "@/config/services/icons";
import { IconBadge } from "@/components/ui/IconBadge";

// Compact list of the six service areas, used next to the services page title.
export function CategoryIndex({ className }: { className?: string }) {
  return (
    <nav aria-label="Направления" className={className}>
      <ul className="grid gap-1 rounded-3xl border border-br-light bg-bg-page p-3 shadow-card">
        {serviceCategories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/uslugi/${category.slug}`}
              className="group flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-bg-subtle"
            >
              <IconBadge icon={getCategoryIcon(category.slug)} />
              <span className="min-w-0 flex-1">
                <span className="typo-h5 block">{category.shortTitle ?? category.title}</span>
                <span className="typo-small tone-muted block">{category.services.length} услуги</span>
              </span>
              <LuArrowRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-tx-muted transition group-hover:translate-x-0.5 group-hover:text-accent-text"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
