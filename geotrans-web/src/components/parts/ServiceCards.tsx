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

  return (
    <Link
      href={`/services/${item.slug}`}
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden",
        "rounded-[--radius-card] bg-white",
        "border border-black/10",
        // slightly more consistent air
        "p-5 sm:p-6 lg:p-7",
        "shadow-[0_18px_55px_-48px_rgba(0,0,0,0.30)]",
        "transition duration-200",
        "hover:-translate-y-[2px] hover:shadow-[0_28px_80px_-58px_rgba(0,0,0,0.40)]",
        "hover:border-accent/25 hover:ring-2 hover:ring-accent/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
      )}
    >
      {/* top accent on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent/70 opacity-0 transition group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/0 via-black/0 to-black/3 opacity-0 transition group-hover:opacity-100" />

      {/* Mobile: subtle right rail */}
      <span
        aria-hidden
        className={clsx(
          "pointer-events-none absolute right-0 top-0 h-full w-10",
          "bg-linear-to-l from-black/2 to-transparent",
          "min-[678px]:hidden"
        )}
      />

      {/* Mobile: Details arrow (avoid overlap via content padding) */}
      <span
        aria-hidden
        className={clsx(
          "absolute right-4 top-1/2 -translate-y-1/2",
          "text-(--color-bg-nav)/25",
          "min-[678px]:hidden"
        )}
      >
        <FaAngleRight className="text-sm" />
      </span>

      {/* Content wrapper: add right padding ONLY on mobile so text never hits arrow */}
      <div className="min-[678px]:pr-0 pr-12">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <div
            className={clsx(
              "shrink-0 inline-flex items-center justify-center rounded-xl",
              "h-10 w-10 sm:h-11 sm:w-11",
              "bg-bg-muted ring-1 ring-black/5",
              "text-(--color-bg-nav)",
              "transition",
              "group-hover:bg-accent/10 group-hover:text-accent group-hover:ring-accent/20"
            )}
          >
            <Icon className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
          </div>

          <div className="min-w-0">
            <h3 className="text-[15px] sm:text-[17px] font-semibold leading-snug text-tx-primary">
              {item.cardTitle ?? item.title}
            </h3>

            {!!item.cardMeta && (
              <p className="mt-0.5 text-[13px] sm:text-[14px] font-semibold text-tx-muted leading-relaxed line-clamp-1">
                {item.cardMeta}
              </p>
            )}
          </div>
        </div>

        {/* Divider: desktop only (mobile creates awkwardness with arrow) */}
        <div className="hidden min-[678px]:block">
          <div className="mt-4 h-px w-full bg-br-light" />
        </div>

        {/* Description */}
        {!!item.description && (
          <p
            className={clsx(
              // slightly more controlled vertical rhythm
              "mt-3 min-[678px]:mt-4",
              "text-[13px] sm:text-[14px] leading-relaxed text-tx-secondary/80",
              "line-clamp-3 sm:line-clamp-3 lg:line-clamp-4"
            )}
          >
            {item.description}
          </p>
        )}
      </div>

      {/* Desktop Details button (visible as in your code) */}
      <div className="mt-auto pt-4 sm:pt-5">
        <span
          className={clsx(
            "hidden min-[678px]:inline-flex items-center gap-2",
            "text-sm font-semibold text-tx-muted",
            "transition duration-200"
          )}
        >
          Детайли <FaAngleRight className="text-xs transition" />
        </span>
      </div>
    </Link>
  );
};

// export const MoreCard = ({ extraCount }: { extraCount: number }) => {
//   const more = Math.max(1, extraCount);

//   return (
//     <Link
//       href="/services"
//       className={clsx(
//         "group relative flex h-full flex-col overflow-hidden",
//         "rounded-[--radius-card]",
//         "p-5 sm:p-6 lg:p-7",
//         "bg-bg-nav text-white",
//         "border border-white/10",
//         "shadow-[0_26px_70px_-55px_rgba(0,0,0,0.50)]",
//         "transition duration-200 hover:-translate-y-[2px]",
//         "hover:border-accent/25 hover:ring-2 hover:ring-accent/15",
//         "hover:shadow-[0_34px_92px_-70px_rgba(0,0,0,0.70)]",
//         "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25"
//       )}
//     >
//       <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent/70 opacity-0 transition group-hover:opacity-100" />
//       <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/0 via-white/0 to-white/6" />
//       <span className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/18 blur-3xl opacity-60" />

//       <div className="relative flex items-start justify-between gap-4">
//         <div
//           className={clsx(
//             "inline-flex items-center justify-center rounded-xl",
//             "h-10 w-10 sm:h-11 sm:w-11",
//             "bg-white/8 ring-1 ring-white/15",
//             "text-white/90 transition",
//             "group-hover:bg-accent/15 group-hover:ring-accent/25"
//           )}
//         >
//           <IoIosMore className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
//         </div>

//         <div className="text-right">
//           <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
//             налични
//           </div>
//           <div className="mt-1 text-sm font-semibold text-white/85">+{more}</div>
//         </div>
//       </div>

