"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

// Assuming this is your type (adjust if different)
interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
  // blurDataURL?: string; // optional for blur placeholder
}

interface ProjectCardProps {
  image: ProjectImageProps;
  onClick?: () => void;
}

export function ProjectDisplayCard({ image, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    //   <Link
    //   href={href}
    //   aria-label={`Детайли за ${title}`}
    //   className={clsx(
    //     "group relative flex flex-col justify-end overflow-hidden rounded-4xl bg-black",
    //     "h-[260px] md:h-[300px]",
    //     "border border-br-default shadow-lg",
    //     "transition-all duration-300",
    //     "hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
    //   )}
    // >

    <div
      className={clsx(
        "group relative flex flex-col justify-end overflow-hidden rounded-4xl bg-black",
        "h-[260px] md:h-[300px]",
        "border border-br-default shadow-lg",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`
          object-cover transition-transform duration-700 ease-out
          ${isHovered ? "scale-110" : "scale-100"}
        `}
        loading="lazy"
        quality={75}
        // placeholder="blur"
        // blurDataURL={image.blurDataURL} // uncomment if you generate blurDataURL
      />

      {/* Hover overlay – fixed gradient syntax */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          flex items-end p-4 sm:p-6 pointer-events-none
        `}
      >
        <p className="text-white text-sm sm:text-base font-medium line-clamp-2">
          {image.caption || image.alt}
        </p>
      </div>
    </div>
  );
}
