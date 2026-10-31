import { projects } from "@/config/content/projects";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FEATURED_COUNT = 3;

export function FeaturedProjects() {
  return (
    <Section aria-labelledby="projects-title">
      <SectionHeader
        id="projects-title"
        eyebrow="Проекти"
        title="Работа на терен, не обещания"
        description="Примери от реални обекти в София и областта – трасиране, контролни заснемания и заснемане на сгради."
        action={
          <Button href="/projects" variant="outline" arrow>
            Всички проекти
          </Button>
        }
      />
      <div className="mt-12">
        <ProjectGallery items={projects.items.slice(0, FEATURED_COUNT)} />
      </div>
    </Section>
  );
}
