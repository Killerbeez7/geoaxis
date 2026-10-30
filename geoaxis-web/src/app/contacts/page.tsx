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

export const metadata = createSeo(pageSeo.contacts);

export default function ContactsPage() {
  const [street, city] = contacts.address.split("||").map((part) => part.trim());

  return (
    <>
      <PageHero
        backdrop="/images/sections/services-hero-abstract-01.webp"
        size="compact"
        breadcrumbs={[{ label: "Контакти", href: "/contacts" }]}
        title="Поискайте оферта"
        description="Опишете накратко имота и задачата. Отговаряме до един работен ден с насоки, срок и цена."
      />

      <Section spacing="compact" className="md:pt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-12">
          <div className="min-w-0">
            <Suspense fallback={<div className="min-h-[36rem] rounded-3xl border border-br-light bg-bg-subtle" />}>
              <QuoteForm />
            </Suspense>
          </div>

          <aside className="grid content-start gap-6">
            {/* Phones already have call / Viber in the bottom bar */}
            <div className="hidden rounded-3xl border border-br-light bg-bg-page p-3 shadow-card md:block">
              <Heading as="p" size="h4" className="px-3 pt-3">
                Предпочитате директен контакт?
              </Heading>
              <ContactChannels className="mt-2" />
            </div>

            <div className="rounded-3xl border border-br-light bg-bg-subtle p-6">
              <Heading as="p" size="h4">
                Ние да ви се обадим?
              </Heading>
              <Text size="small" className="mb-4 mt-1.5">
                Оставете само телефон – ще ви позвъним в рамките на деня.
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

        <TrustBar className="mt-14" />
      </Section>
    </>
  );
}
