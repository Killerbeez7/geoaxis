import Image from "next/image";
import clsx from "clsx";
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
  // const [subtitle_1, subtitle_2] = subtitle ?? [];
  const subtitleText = subtitle?.filter(Boolean).join(" ");

  return (
    <header id={id} className="relative isolate overflow-hidden bg-bg-inverse">
      {/* <div className="relative min-h-[70dvh] md:min-h-dvh flex items-center pb-0 md:pb-16"> */}
      <div className="relative flex min-h-[82dvh] items-center pb-12 pt-(--header-h) md:min-h-dvh md:pb-16">
        {/* Background Image */}
        <HeroBackground src={image} alt={imageAlt} />

        {/* Content */}
        <div className="container-page relative w-full">
          <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
            {/* <div className="container-page relative w-full pt-(--header-h)">
          <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left "> */}
            {/* Kicker */}
            {kicker && (
              <div className="mb-4 flex justify-center md:justify-start md:mb-5">
                {/* <div className="mb-4 flex justify-center md:justify-start"> */}
                <span
                  className={clsx(
                    "typo-kicker text-tx-inverse/72",
                    "text-[11px] md:text-[13px]",
                    "tracking-[0.12em] md:tracking-[0.18em]",
                    // mobile pill
                    "md:bg-transparent md:rounded-none",
                    "px-4 py-2 bg-white/10 rounded-full ",
                    // desktop border left
                    "md:border-l-2 md:border-accent/50 md:pl-4 md:py-1"
                  )}
                >
                  {kicker}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="typo-hero">
              <span className="block text-tx-inverse/87">{title_1}</span>{" "}
              {title_2 && (
                <span
                  className={clsx(
                    "block mt-0.5",
                    // "font-semibold text-accent",
                    "font-bold text-transparent bg-clip-text bg-linear-to-r from-accent to-accent/87",
                    "drop-shadow-sm"
                  )}
                >
                  {title_2}
                </span>
              )}
            </h1>

            {/* Subtitle - optional */}
            {subtitleText && (
              <p className="typo-lead mx-auto mt-6 max-w-xl text-balance text-tx-inverse/78 md:mx-0 md:mt-7">
                {subtitleText}
              </p>
            )}
            {/* {subtitle && (
              <p className="typo-lead mt-7 md:mt-8 max-w-lg mx-auto md:mx-0 ">
                {subtitle_1}
                <br />
                {subtitle_2}
              </p>
            )} */}

            {/* CTA */}
            {cta && (
              <div
                className={clsx(
                  // "flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4",
                  "flex flex-wrap items-center gap-4",
                  "justify-center md:justify-start",
                  subtitle ? "mt-8" : "mt-10 md:mt-12"
                )}
              >
                <CtaButton href={cta.primary.href} size="lg">
                  {/* <CtaButton href={cta.primary.href} size="lg" className="min-h-[52px]"> */}
                  {cta.primary.label}
                </CtaButton>

                <CtaButton variant="glass" href={cta.secondary.href} size="lg">
                  {/* <CtaButton
                  variant="glass"
                  href={cta.secondary.href}
                  size="lg"
                  className="min-h-[52px]"
                > */}
                  {cta.secondary.label} <MdArrowRightAlt aria-hidden="true" />
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
      {/* <div className="absolute inset-0 -z-10 bg-bg-inverse/15" /> */}

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
