"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { siteContent } from "@/config/site-content";
import type { ProjectsContent } from "@/config/content/projects";

import { ProjectsLightbox } from "./ProjectsLightbox";
import { Section } from "@/components/layout/Section";

export default function ProjectsPageClient() {
  const [selectedImage, setSelectedImage] = useState<
    ProjectsContent["items"][number] | null
  >(null);

  const { title, subtitle, items } = siteContent.projects;

  const hasFew = useMemo(() => items.length < 6, [items.length]);

  return (
    <main className="relative min-h-screen bg-(--bg-page) pt-[calc(var(--header-h)+24px)]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: "url(/images/topo-pattern-light.svg)",
          backgroundSize: "cover",
        }}
      />

      <Section id="projects" className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-14">
          <header className="col-span-12 text-center lg:col-span-8 lg:col-start-3">
            <h1 className="text-4xl font-bold tracking-tight text-(--text-primary) sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg text-(--text-secondary) sm:text-xl">{subtitle}</p>
          </header>
        </div>

        <div className="mt-16 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {items.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={clsx(
                "relative group break-inside-avoid w-full",
                "cursor-pointer overflow-hidden rounded-2xl text-left",
                "shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              )}
              aria-label={img.caption ?? img.alt}
            >
              <div className="pointer-events-none relative aspect-4/3 overflow-hidden sm:aspect-3/4 lg:aspect-4/5">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              <div
                className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-transparent to-transparent
                           p-6 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
              >
                <p className="text-sm font-medium text-white">{img.caption || img.alt}</p>
              </div>
            </button>
          ))}
        </div>

        {hasFew && (
          <div className="mt-16 text-center text-(--text-secondary)">
            <p className="text-lg">Още проекти се добавят редовно.</p>
            <Link
              href="/contacts"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--color-btn-primary)
                         px-6 py-3 text-base font-semibold text-white transition
                         hover:bg-(--color-btn-primary-hover)"
            >
              Попитайте за ваш проект →
            </Link>
          </div>
        )}
      </Section>

      <ProjectsLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  );
}
