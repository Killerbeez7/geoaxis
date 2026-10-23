"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

import { siteContent } from "@/config/site-content";
import type { ProjectsContent } from "@/config/content/projects";

import { ProjectsLightbox } from "./ProjectsLightbox";
import { Section } from "@/components/layout/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectDisplayCard } from "@/components/parts/ProjectDisplayCard";
import { CtaButton } from "@/components/parts/CtaButton";

const ALL = "Всички";

export default function ProjectsPageClient() {
  const [selectedImage, setSelectedImage] = useState<
    ProjectsContent["items"][number] | null
  >(null);

  const { title, subtitle, items } = siteContent.projects;
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...new Set(items.map((item) => item.category).filter(Boolean) as string[])],
    [items]
  );
  const visibleItems =
    activeCategory === ALL ? items : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <Section
        id="projects"
        variant="hero"
        tone="page"
        className="pt-28 pb-20 md:pt-36 md:pb-28"
      >
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-14">
          <header className="col-span-12 text-center lg:col-span-8 lg:col-start-3">
            <h1 className="typo-h2 text-tx-primary lg:text-5xl">{title}</h1>
            <p className="typo-lead mt-5 text-lg text-tx-secondary sm:text-xl">
              {subtitle}
            </p>
          </header>
        </div>

        {categories.length > 2 ? (
          <div role="group" aria-label="Филтър по вид услуга" className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  activeCategory === category
                    ? "border-accent bg-accent text-tx-on-accent"
                    : "border-br-default bg-bg-page text-tx-secondary hover:border-br-accent"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((img) => (
            <ProjectDisplayCard
              key={img.id}
              image={img}
              onClick={() => setSelectedImage(img)}
              // className="mb-0!"
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-tx-secondary">Имате подобен обект?</p>
          <CtaButton href="/contacts" size="lg" className="mt-5">
            Попитайте за вашия проект
          </CtaButton>
        </div>
      </Section>

      <ProjectsLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      <FinalCta />
    </>
  );
}
