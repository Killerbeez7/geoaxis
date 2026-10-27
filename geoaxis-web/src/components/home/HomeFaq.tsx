import { LuMessageCircleQuestion } from "react-icons/lu";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { Button } from "@/components/ui/Button";
import { FaqAccordion, faqSchema } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Heading, Text } from "@/components/ui/Text";

// One representative question from each topic
const HOME_FAQ = HELPFUL_FAQ_GROUPS.map((group) => group.items[0]).filter(Boolean);

export function HomeFaq() {
  return (
    <Section tone="subtle" aria-labelledby="faq-title">
      <JsonLd data={faqSchema(HOME_FAQ)} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <SectionHeader
            id="faq-title"
            eyebrow="Въпроси"
            title="Най-често ни питат"
            description="Кратки отговори на въпросите, които чуваме преди почти всяка услуга."
          />
          <div className="mt-8 rounded-2xl border border-br-light bg-bg-page p-6 shadow-card">
            <LuMessageCircleQuestion aria-hidden="true" className="h-6 w-6 text-accent-text" />
            <Heading as="p" size="h4" className="mt-3">
              Не намирате отговор?
            </Heading>
            <Text size="small" className="mt-1.5">
              Попитайте ни директно – отговаряме до един работен ден.
            </Text>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/contacts" track="quote_click">
                Задайте въпрос
              </Button>
              <Button href="/polezno/faq" variant="outline">
                Всички въпроси
              </Button>
            </div>
          </div>
        </div>
        <FaqAccordion items={HOME_FAQ} />
      </div>
    </Section>
  );
}
