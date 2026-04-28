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
      <div className="max-w-3xl text-left">
        <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
          {kicker}
        </p>
        <h2 className="typo-h2 mt-1 md:mt-2">{title}</h2>
        <p className="typo-subtitle mx-0 mt-2 max-w-2xl md:mt-4">{subtitle}</p>
      </div>

      <div className="mt-8 sm:mt-12">
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((img) => (
            <ProjectDisplayCard
              key={img.id}
              image={img}
              onClick={() => setSelectedImage(img)}
              className="mb-0!"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 sm:pt-14">
        <CtaButton variant="primary" href={cta.href}>
          Покажи още снимки
        </CtaButton>
      </div>
      <ProjectsLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </Section>
  );
}
