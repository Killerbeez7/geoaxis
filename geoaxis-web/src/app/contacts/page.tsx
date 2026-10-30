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
        description="Опишете накратко имота и задачата. Отговаряме до един работен ден с насоки, срок и цена."
      />

      {/* Open layout: no cards, sections separated by space and one thin line */}
      <Section spacing="compact" className="md:pt-14">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <div className="min-w-0">
            <Suspense fallback={<div className="min-h-[36rem]" />}>
              <QuoteForm />
            </Suspense>
          </div>

          <aside className="grid content-start gap-10 border-t border-br-light pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            {/* Phones already have call / Viber in the bottom bar */}
            <div className="hidden md:block">
              <Heading as="p" size="h5">
                Директен контакт
              </Heading>
              <ContactChannels className="-mx-3 mt-3" />
            </div>

            <div>
              <Heading as="p" size="h5">
                Ние да ви се обадим?
              </Heading>
              <Text size="small" className="mb-4 mt-1.5">
                Оставете само телефон – ще ви позвъним в рамките на деня.
              </Text>
              <CallbackRequest />
            </div>

            {contacts.showAddress ? (
              <a href={contacts.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
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
      </Section>
    </>
  );
}
