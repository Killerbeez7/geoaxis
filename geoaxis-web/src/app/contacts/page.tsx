import { Suspense } from "react";
import { LuMapPin } from "react-icons/lu";

import { pageSeo } from "@/config/seo";
import { contacts } from "@/config/content/contacts";
import { createSeo } from "@/lib/seo-builder";
import { CallbackRequest } from "@/components/forms/CallbackRequest";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ContactChannels } from "@/components/ui/ContactChannels";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Text";
import { TrustBar } from "@/components/ui/TrustBar";
import { PAGE_BACKDROPS } from "@/config/services/backdrops";

export const metadata = createSeo(pageSeo.contacts);

export default function ContactsPage() {
  const [street, city] = contacts.address.split("||").map((part) => part.trim());

  return (
    <>
      <PageHero
        backdrop={PAGE_BACKDROPS.contacts}
        size="compact"
        breadcrumbs={[{ label: "Контакти", href: "/contacts" }]}
        title="Поискайте оферта"
        description="Опишете накратко имота и задачата – ще се свържем с вас с насоки, срок и цена."
      />

      <Section spacing="compact" className="md:pt-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <Suspense fallback={<div className="min-h-[28rem]" />}>
              <QuoteForm />
            </Suspense>
          </div>

          {/* Direct channels as a plain list, the call-back in its own soft box; stays in view on wide screens */}
          <aside className="grid content-start gap-8 md:grid-cols-2 md:items-start lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:grid-cols-1 lg:self-start">
            <div>
              <Heading as="h2" size="h4">
                Предпочитате директен контакт?
              </Heading>
              <ContactChannels className="-mx-3 mt-3" />
            </div>

            <div className="rounded-3xl border border-br-light bg-bg-subtle p-6">
              <Heading as="h2" size="h4">
                Ние да ви се обадим?
              </Heading>
              <Text size="small" className="mb-4 mt-1.5">
                Оставете само телефон – ще ви се обадим възможно най-скоро.
              </Text>
              <CallbackRequest />
            </div>

            {contacts.showAddress ? (
              <a
                href={contacts.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-3xl border border-br-light bg-bg-page p-6 transition-colors hover:border-br-accent"
              >
                <LuMapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-text" />
                <span>
                  <span className="typo-h5 block">{street}</span>
                  <span className="typo-small tone-muted block">{city}</span>
                  <span className="typo-small mt-2 block font-semibold text-accent-text group-hover:underline">
                    Отворете в Google Maps
                  </span>
                </span>
              </a>
            ) : null}
          </aside>
        </div>

        <TrustBar variant="row" className="mt-14 border-t border-br-light pt-10" />
      </Section>
    </>
  );
}
