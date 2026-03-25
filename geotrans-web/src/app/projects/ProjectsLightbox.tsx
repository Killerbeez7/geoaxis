"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ProjectItem } from "@/config/content/projects";

interface ProjectsLightboxProps {
  image: ProjectItem | null;
  onClose: () => void;
}

const FALLBACK_SRC = "/images/utility/placeholder.png";

export function ProjectsLightbox({ image, onClose }: ProjectsLightboxProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!image) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  const currentSrc = hasError ? FALLBACK_SRC : image.src;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Преглед на снимка"
    >
      <div
        className="relative max-w-[95vw] max-h-[90vh] w-auto h-auto bg-gray-950/40 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 text-white text-4xl hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full p-1"
          onClick={onClose}
          aria-label="Затвори"
          type="button"
        >
          ×
        </button>

        <div className="relative flex items-center justify-center p-4 sm:p-8 min-h-[50vh]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-amber-400 rounded-full animate-spin" />
            </div>
          )}

          <Image
            key={`${currentSrc}-${hasError ? "fallback" : "original"}`}
            src={currentSrc}
            alt={hasError ? "Fallback placeholder" : image.alt}
            width={1600}
            height={1200}
            className={`max-w-full max-h-[80vh] object-contain rounded-xl transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            priority
            onLoad={() => setIsLoading(false)}
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => {
              if (!hasError) {
                setHasError(true);
                setIsLoading(false);
              }
            }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent text-white">
          <p className="text-lg font-medium">{image.alt}</p>
          {image.caption && <p className="mt-1 text-sm opacity-90">{image.caption}</p>}
        </div>
      </div>
    </div>
  );
}
