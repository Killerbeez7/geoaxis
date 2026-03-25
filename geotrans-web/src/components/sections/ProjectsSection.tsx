"use client";

import { useMemo, useState } from "react";
import { CtaButton } from "../parts/CtaButton";
import { ProjectDisplayCard } from "../parts/ProjectDisplayCard";
import { ProjectsLightbox } from "@/app/projects/ProjectsLightbox";
import type { ProjectItem, ProjectsContent } from "@/config/content/projects";

import { Section } from "@/components/layout/Section";

export function ProjectsSection({ id, title, subtitle, items, cta }: ProjectsContent) {
  const [selectedImage, setSelectedImage] = useState<ProjectItem | null>(null);
  const maxItems = 6;

  const visible = useMemo(() => items.slice(0, maxItems), [items, maxItems]);

  return (
    <Section id={id} className="overflow-hidden bg-bg-section">
      {/* <Section id={id} className="overflow-hidden"> */}
      <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-end">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="typo-h2">{title}</h2>
          <p className="mt-3 typo-lead max-w-prose">{subtitle}</p>
        </div>

        <div className="col-span-12 mt-6 lg:col-span-4 lg:mt-0 flex justify-start lg:justify-end">
          <CtaButton variant="primary" href={cta.href}>
            {cta.label}
          </CtaButton>
        </div>
      </div>

      <div className="mt-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {visible.map((image) => (
            <ProjectDisplayCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      <ProjectsLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </Section>
  );
}
