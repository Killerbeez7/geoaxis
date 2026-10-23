import { LuPhone } from "react-icons/lu";
import { contactLinks, contacts } from "@/config/content/contacts";
import { Button } from "./Button";
import { ContactChannels } from "./ContactChannels";
import { Section } from "./Section";

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
    <Section tone="deep" pattern aria-labelledby="cta-band-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-20">
        <div>
          <p className="typo-eyebrow text-accent-on-dark">Следваща стъпка</p>
          <h2 id="cta-band-title" className="typo-h2 mt-4 max-w-2xl">
            {title}
          </h2>
          <p className="typo-lead mt-5 max-w-2xl">{text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={quoteHref} size="lg" arrow track="quote_click">
              Поискайте оферта
            </Button>
            <Button
              href={contactLinks.tel}
              size="lg"
              variant="outline-light"
              icon={<LuPhone className="h-4 w-4" />}
              track="call_click"
            >
              {contacts.phone}
            </Button>
          </div>
          <p className="typo-small mt-5 text-tx-inverse-muted">{contacts.responseTime}.</p>
        </div>

        <div className="rounded-2xl border border-br-on-dark bg-white/4 p-3">
          <ContactChannels dark />
        </div>
      </div>
    </Section>
  );
}
