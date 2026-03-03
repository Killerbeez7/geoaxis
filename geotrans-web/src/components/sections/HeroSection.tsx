import Image from "next/image";
import clsx from "clsx";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../parts/CtaButton";
import type { HeroContent } from "@/config/site-content";
import { ScrollHint } from "../parts/ScrollHint";
import { MdArrowRightAlt } from "react-icons/md";

export function HeroSection({ id, title, subtitle, kicker, image, cta }: HeroContent) {
  const parts = title.split("||").map((s) => s.trim());
  const line1 = parts[0] || "";
  const accent = parts[1] || "";

  return (
    <header id={id} className="relative isolate overflow-hidden bg-black">
      <div className="relative min-h-[65dvh] md:min-h-[calc(100dvh-var(--nav-h))] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={image}
            alt="Professional Surveying Services"
            fill
            priority
            sizes="100vw"
            className="
            object-cover
            object-[92%_75%]
            sm:object-[88%_72%]
            md:object-[82%_68%]
            lg:object-[80%_65%]
          "
          />
        </div>

        {/* Tone layer */}
        <div className="absolute inset-0 -z-10 bg-black/30" />

        {/* Gradient + blur layer */}
        <div
          className={clsx(
            "absolute inset-0 -z-10",
            "bg-linear-to-r from-black/70 via-black/45 to-transparent",
            "backdrop-blur-[1px] md:backdrop-blur-none"
          )}
        />

        <div className="container-page relative w-full">
          <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left md:translate-x-6 lg:translate-x-10">
            {/* Kicker */}
            {kicker && (
              <div className="mb-6 flex justify-center md:justify-start">
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
              <span className="block">{line1}</span>
              <span className="block text-accent font-bold drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                {accent}
              </span>
            </h1>
            {/* <h1 className="typo-hero">
              <span className="block">{line1}</span>
              <span className="block text-accent font-semibold">{accent}</span>
            </h1> */}

            <p className="typo-hero-sub mt-8 max-w-xl mx-auto md:mx-0">{subtitle}</p>

            {cta && (
              <div className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <CtaButton href={cta.href} size="lg">
                  <FaPhone className="mr-2" />
                  {cta.label}
                </CtaButton>

                <CtaButton variant="glassAccent" href="/services" size="lg" className="">
                  {cta.content} <MdArrowRightAlt />
                </CtaButton>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollHint hintText={false} />
    </header>
  );
}
