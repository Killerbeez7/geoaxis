import { HorizontalDivider } from "../components/parts/HorizontalDivider";
import { siteContent } from "@/config/site-content";
import { serviceCategories } from "@/config/services/categories";

// Sections
import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import Testimonials from "@/components/sections/Testimonials";

import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Stats } from "@/components/sections/StatsSection";
import TrustBar from "@/components/sections/TrustBar";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  const { hero, services, workflow, stats, projects } = siteContent;

  return (
    <>
      <HeroSection
        id={hero.id}
        title={hero.title}
        subtitle={hero.subtitle}
        kicker={hero.kicker}
        image={hero.image}
        cta={hero.cta}
      />

      <ServiceSection
        id={services.id}
        title={services.title}
        subtitle={services.subtitle}
        items={serviceCategories}
      />

      <TrustBar className="border-y border-br-default/30" />

      <WhyChooseUs />
      <Stats />

      <WorkflowSection
        id={workflow.id}
        title={workflow.title}
        subtitle={workflow.subtitle}
        steps={workflow.steps}
      />

      {/* <ContactHighlights /> */}

      <HorizontalDivider></HorizontalDivider>

      <ProjectsSection
        id={projects.id}
        title={projects.title}
        subtitle={projects.subtitle}
        items={projects.items}
        cta={projects.cta}
      />

      <Testimonials />

      <HorizontalDivider></HorizontalDivider>

      <FinalCta />
    </>
  );
}
