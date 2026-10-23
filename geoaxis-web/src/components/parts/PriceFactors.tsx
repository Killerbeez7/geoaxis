import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import { PRICE_FACTORS, PRICE_NOTE, PRICE_NOTE_WITH_PRICES } from "@/config/content/pricing";

export function PriceFactors({
  serviceSlug,
  hasPrices = false,
  className,
}: {
  serviceSlug: string;
  hasPrices?: boolean;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-semibold leading-tight text-tx-primary">Какво влияе на цената</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-tx-secondary">
        Всеки имот е различен, затова цената зависи от няколко фактора:
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {PRICE_FACTORS.map((factor) => (
          <li
            key={factor}
            className="flex gap-3 rounded-xl border border-br-light bg-bg-section px-4 py-3 text-[15px] leading-6 text-tx-secondary"
          >
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {factor}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-6 text-tx-muted">
        {hasPrices ? PRICE_NOTE_WITH_PRICES : PRICE_NOTE}
      </p>
      <Link
        href={`/contacts?service=${serviceSlug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-text"
      >
        Поискайте оферта за вашия имот
        <MdArrowRightAlt aria-hidden="true" className="text-lg" />
      </Link>
    </section>
  );
}
