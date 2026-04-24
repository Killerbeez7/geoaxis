"use client";

import clsx from "clsx";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

interface ProjectCardProps {
  image: ProjectImageProps;
  onClick?: () => void;
}

export function ProjectDisplayCard({ image, onClick }: ProjectCardProps) {
  return (
    <div
      className={clsx(
        "group relative mb-5 flex cursor-pointer flex-col justify-end overflow-hidden rounded-card bg-black",
        "h-[260px] md:h-[300px]",
        "border border-br-default shadow-md",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl"
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
          "bg-gradient-to-t from-black/80 via-black/22 to-transparent",
          "opacity-100 transition-opacity duration-300"
        )}
      >
        <p className="line-clamp-2 text-sm font-medium leading-6 text-white sm:text-base">
          {image.caption || image.alt}
        </p>
      </div>
    </div>
  );
}
