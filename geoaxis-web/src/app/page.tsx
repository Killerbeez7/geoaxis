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
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = createSeo({
  title: "Геодезически услуги в София",
  description:
    "GeoAxis предлага професионални геодезически услуги в София и Софийска област — заснемане, трасиране, кадастър, проектиране и градоустройство.",
  canonical: "",
});

export default function Home() {
  const { hero, services, workflow, projects } = siteContent;

  return (
    <>
      {/* Who we are? */}
      <HeroSection
        id={hero.id}
        title={hero.title}
        subtitle={hero.subtitle}
        kicker={hero.kicker}
        image={hero.image}
        imageAlt={hero.imageAlt}
        cta={hero.cta}
      />

      {/* What we do? */}
      <TrustSection />

      {/* What we offer? */}
      <ServiceSection
        id={services.id}
        kicker={services.kicker}
        title={services.title}
        subtitle={services.subtitle}
        items={serviceCategories}
      />

      {/* Why choose us? */}
      <WhyChooseUs />

      {/* Our workflow */}
      <WorkflowSection
        id={workflow.id}
        kicker={workflow.kicker}
        title={workflow.title}
        subtitle={workflow.subtitle}
        steps={workflow.steps}
      />

      {/* Finished projects */}
      <ProjectsSection
        id={projects.id}
        kicker={projects.kicker}
        title={projects.title}
        subtitle={projects.subtitle}
        items={projects.items}
        cta={projects.cta}
      />

      {/* Our clients reviews */}
      <Testimonials />

      {/* Contact us */}
      <FinalCta />
    </>
  );
}
