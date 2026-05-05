import { Section } from "@/components/layout/Section";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";
import { GlossarySectionLayout } from "../_components/GlossarySectionLayout";

export default function RechnikPage() {
  return (
    <main className="bg-bg-page">
      <PoleznoPlainHero
        title="Речник на термините"
        description="Обяснения на основни понятия от кадастъра, ПУП и геодезическите услуги."
      />

      <Section tone="page">
        <GlossarySectionLayout />
      </Section>
    </main>
  );
}
