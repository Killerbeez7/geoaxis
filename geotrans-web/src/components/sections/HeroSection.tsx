import Image from "next/image";
import clsx from "clsx";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../parts/CtaButton";
import type { HeroContent } from "@/config/content/hero";
import { ScrollHint } from "../parts/ScrollHint";
import { MdArrowRightAlt } from "react-icons/md";

export function HeroSection({ id, title, subtitle, kicker, image, cta }: HeroContent) {
  const [line1, accent] = title.split("||").map((s) => s.trim());

  return (
    <header id={id} className="relative isolate overflow-hidden bg-bg-inverse">
      <div className="relative min-h-[70dvh] md:min-h-[calc(103dvh)] flex items-center pb-0 md:pb-20">
        {/* Background Image */}
        <HeroBackground src={image} />

        {/* Content */}
        <div className="container-page relative w-full pt-(--header-h)">
          <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left md:translate-x-6 lg:translate-x-10">
            {/* Kicker */}
            {kicker && (
              <div className="mb-4 flex justify-center md:justify-start">
                <span
                  className="
                    typo-kicker
                    px-5 py-2
                    rounded-full
                    bg-white/10
                    backdrop-blur-md
                    tracking-wider
                    text-[11px] md:text-sm
                    md:bg-transparent md:rounded-none
                    md:px-0 md:py-0
                    md:border-l-2 md:border-accent md:pl-4
                  "
                >
                  {kicker}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="typo-hero">
              <span className="block text-tx-inverse/92">{line1}</span>
              {accent && (
                <span className="block font-bold text-accent drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                  {accent}
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="typo-hero-sub mt-8 max-w-xl mx-auto md:mx-0 text-tx-inverse/87">
              {subtitle}
            </p>

            {/* CTA */}
            {cta && (
              <div className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <CtaButton href={cta.primary.href} size="lg">
                  <FaPhone className="mr-2" />
                  {cta.primary.label}
                </CtaButton>

                <CtaButton
                  variant="glassAccent"
                  href={cta.secondary.href}
                  size="lg"
                  className=""
                >
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

function HeroBackground({ src }: { src: string }) {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={src}
          alt="Professional Surveying Services"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-[92%_75%]
            sm:object-[88%_72%]
            md:object-[82%_68%]
            lg:object-[80%_62%]
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
