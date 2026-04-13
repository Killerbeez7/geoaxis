"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { siteContent } from "@/config/site-content";
import type { ProjectsContent } from "@/config/content/projects";

import { ProjectsLightbox } from "./ProjectsLightbox";
import { Section } from "@/components/layout/Section";

import { createSeo } from "@/lib/seo-builder";

export const metadata = createSeo({
  title: "Проекти",
  description:
    "Разгледайте реализирани проекти и примери от работата на GeoAxis в областта на геодезията, кадастъра, трасирането и проектирането в София и Софийска област.",
  canonical: "/projects",
});

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<
    ProjectsContent["items"][number] | null
  >(null);

  const { title, subtitle, items } = siteContent.projects;

  const hasFew = useMemo(() => items.length < 6, [items.length]);

  return (
    <main className="relative min-h-screen bg-(--bg-page) pt-[calc(var(--header-h)+24px)]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url(/images/topo-pattern-light.svg)",
          backgroundSize: "cover",
        }}
      />

      <Section id="projects" className="pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Header aligned to your 12-col grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-14">
          <header className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-(--text-primary)">
              {title}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-(--text-secondary)">{subtitle}</p>
          </header>
        </div>

        {/* Gallery */}
        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {items.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={clsx(
                "relative group break-inside-avoid w-full",
                "text-left cursor-pointer rounded-2xl overflow-hidden",
                "shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              )}
              aria-label={img.caption ?? img.alt}
            >
              <div className="relative aspect-4/3 sm:aspect-3/4 lg:aspect-4/5 overflow-hidden pointer-events-none">
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Hover caption overlay */}
              <div
                className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           flex items-end p-6 pointer-events-none"
              >
                <p className="text-white text-sm font-medium">{img.caption || img.alt}</p>
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
                         px-6 py-3 text-base font-semibold text-white
                         hover:bg-(--color-btn-primary-hover) transition"
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
