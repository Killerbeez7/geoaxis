import Image from "next/image";
import clsx from "clsx";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../parts/CtaButton";
import type { HeroContent } from "@/config/content/hero";
import { ScrollHint } from "../parts/ScrollHint";
import { MdArrowRightAlt } from "react-icons/md";

export function HeroSection({
  id,
  title,
  subtitle,
  kicker,
  image,
  imageAlt,
  cta,
}: HeroContent) {
  const [title_1, title_2] = title;
  const [subtitle_1, subtitle_2] = subtitle ?? [];

  return (
    <header id={id} className="relative isolate overflow-hidden bg-bg-inverse">
      <div className="relative min-h-[70dvh] md:min-h-dvh flex items-center pb-0 md:pb-16">
        {/* Background Image */}
        <HeroBackground src={image} alt={imageAlt} />

        {/* Content */}
        <div className="container-page relative w-full pt-(--header-h)">
          {/* <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left md:translate-x-6 lg:translate-x-10"> */}
          <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left">
            {/* Kicker */}
            {kicker && (
              <div className="mb-4 flex justify-center md:justify-start">
                <span
                  className={clsx(
                    "rounded-full px-4 py-2 bg-white/10",
                    "typo-kicker",
                    "text-[11px] md:text-[13px]",
                    "text-tx-inverse/72",
                    "tracking-[0.14em] md:tracking-[0.18em]",
                    "md:border-l-2 md:border-accent/50 md:pl-4 md:py-1",

                    "md:bg-transparent md:rounded-none"
                  )}
                >
                  {kicker}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="typo-hero">
              <span className="block text-tx-inverse/87">{title_1}</span>
              {title_2 && (
                <span
                  className={clsx(
                    "block mt-0.5",
                    // "font-semibold text-accent",
                    // "font-bold text-accent ",
                    "font-bold text-transparent bg-clip-text bg-linear-to-r from-accent to-accent/87",
                    "drop-shadow-sm"
                  )}
                >
                  {title_2}
                </span>
              )}
            </h1>

            {/* Subtitle - optional */}
            {subtitle && (
              <p className="typo-hero-sub mt-7 md:mt-8 max-w-lg mx-auto md:mx-0 ">
                {subtitle_1}
                <br />
                {subtitle_2}
              </p>
            )}

            {/* CTA */}
            {cta && (
              <div
                className={clsx(
                  "flex flex-wrap items-center gap-4",
                  "justify-center md:justify-start",
                  subtitle ? "mt-8" : "mt-10 md:mt-12"
                )}
              >
                <CtaButton href={cta.primary.href} size="lg">
                  <FaPhone className="mr-2" />
                  {cta.primary.label}
                </CtaButton>

                <CtaButton variant="glass" href={cta.secondary.href} size="lg">
                  {cta.secondary.label} <MdArrowRightAlt />
                </CtaButton>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollHint hintText={false} className="pb-8" />
    </header>
  );
}

function HeroBackground({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 -z-20 overflow-hidden bg-[#6f8796]">
        <Image
          src={src}
          alt={alt}
          fill
          preload
          sizes="100vw"
          className="
            object-cover
            object-[92%_75%]
            sm:object-[88%_72%]
            md:object-[82%_68%]
            lg:object-[80%_88%]
          "
        />
      </div>

      {/* Tone layer */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Gradient + blur layer */}
      <div
        className={clsx(
          "absolute inset-0 -z-10",
          "bg-linear-to-r from-black/70 via-black/50 to-transparent",
          "backdrop-blur-[1px] md:backdrop-blur-none"
        )}
      />
    </>
  );
}
