import { PRICE_FACTORS, PRICE_NOTE, PRICE_NOTE_WITH_PRICES } from "@/config/content/pricing";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";

type Props = {
  serviceSlug: string;
  hasPrices?: boolean;
  className?: string;
};

export function PriceFactors({ serviceSlug, hasPrices = false, className }: Props) {
  return (
    <section aria-labelledby="price-factors-title" className={className}>
      <h2 id="price-factors-title" className="typo-h3">
        Какво влияе на цената
      </h2>
      <p className="mt-3 max-w-2xl">Всеки имот е различен, затова цената зависи от няколко фактора:</p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {PRICE_FACTORS.map(({ icon, title, text }) => (
          <li key={title} className="flex items-start gap-3.5 rounded-xl border border-br-light bg-bg-subtle p-4">
            <IconBadge icon={icon} />
            <div>
              <p className="font-semibold text-tx-primary">{title}</p>
              <p className="typo-small text-tx-muted">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-accent-soft p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="typo-small text-tx-secondary">{hasPrices ? PRICE_NOTE_WITH_PRICES : PRICE_NOTE}</p>
        <Button href={`/contacts?service=${serviceSlug}`} variant="dark" arrow track="quote_click" className="shrink-0">
          Поискайте оферта
        </Button>
      </div>
    </section>
  );
}
