import { contacts } from "@/config/content/contacts";
import { Button } from "./Button";
import { ContactChannels } from "./ContactChannels";
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
    <Section
      tone="paper"
      pattern
      className="[--pattern-color:var(--brand-ochre-600)] [--pattern-opacity:0.16]"
      aria-labelledby="cta-band-title"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-20">
        <div>
          <Eyebrow>Следваща стъпка</Eyebrow>
          <Heading id="cta-band-title" className="mt-3 max-w-2xl">
            {title}
          </Heading>
          <Text size="lead" className="mt-4 max-w-2xl">
            {text}
          </Text>
          {/* The phone number lives in the contact list beside this, so only the quote button here */}
          <div className="mt-8">
            <Button href={quoteHref} size="lg" arrow track="quote_click" className="w-full sm:w-auto">
              Поискайте оферта
            </Button>
          </div>
          <Text size="small" tone="muted" className="mt-5">
            {contacts.responseTime}.
          </Text>
        </div>

        <div className="rounded-2xl border border-br-light bg-bg-page p-3 shadow-card">
          <ContactChannels />
        </div>
      </div>
    </Section>
  );
}
