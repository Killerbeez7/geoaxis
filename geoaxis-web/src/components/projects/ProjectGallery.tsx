"use client";

import { useMemo, useState } from "react";
import type { ProjectItem } from "@/config/content/projects";
import { Chip } from "@/components/ui/Chip";
import { ProjectCard } from "./ProjectCard";
import { ProjectLightbox } from "./ProjectLightbox";

const ALL = "Всички";

type Props = {
  items: readonly ProjectItem[];
  /** Show the category filter (projects page) */
  filterable?: boolean;
};

export function ProjectGallery({ items, filterable = false }: Props) {
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...new Set(items.map((item) => item.category).filter((value): value is string => Boolean(value)))],
    [items]
  );
  const visible = category === ALL ? items : items.filter((item) => item.category === category);

  return (
    <>
      {filterable && categories.length > 2 ? (
        <div role="group" aria-label="Филтър по вид услуга" className="mb-8 flex flex-wrap gap-2">
          {categories.map((name) => (
            <Chip key={name} selected={category === name} onClick={() => setCategory(name)}>
              {name}
            </Chip>
          ))}
        </div>
      ) : null}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} onOpen={() => setSelected(project)} />
          </li>
        ))}
      </ul>

      <ProjectLightbox image={selected} onClose={() => setSelected(null)} />
    </>
  );
}
