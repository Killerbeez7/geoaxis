"use client";

import { useMemo, useState } from "react";
import { CtaButton } from "../parts/CtaButton";
import { ProjectDisplayCard } from "../parts/ProjectDisplayCard";
import { ProjectsLightbox } from "@/app/projects/ProjectsLightbox";
import type { ProjectItem, ProjectsContent } from "@/config/content/projects";

import { Section } from "@/components/layout/Section";

export function ProjectsSection({
  id,
  kicker,
  title,
  subtitle,
  items,
  cta,
}: ProjectsContent) {
  const [selectedImage, setSelectedImage] = useState<ProjectItem | null>(null);
  const maxItems = 6;

  const visible = useMemo(() => items.slice(0, maxItems), [items, maxItems]);

  return (
    <Section id={id} tone="page">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl text-left px-4 md:px-0">
          <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
            {kicker}
          </p>
          <h2 className="typo-h2 mt-1 md:mt-2">{title}</h2>
          <p className="typo-subtitle mt-2 md:mt-4 mx-0 md:mx-auto max-w-sm md:max-w-lg lg:max-w-2xl">
            {subtitle}
          </p>
        </div>

        <CtaButton variant="primary" href={cta.href} className="shrink-0">
          {cta.label}
        </CtaButton>
      </div>

      <div className="mt-8 sm:mt-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {visible.map((image) => (
            <ProjectDisplayCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-12">
        <CtaButton variant="primary">Покажи още снимки</CtaButton>
      </div>
      <ProjectsLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </Section>
  );
}
