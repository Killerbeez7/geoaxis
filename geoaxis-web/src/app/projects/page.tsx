import { createSeo } from "@/lib/seo-builder";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata = createSeo({
  title: "Проекти",
  description:
    "Разгледайте реализирани проекти и примери от работата на GeoAxis в областта на геодезията, кадастъра, трасирането и проектирането в София и Софийска област.",
  canonical: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
