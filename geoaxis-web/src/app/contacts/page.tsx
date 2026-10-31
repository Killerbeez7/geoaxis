import { Suspense } from "react";
import { LuChevronDown, LuMapPin, LuPhoneIncoming } from "react-icons/lu";

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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-12">
          <div className="min-w-0">
            <Suspense fallback={<div className="min-h-[36rem] rounded-3xl border border-br-light bg-bg-subtle" />}>
              <QuoteForm />
            </Suspense>
          </div>

          {/* One side panel instead of three boxes: direct channels, an optional call-back and the proof points */}
          <aside className="grid content-start gap-8 md:grid-cols-2 md:items-start lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:grid-cols-1 lg:self-start">
            <div className="rounded-3xl border border-br-light bg-bg-page p-3 shadow-card">
              <Heading as="h2" size="h4" className="px-3 pt-3">
                Предпочитате директен контакт?
              </Heading>
              <ContactChannels className="mt-2" />

              {/* The call-back reads as a fourth channel and opens in place, so the page shows one form at a time */}
              <details className="group mt-1 border-t border-br-light pt-1">
                <summary className="flex cursor-pointer list-none items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-bg-subtle [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                    <LuPhoneIncoming aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="typo-small tone-muted block">Нямате време сега?</span>
                    <span className="typo-h5 block">Ние ще ви се обадим</span>
                  </span>
                  <LuChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-tx-muted transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="px-3 pb-3 pt-2">
                  <Text size="small" className="mb-3">
                    Оставете само телефон – ще ви се обадим възможно най-скоро.
                  </Text>
                  <CallbackRequest />
                </div>
              </details>
            </div>

            <div className="grid gap-8">
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
              <TrustBar variant="list" className="px-6 md:pt-6 lg:pt-0" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
