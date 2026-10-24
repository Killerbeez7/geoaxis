import { PRICE_FACTORS, PRICE_NOTE, PRICE_NOTE_WITH_PRICES } from "@/config/content/pricing";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { Heading, Text } from "@/components/ui/Text";

type Props = {
  serviceSlug: string;
  hasPrices?: boolean;
  className?: string;
};

export function PriceFactors({ serviceSlug, hasPrices = false, className }: Props) {
  return (
    <section aria-labelledby="price-factors-title" className={className}>
      <Heading id="price-factors-title" size="h3">
        Какво влияе на цената
      </Heading>
      <Text className="mt-3 max-w-2xl">Всеки имот е различен, затова цената зависи от няколко фактора:</Text>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {PRICE_FACTORS.map(({ icon, title, text }) => (
          <li key={title} className="flex items-start gap-3.5 rounded-xl border border-br-light bg-bg-subtle p-4">
            <IconBadge icon={icon} />
            <div>
              <Heading as="p" size="h5">
                {title}
              </Heading>
              <Text size="small" className="mt-0.5">
                {text}
              </Text>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-accent-soft p-5 sm:flex-row sm:items-center sm:justify-between">
        <Text size="small">{hasPrices ? PRICE_NOTE_WITH_PRICES : PRICE_NOTE}</Text>
        <Button href={`/contacts?service=${serviceSlug}`} variant="dark" arrow track="quote_click" className="shrink-0">
          Поискайте оферта
        </Button>
      </div>
    </section>
  );
}
