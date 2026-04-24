import { siteContent } from "@/config/site-content";
import { serviceCategories } from "@/config/services/categories";
import { createSeo } from "@/lib/seo-builder";
// Sections
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Stats } from "@/components/sections/StatsSection";

export const metadata = createSeo({
  title: "Геодезически услуги в София",
  description:
    "GeoAxis предлага професионални геодезически услуги в София и Софийска област — заснемане, трасиране, кадастър, проектиране и градоустройство.",
  canonical: "",
});

export default function Home() {
  const { brand, hero, trust, services, whyUs, workflow, projects, testimonials } =
    siteContent;

  return (
    <>
      {/* Who we are? */}
      <HeroSection {...hero} />

      {/* What we do? */}
      <TrustSection {...trust} />

      {/* What we offer? */}
      <ServiceSection {...services} items={serviceCategories} />
      <Stats />

      {/* Why choose us? */}
      <WhyChooseUs {...whyUs} brandName={brand.name} />

      {/* Our workflow */}
      <WorkflowSection {...workflow} />

      {/* Finished projects */}
      <ProjectsSection {...projects} />

      {/* Our clients reviews */}
      <TestimonialsSection {...testimonials} />

      {/* Contact us */}
      <FinalCta />
    </>
  );
}
