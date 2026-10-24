import Image from "next/image";
import { LuExpand } from "react-icons/lu";
import type { ProjectItem } from "@/config/content/projects";
import { Badge } from "@/components/ui/Text";

export function ProjectCard({ project, onOpen }: { project: ProjectItem; onOpen: () => void }) {
  const photoCount = project.gallery?.length ?? 1;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-4/3 w-full overflow-hidden rounded-2xl bg-bg-deep text-left shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <Image
        src={project.src}
        alt={project.alt}
        fill
        sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) 45vw, 400px"
        quality={70}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-bg-deep/95 via-bg-deep/35 to-transparent" />

      <span className="on-dark absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 p-5">
        {project.category ? <Badge tone="on-image">{project.category}</Badge> : null}
        <span className="typo-h5 line-clamp-3">{project.title}</span>
        <span className="typo-small tone-muted inline-flex items-center gap-1.5">
          <LuExpand aria-hidden="true" className="h-3.5 w-3.5" />
          {photoCount > 1 ? `${photoCount} снимки` : "Вижте снимката"}
        </span>
      </span>
    </button>
  );
}
