import { HOME_FAQ_ITEMS } from "@/config/polezno/faq";
import { Button } from "@/components/ui/Button";
import { FaqAccordion, faqSchema } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HomeFaq() {
  return (
    <Section tone="subtle" aria-labelledby="faq-title">
      <JsonLd data={faqSchema(HOME_FAQ_ITEMS)} />
      {/* Wide screens: header and link on the left, questions on the right. Phones: the link comes after the questions. */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:gap-y-6">
        <SectionHeader
          id="faq-title"
          eyebrow="Въпроси"
          title="Най-често ни питат"
          description="Кратки отговори на въпросите, които чуваме преди почти всяка услуга."
        />
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <FaqAccordion items={HOME_FAQ_ITEMS} variant="plain" />
        </div>
        <div>
          <Button href="/polezno/faq" variant="link" size="lg" arrow>
            Всички въпроси
          </Button>
        </div>
      </div>
    </Section>
  );
}