//       <h3 className="mt-4 sm:mt-5 text-[16px] sm:text-[18px] font-semibold tracking-tight text-white">
//         Още услуги
//       </h3>

//       <p className="mt-1.5 text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
//         Виж всички услуги и процедури
//       </p>

//       <div className="mt-auto pt-6">
//         {/* Mobile */}
//         <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 min-[678px]:hidden">
//           Към услуги <FaAngleRight className="text-xs" />
//         </span>

//         {/* Desktop */}
//         <span
//           className={clsx(
//             "hidden min-[678px]:inline-flex items-center gap-2",
//             "rounded-full px-3 py-1.5",
//             "border border-white/15 bg-white/8",
//             "text-[13px] font-semibold text-white/85",
//             "shadow-[0_10px_28px_-22px_rgba(0,0,0,0.45)]",
//             "transition duration-200",
//             "group-hover:border-accent/25 group-hover:bg-accent/16",
//             "group-hover:text-white"
//           )}
//         >
//           Към услуги{" "}
//           <FaAngleRight className="text-xs transition group-hover:translate-x-0.5" />
//         </span>
//       </div>
//     </Link>
//   );
// };

export const MoreCard = ({ extraCount }: { extraCount: number }) => {
  const more = Math.max(1, extraCount);

  return (
    <Link
      href="/services"
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden",
        "rounded-[--radius-card]",
        "bg-bg-nav text-white",
        "border border-white/10",
        // mobile: extra right padding so arrow doesn't overlap text
        "py-5 pl-5 pr-12 sm:p-6 lg:p-7",
        "shadow-[0_26px_70px_-55px_rgba(0,0,0,0.50)]",
        "transition duration-200",
        "hover:-translate-y-[2px]",
        "hover:border-accent/30",
        "hover:ring-2 hover:ring-accent/20",
        "hover:shadow-[0_34px_92px_-70px_rgba(0,0,0,0.70)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
      )}
    >
      {/* hover accent */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent/80 opacity-0 transition group-hover:opacity-100" />

      {/* subtle glow */}
      <span className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl opacity-50" />

      {/* subtle depth */}
      <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/0 via-white/0 to-white/6 opacity-0 transition group-hover:opacity-100" />

      {/* mobile right rail */}
      <span
        aria-hidden
        className={clsx(
          "pointer-events-none absolute right-0 top-0 h-full w-10",
          "bg-linear-to-l from-white/10 to-transparent",
          "min-[678px]:hidden"
        )}
      />

      {/* mobile arrow */}
      <span
        aria-hidden
        className={clsx(
          "absolute right-4 top-1/2 -translate-y-1/2",
          "text-white/40",
          "min-[678px]:hidden"
        )}
      >
        <FaAngleRight className="text-sm" />
      </span>

      {/* HEADER */}
      <div className="flex items-start gap-3">
        <div
          className={clsx(
            "shrink-0 inline-flex items-center justify-center rounded-xl",
            "h-10 w-10 sm:h-11 sm:w-11",
            "bg-white/10 ring-1 ring-white/15",
            "text-white",
            "transition",
            "group-hover:bg-accent/20 group-hover:ring-accent/30"
          )}
        >
          <IoIosMore className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
        </div>

        <div className="min-w-0">
          <h3 className="text-[15px] sm:text-[17px] text-tx-inverse font-semibold leading-snug">
            Още услуги
          </h3>

          <p className="mt-0.5 text-[13px] sm:text-[14px] font-semibold text-white/70">
            +{more} налични услуги
          </p>
        </div>
      </div>

      {/* divider (desktop only) */}
      <div className="hidden min-[678px]:block mt-4 h-px w-full bg-white/10" />

      {/* description */}
      <p
        className={clsx(
          "mt-3 min-[678px]:mt-4",
          "text-[13px] sm:text-[14px]",
          "leading-relaxed text-white/75",
          "line-clamp-3 sm:line-clamp-3 lg:line-clamp-4"
        )}
      >
        Разгледайте всички геодезически услуги, процедури и нужни документи на едно място.
      </p>

      {/* CTA */}
      <div className="mt-auto pt-4 sm:pt-5">
        {/* mobile pill */}
        {/* <span
          className={clsx(
            "inline-flex items-center gap-2",
            "rounded-full px-3 py-1.5",
            "border border-white/15 bg-white/10",
            "text-[13px] font-semibold text-white/90",
            "shadow-[0_10px_24px_-22px_rgba(0,0,0,0.28)]",
            "min-[678px]:hidden"
          )}
        >
          Към услуги <FaAngleRight className="text-[11px]" />
        </span> */}

        {/* desktop CTA */}
        <span
          className={clsx(
            "hidden min-[678px]:inline-flex items-center gap-2",
            "text-sm font-semibold text-white/80",
            "mt-5"
          )}
        >
          Към услуги
          <FaAngleRight className="text-xs transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};
