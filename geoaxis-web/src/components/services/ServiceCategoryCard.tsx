import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import type { ServiceCategory } from "@/config/services/categories";
import { getCategoryIcon } from "@/config/services/icons";
import { IconBadge } from "@/components/ui/IconBadge";

const PREVIEW_COUNT = 3;

export function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  const preview = category.services.slice(0, PREVIEW_COUNT);
  const remaining = category.services.length - preview.length;

  return (
    <Link
      href={`/uslugi/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-br-light bg-bg-page shadow-card transition duration-300 hover:-translate-y-1 hover:border-br-default hover:shadow-lift"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-bg-subtle">
        <Image
          src={category.thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1280px) 45vw, 400px"
          quality={70}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <IconBadge icon={getCategoryIcon(category.slug)} size="lg" className="relative z-10 -mt-12 mb-4 ring-4! ring-bg-page!" />
        <h3 className="typo-h3">{category.title}</h3>
        <p className="typo-small mt-2 text-tx-muted">{category.description}</p>

        <ul className="typo-small mt-5 grid gap-2 text-tx-secondary">
          {preview.map((service) => (
            <li key={service.slug} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {service.shortTitle ?? service.title}
            </li>
          ))}
          {remaining > 0 ? <li className="pl-4 text-tx-muted">+ още {remaining}</li> : null}
        </ul>

        <span className="typo-small mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-accent-text">
          Вижте услугите
          <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
