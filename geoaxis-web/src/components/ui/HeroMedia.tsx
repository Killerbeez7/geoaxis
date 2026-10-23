import Image from "next/image";
import clsx from "clsx";

// Framed image for the right column of a PageHero.
export function HeroMedia({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={clsx(
        "relative aspect-4/3 overflow-hidden rounded-3xl bg-bg-page shadow-lift ring-1 ring-black/5",
        className
      )}
    >
      <Image src={src} alt={alt} fill priority sizes="(max-width: 1024px) calc(100vw - 2.5rem), 448px" quality={75} className="object-cover" />
    </div>
  );
}
