import { pageSeo } from "@/config/seo";
import { createSeo } from "@/lib/seo-builder";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata = createSeo(pageSeo.proekti);

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
