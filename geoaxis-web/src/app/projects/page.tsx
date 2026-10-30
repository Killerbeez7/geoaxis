import { pageSeo } from "@/config/seo";
import { projects } from "@/config/content/projects";
import { createSeo } from "@/lib/seo-builder";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata = createSeo(pageSeo.proekti);

const photoCount = projects.items.reduce((sum, item) => sum + (item.gallery?.length ?? 1), 0);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        backdrop="/images/sections/services-hero-kadastar.webp"
        size="compact"
        breadcrumbs={[{ label: "Проекти", href: "/projects" }]}
        title={projects.title}
        description={`${projects.subtitle} ${projects.items.length} обекта и ${photoCount} снимки от терена – отворете проект, за да видите галерията.`}
      />

      <Section aria-label="Галерия с проекти">
        <ProjectGallery items={projects.items} filterable />
      </Section>

      <CtaBand
        title="Имате подобен обект?"
        text="Опишете накратко имота и задачата – ще ви кажем какво е нужно, срока и цената, преди да започнем."
      />
    </>
  );
}
