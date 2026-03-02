// import { HorizontalDivider } from "../components/parts/HorizontalDivider";
import { siteContent } from "@/config/site-content";
// Sections
import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { ContactHighlights } from "@/components/sections/ContactHighlights";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Stats } from "@/components/sections/StatsSection";

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
        items={services.items}
      />

      <WorkflowSection
        id={workflow.id}
        title={workflow.title}
        subtitle={workflow.subtitle}
        steps={workflow.steps}
      />

      {/* <ContactHighlights /> */}

      <Stats />

      <ProjectsSection
        id={projects.id}
        title={projects.title}
        subtitle={projects.subtitle}
        items={projects.items}
        cta={projects.cta}
      />
    </>
  );
}
