"use client";

import clsx from "clsx";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  title?: string;
  alt: string;
  description?: string;
  category?: string;
}

interface ProjectCardProps {
  image: ProjectImageProps;
  onClick?: () => void;
  className?: string;
}

export function ProjectDisplayCard({ image, onClick, className }: ProjectCardProps) {
  return (
    <div
      className={clsx(
        "group relative mb-5 flex cursor-pointer flex-col justify-end overflow-hidden rounded-card bg-black",
        "h-[260px] md:h-[300px]",
        "border border-br-default shadow-lg",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        quality={75}
      />

      <div
        className={clsx(
          "pointer-events-none absolute inset-0 flex items-end p-4 sm:p-6",
          "bg-linear-to-t from-black/80 via-black/22 to-transparent",
          "opacity-100 transition-opacity duration-300"
        )}
      >
        <p className="line-clamp-2 text-sm font-medium leading-6 text-white sm:text-base">
          {image.title || image.description || image.alt}
        </p>
      </div>
    </div>
  );
}
