import Link from "next/link";
import clsx from "clsx";

import { IoIosMore } from "react-icons/io";
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
import type { ServicesContent } from "@/config/site-content";

const ICON_BY_SLUG: Record<string, IconType> = {
  "geodezichesko-zasnemane": FaCompassDrafting,
  trasirane: FaRulerCombined,
  kadastar: FaMapLocationDot,
  "vertikalna-planirovka": FaLayerGroup,
  proektirane: FaPenRuler,
  konsultacia: FaClipboardCheck,
  "dokumenti-proceduri": FaCircleNodes,
};

type ServiceItem = ServicesContent["items"][number];

export const ServiceCard = ({ item }: { item: ServiceItem }) => {
  const Icon = ICON_BY_SLUG[item.slug] ?? FaCompassDrafting;
  const title = item.cardTitle ?? item.title;
  const meta = item.cardMeta ?? "";

  return (
    <Link
      href={`/services/${item.slug}`}
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden",
        "rounded-[--radius-card] bg-white",
        "border border-black/10",
        "p-7",
        "shadow-[0_18px_55px_-48px_rgba(0,0,0,0.30)]",
        "transition duration-200",
        "hover:-translate-y-[2px] hover:shadow-[0_28px_80px_-58px_rgba(0,0,0,0.40)]",
        "hover:border-accent/25 hover:ring-2 hover:ring-accent/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
      )}
    >
      {/* top accent on hover*/}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent/70 opacity-0 transition group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/0 via-black/0 to-black/3 opacity-0 transition group-hover:opacity-100" />

      {/* Icon Badge */}
      <div
        className={clsx(
          "inline-flex h-11 w-11 items-center justify-center rounded-xl",
          "bg-bg-muted ring-1 ring-black/5",
          "text-(--color-bg-nav)",
          "transition",
          "group-hover:bg-accent/10 group-hover:text-accent group-hover:ring-accent/20"
        )}
      >
        <Icon className="h-[20px] w-[20px]" />
      </div>

      <h3 className="mt-4 text-[16px] sm:text-[17px] font-semibold leading-snug text-tx-primary">
        {title}
      </h3>

      {meta && (
        <p className="mt-1.5 text-[13px] sm:text-[14px] text-tx-muted leading-relaxed">
          {meta}
        </p>
      )}

      {/* CTA */}
      <div className="mt-auto pt-5">
        {/* Mobile: always visible */}
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-tx-muted md:hidden">
          Детайли <FaAngleRight className="text-xs" />
        </span>

        {/* Desktop: hover only */}
        <span
          className={clsx(
            "hidden sm:inline-flex items-center gap-2 text-sm font-semibold",
            "text-tx-muted",
            "opacity-0 translate-y-1",
            "transition duration-200",
            "group-hover:opacity-100 group-hover:translate-y-0",
            "group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
          )}
        >
          Детайли{" "}
          <FaAngleRight className="text-xs transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

export const MoreCard = ({ extraCount }: { extraCount: number }) => {
  const more = Math.max(1, extraCount);

  return (
    <Link
      href="/services"
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden",
        "rounded-[--radius-card] p-7",
        "bg-bg-nav text-white",
        "border border-white/10",
        "shadow-[0_26px_70px_-55px_rgba(0,0,0,0.50)]",
        "transition duration-200 hover:-translate-y-[2px]",
        "hover:border-accent/25 hover:ring-2 hover:ring-accent/15",
        "hover:shadow-[0_34px_92px_-70px_rgba(0,0,0,0.70)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25",
        "lg:col-start-4 lg:row-start-2"
      )}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent/70 opacity-0 transition group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/0 via-white/0 to-white/6" />
      <span className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/18 blur-3xl opacity-60" />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={clsx(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl",
            "bg-white/8 ring-1 ring-white/15",
            "text-white/90 transition",
            "group-hover:bg-accent/15 group-hover:ring-accent/25"
          )}
        >
          <IoIosMore className="h-[20px] w-[20px]" />
        </div>
      </div>

      <h3 className="mt-5 text-[17px] sm:text-[18px] font-semibold tracking-tight text-white">
        Още услуги
      </h3>

      <p className="mt-1.5 text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
        +{more} допълнителни услуги
      </p>

      <div className="mt-auto pt-6">
        {/* Mobile: always visible */}
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 sm:hidden">
          Към услуги <FaAngleRight className="text-xs" />
        </span>

        {/* Desktop: always visible */}
        <span
          className={clsx(
            "hidden sm:inline-flex items-center gap-2",
            "rounded-full px-3 py-1.5",
            "border border-white/15 bg-white/8",
            "text-[13px] font-semibold text-white/85",
            "shadow-[0_10px_28px_-22px_rgba(0,0,0,0.45)]",
            "transition duration-200",
            "group-hover:border-accent/25 group-hover:bg-accent/16",
            "group-hover:text-white"
          )}
        >
          Към услуги
          <FaAngleRight className="text-xs transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};
