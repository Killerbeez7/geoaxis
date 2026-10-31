import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import type { ServiceCategory } from "@/config/services/categories";
import { getCategoryIcon } from "@/config/services/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { Heading, Text } from "@/components/ui/Text";

const PREVIEW_COUNT = 3;

// Rows (photo, title + description, optional services, link) line up across a grid row via subgrid.
export function ServiceCategoryCard({ category, showServices = true }: { category: ServiceCategory; showServices?: boolean }) {
  const preview = category.services.slice(0, PREVIEW_COUNT);
  const remaining = category.services.length - preview.length;

  return (
    <Link
      href={`/uslugi/${category.slug}`}
      className={`group grid grid-rows-subgrid gap-0 ${showServices ? "row-span-4" : "row-span-3"} overflow-hidden rounded-2xl border border-br-light bg-bg-page shadow-card transition duration-300 hover:-translate-y-1 hover:border-br-default hover:shadow-lift`}
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

      <div className="relative z-10 px-6">
        <IconBadge icon={getCategoryIcon(category.slug)} size="lg" className="-mt-6 ring-4! ring-bg-page!" />
        <Heading as="h3" className="mt-4">
          {category.title}
        </Heading>
        <Text className="mt-2">{category.description}</Text>
      </div>

      {showServices ? (
        <ul className="typo-small mt-5 grid content-start gap-2 px-6">
          {preview.map((service) => (
            <li key={service.slug} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="mt-[0.5lh] h-1.5 w-1.5 shrink-0 -translate-y-1/2 rounded-full bg-accent" />
              {service.shortTitle ?? service.title}
            </li>
          ))}
          {remaining > 0 ? <li className="tone-muted pl-4">+ още {remaining}</li> : null}
        </ul>
      ) : null}

      <span className="typo-small inline-flex items-center gap-1.5 px-6 pb-6 pt-6 font-semibold text-accent-text">
        Вижте услугите
        <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
