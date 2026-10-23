import { LuBanknote, LuCalendarDays } from "react-icons/lu";
import type { Service } from "@/config/services/categories";

// Starting price and typical timeframe; renders nothing until they are filled in.
export function ServiceFacts({ service, className }: { service: Service; className?: string }) {
  if (!service.priceFrom && !service.duration) return null;

  return (
    <dl className={className ?? "mt-4 flex flex-wrap gap-x-8 gap-y-3"}>
      {service.priceFrom ? (
        <div className="flex items-center gap-2.5">
          <LuBanknote aria-hidden="true" className="h-5 w-5 text-accent-text" />
          <div>
            <dt className="typo-caption text-tx-muted">Цена</dt>
            <dd className="font-semibold text-tx-primary">{service.priceFrom}</dd>
          </div>
        </div>
      ) : null}
      {service.duration ? (
        <div className="flex items-center gap-2.5">
          <LuCalendarDays aria-hidden="true" className="h-5 w-5 text-accent-text" />
          <div>
            <dt className="typo-caption text-tx-muted">Срок</dt>
            <dd className="font-semibold text-tx-primary">{service.duration}</dd>
          </div>
        </div>
      ) : null}
    </dl>
  );
}
