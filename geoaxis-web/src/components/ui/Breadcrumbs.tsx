import Link from "next/link";
import clsx from "clsx";
import { LuChevronRight } from "react-icons/lu";
import { SITE_URL } from "@/config/site";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href: string };

// Visible trail plus BreadcrumbList structured data. "Начало" is added automatically.
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ label: "Начало", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href === "/" ? "/" : crumb.href}`,
    })),
  };

  return (
    <nav aria-label="Навигационна пътека" className={className}>
      <JsonLd data={schema} />
      <ol className="typo-small flex flex-wrap items-center gap-x-1.5 gap-y-1 text-tx-muted">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="line-clamp-1 font-medium text-tx-primary">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className={clsx("transition-colors hover:text-accent-text")}>
                    {crumb.label}
                  </Link>
                  <LuChevronRight aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
