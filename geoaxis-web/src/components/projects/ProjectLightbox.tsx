"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import type { ProjectItem, ProjectMedia } from "@/config/content/projects";

interface ProjectLightboxProps {
  image: ProjectItem | null;
  onClose: () => void;
}

interface ProjectLightboxContentProps {
  image: ProjectItem;
  onClose: () => void;
}

const FALLBACK_SRC = "/images/utility/placeholder.png";

function useLockBodyScroll() {
  useEffect(() => {
    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const originalBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      touchAction: body.style.touchAction,
      overscrollBehavior: body.style.overscrollBehavior,
    };
    const originalHtml = {
      overflow: documentElement.style.overflow,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    };

    const preventBackgroundScroll = (event: TouchEvent) => {
      event.preventDefault();
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";
    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventBackgroundScroll);
      body.style.overflow = originalBody.overflow;
      body.style.position = originalBody.position;
      body.style.top = originalBody.top;
      body.style.left = originalBody.left;
      body.style.right = originalBody.right;
      body.style.width = originalBody.width;
      body.style.touchAction = originalBody.touchAction;
      body.style.overscrollBehavior = originalBody.overscrollBehavior;
      documentElement.style.overflow = originalHtml.overflow;
      documentElement.style.overscrollBehavior = originalHtml.overscrollBehavior;
      window.scrollTo(0, scrollY);
    };
  }, []);
}

export function ProjectLightbox({ image, onClose }: ProjectLightboxProps) {
  if (!image) return null;

  return (
    <ProjectLightboxContent key={String(image.id)} image={image} onClose={onClose} />
  );
}

function ProjectLightboxContent({ image, onClose }: ProjectLightboxContentProps) {
  useLockBodyScroll();

  const gallery = useMemo(() => {
    return image.gallery?.length
      ? image.gallery
      : [
          {
            title: image.title,
            src: image.src,
            alt: image.alt,
            description: image.description,
          },
        ];
  }, [image]);

  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Move focus into the dialog, keep Tab inside it, and give focus back on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const trapTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trapTab);
    return () => {
      document.removeEventListener("keydown", trapTab);
      previouslyFocused?.focus?.();
    };
  }, []);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const hasGallery = gallery.length > 1;

  const goPrevious = useCallback(() => {
    if (!gallery.length) return;
    setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
  }, [gallery.length]);

  const goNext = useCallback(() => {
    if (!gallery.length) return;
    setActiveIndex((current) => (current + 1) % gallery.length);
  }, [gallery.length]);

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartX.current = touch?.clientX ?? null;
    touchStartY.current = touch?.clientY ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!hasGallery || touchStartX.current === null || touchStartY.current === null) {
        return;
      }

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;
      touchStartX.current = null;
      touchStartY.current = null;

      if (Math.abs(deltaX) < 35 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      if (deltaX > 0) {
        goPrevious();
      } else {
        goNext();
      }
    },
    [goNext, goPrevious, hasGallery]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!hasGallery) return;
      if (e.key === "ArrowLeft") goPrevious();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious, hasGallery, onClose]);

  if (!activeImage) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-bg-deep/90 backdrop-blur-sm sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Проект: ${image.title}`}
    >
      <div
        ref={dialogRef}
        className="relative flex h-dvh max-h-dvh w-full max-w-6xl flex-col overflow-hidden border-white/10 bg-bg-deep shadow-2xl sm:h-auto sm:max-h-[92vh] sm:rounded-3xl sm:border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors duration-200 hover:text-accent-on-dark sm:right-4 sm:top-4 sm:h-11 sm:w-11"
          onClick={onClose}
          aria-label="Затвори"
          type="button"
        >
          <LuX className="h-6 w-6" aria-hidden="true" />
        </button>

        <div
          className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center bg-black sm:min-h-[50vh] sm:px-8 sm:py-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartX.current = null;
            touchStartY.current = null;
          }}
        >
          <LightboxImage key={activeImage.src} image={activeImage} />

          {hasGallery && (
            <>
              <button
                type="button"
                onClick={goPrevious}
                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 sm:left-5 sm:h-12 sm:w-12"
                aria-label="Предишна снимка"
              >
                <LuChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 sm:right-5 sm:h-12 sm:w-12"
                aria-label="Следваща снимка"
              >
                <LuChevronRight className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        <div className="min-h-0 overflow-hidden border-t border-white/10 bg-bg-deep px-4 pb-[calc(env(safe-area-inset-bottom)+0.85rem)] pt-6  text-tx-inverse sm:max-h-none sm:px-6 sm:pb-4 sm:pt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <p className="line-clamp-2 max-w-4xl font-semibold leading-snug text-tx-inverse sm:text-lg">
              {activeImage.title}
            </p>
            {hasGallery && (
              <p className="order-first shrink-0 typo-eyebrow text-accent-on-dark sm:order-0 sm:pt-1">
                {activeIndex + 1} / {gallery.length}
              </p>
            )}
          </div>
          {activeImage.description && (
            <p className="mt-2 line-clamp-3 max-w-4xl typo-small text-tx-inverse-muted">
              {activeImage.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function LightboxImage({ image }: { image: ProjectMedia }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentSrc = hasError ? FALLBACK_SRC : image.src;

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-accent" />
        </div>
      )}

      <Image
        key={`${currentSrc}-${hasError ? "fallback" : "original"}`}
        src={currentSrc}
        alt={hasError ? "Резервно изображение" : image.alt}
        width={1600}
        height={1200}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
        quality={76}
        className={`h-full w-full object-cover transition-opacity duration-300 sm:h-auto sm:max-h-[68vh] sm:max-w-full sm:rounded-xl sm:object-contain ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        priority
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setIsLoading(false);
          }
        }}
      />
    </>
  );
}
