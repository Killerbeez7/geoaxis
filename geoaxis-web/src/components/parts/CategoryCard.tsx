import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

import {
  FaCompassDrafting,
  FaRulerCombined,
  FaMapLocationDot,
  FaLayerGroup,
  FaPenRuler,
  FaClipboardCheck,
  FaCircleNodes,
  FaAngleRight,
} from "react-icons/fa6";

import type { IconType } from "react-icons";
import type { ServiceCategory } from "@/config/services/categories";

const ICON_BY_SLUG: Record<string, IconType> = {
  zasnemane: FaCompassDrafting,
  trasirane: FaRulerCombined,
  kadastar: FaMapLocationDot,
  gradoustroistvo: FaLayerGroup,
  proektirane: FaPenRuler,
  konsultacia: FaClipboardCheck,
  "dokumenti-proceduri": FaCircleNodes,
};

type CategoryCardProps = {
  category: ServiceCategory;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = ICON_BY_SLUG[category.slug] ?? FaCompassDrafting;
  const href = `/uslugi/${category.slug}`;
  const title = category.shortTitle ?? category.title;
  const imageSrc = category.thumbnail ?? "/images/utility/placeholder.png";

  return (
    <Link
      href={href}
      aria-label={`Детайли за ${title}`}
      className={clsx(
        "group relative flex flex-col justify-end overflow-hidden rounded-4xl bg-black",
        "h-[260px] md:h-[300px]",
        "border border-br-default shadow-lg",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
      )}
    >
      <Image
        src={imageSrc}
        alt={`${title} - ${category.description}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover opacity-95 transition-all duration-500 group-hover:scale-106 group-hover:opacity-50"
      />

      <div
        className={clsx(
          "absolute inset-0 rounded-3xl bg-linear-to-t",
          "from-black/90 via-black/40 to-black/0",
          "md:from-black/90 md:via-black/28 md:to-black/0"
        )}
      />

      <div className="relative text-white p-6">
        {category.meta && (
          <p className="mb-2 hidden text-[10px] font-bold uppercase tracking-[0.18em] text-accent md:inline-block">
            {category.meta}
          </p>
        )}

        <div className="flex items-center gap-3">
          {/* <Icon className="h-4.5 w-4.5 text-white/70 sm:h-5 sm:w-5" /> */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
            <Icon className="h-4 w-4 text-white/80" />
          </div>
          <h3 className="text-[17px] font-bold leading-[1.08] text-tx-inverse/95 sm:text-xl">
            {title}
          </h3>
        </div>

        <div className="max-h-24 overflow-hidden transition-all duration-500 md:max-h-0 md:group-hover:max-h-24">
          <p className="mt-2 text-[13px] leading-relaxed text-tx-inverse/85 line-clamp-3 sm:mt-3 sm:text-sm">
            {category.description}
          </p>
        </div>

        <div className="md:hidden mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent md:text-tx-inverse/50 sm:mt-4">
          Детайли
          <FaAngleRight className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
};
