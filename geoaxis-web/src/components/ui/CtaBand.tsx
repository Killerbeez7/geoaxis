import { contacts } from "@/config/content/contacts";
import { Button } from "./Button";
import { Section } from "./Section";
import { Eyebrow, Heading, Text } from "./Text";

type Props = {
  /** Category slug used to pre-select the service in the quote form */
  service?: string;
  title?: string;
  text?: string;
};

// Closing call to action used at the end of every page.
export function CtaBand({
  service,
  title = "Разкажете ни за вашия имот",
  text = "Изпратете кратко описание или се обадете. Ще ви кажем каква услуга е нужна, какви документи да подготвите и колко време отнема.",
}: Props) {
  const quoteHref = service ? `/contacts?service=${service}` : "/contacts";

  return (
    <Section tone="inverse" pattern="cta" aria-labelledby="cta-band-title">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Eyebrow>Следваща стъпка</Eyebrow>
        <Heading id="cta-band-title" className="mt-3">
          {title}
        </Heading>
        <Text size="lead" className="mt-4">
          {text}
        </Text>
        <Button href={quoteHref} size="lg" arrow track="quote_click" className="mt-8 w-full sm:w-auto">
          Поискайте оферта
        </Button>
        <Text size="small" tone="muted" className="mt-5">
          {contacts.responseTime}.
        </Text>
      </div>
    </Section>
  );
}
