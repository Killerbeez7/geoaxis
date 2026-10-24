import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import type { ServiceCategory } from "@/config/services/categories";
import { getCategoryIcon } from "@/config/services/icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { Heading, Text } from "@/components/ui/Text";

// Compact photo card for the homepage: icon, title and one line over the photo.
export function ServiceTile({ category }: { category: ServiceCategory }) {
  return (
    <Link
      href={`/uslugi/${category.slug}`}
      className="group on-dark relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl bg-bg-deep shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift md:h-72"
    >
      <Image
        src={category.thumbnail}
        alt=""
        fill
        sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1280px) 45vw, 400px"
        quality={70}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-bg-deep via-bg-deep/55 to-bg-deep/5" />

      <div className="relative p-6">
        <div className="flex items-center gap-3">
          <IconBadge icon={getCategoryIcon(category.slug)} dark />
          <Heading as="h3" size="h4">
            {category.shortTitle ?? category.title}
          </Heading>
        </div>
        <Text size="small" className="mt-3 line-clamp-2">
          {category.description}
        </Text>
        <span className="typo-small tone-accent mt-4 inline-flex items-center gap-1.5 font-semibold">
          Вижте услугите
          <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
