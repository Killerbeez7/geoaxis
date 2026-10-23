import { siteContent } from "@/config/site-content";
import { serviceCategories } from "@/config/services/categories";
import { SITE_URL } from "@/config/site";
import { pageSeo } from "@/config/seo";
import { createSeo } from "@/lib/seo-builder";
import { getWebSiteSchema } from "@/lib/schemas";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { JsonLd } from "@/components/parts/JsonLd";
// Sections
import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Stats } from "@/components/sections/StatsSection";
import { FaqSection } from "@/components/sections/FaqSection";

// One representative question from each topic
const HOME_FAQ = HELPFUL_FAQ_GROUPS.map((group) => group.items[0]).filter(Boolean);

export const metadata = createSeo(pageSeo.home);

export default function Home() {
  const { brand, hero, services, whyUs, workflow, projects, testimonials } = siteContent;

  return (
    <>
      <JsonLd data={getWebSiteSchema(SITE_URL)} />

      <HeroSection {...hero} />
      <ServiceSection {...services} items={serviceCategories} />
      <WorkflowSection {...workflow} />
      <WhyChooseUs {...whyUs} brandName={brand.name} />
      <Stats />
      <ProjectsSection {...projects} />
      <TestimonialsSection {...testimonials} />
      <FaqSection title="Най-често ни питат" items={HOME_FAQ} tone="muted" withSchema />
      <FinalCta />
    </>
  );
}
