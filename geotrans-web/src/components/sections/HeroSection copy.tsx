import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../parts/CtaButton";
import type { HeroContent } from "@/config/site-content";
import { ScrollHint } from "../parts/ScrollHint";

export function HeroSection({ id, title, subtitle, kicker, image, cta }: HeroContent) {
  // Enhanced split logic with fallbacks
  const parts = title.split("||").map((s) => s.trim());
  const line1 = parts[0] || "";
  const line2 = parts[1] || "";
  const accent = parts[2] || "";

  return (
    <header id={id} className="relative isolate overflow-hidden bg-black">
      <div className="relative min-h-[calc(65dvh-var(--nav-h))] md:min-h-[calc(100dvh-var(--nav-h))] flex items-center">
        {/* Background Image with subtle zoom effect */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={image}
            alt="Professional Surveying Services"
            fill
            priority
            sizes="100vw"
            className="
            object-cover
            object-[92%_center]
            sm:object-[88%_center]
            md:object-[82%_center]
            lg:object-[80%_center]
          "
          />
        </div>

        {/* Neutral global tone control */}
        <div className="absolute inset-0 -z-10 bg-black/30" />
        {/* Left readability gradient (neutral, not blue) */}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/45 to-transparent" />

        <div className="container-page relative w-full">
          <div className="max-w-3xl">
            {/* Kicker */}
            {kicker && (
              <span
                className="
                 inline-block mb-6 typo-kicker
                 px-4 py-1.5
                 rounded-full
                 bg-white/10
                 backdrop-blur-sm
                 text-center
                 md:bg-transparent md:rounded-none
                 md:px-0 md:py-0
                 md:border-l-2 md:border-accent md:pl-4
                 mx-auto md:mx-0
               "
              >
                {kicker}
              </span>
              // <span>
              //   <span className="inline-block mb-6 typo-kicker border-l-2 border-accent pl-4">
              //     {kicker}
              //   </span>
              // </span>
            )}
            {/* Title */}
            <h1 className="typo-hero text-center md:text-left">
              {/* <h1 className="typo-hero"> */}
              <span className="block">{line1}</span>
              <span className="block text-tx-inverse/95">
                {line2} <span className="text-accent font-semibold">{accent}</span>
              </span>
            </h1>

            <p className="mt-8 max-w-xl typo-lead border-none md:border-solid border-l border-white/20 pl-0 md:pl-6 text-center md:text-left mx-auto md:mx-0">
              {/* <p className="mt-8 max-w-xl typo-lead border-none md:border-solid border-l border-white/20 pl-0 md:pl-6"> */}
              {subtitle}
            </p>

            {cta && (
              <div className="mt-10 flex flex-wrap items-center gap-5 justify-center md:justify-start">
                <CtaButton href={cta.href} size="lg">
                  <FaPhone className="mr-2" />
                  {cta.label}
                </CtaButton>

                <CtaButton variant="glassAccent" href="/services" size="lg" className="">
                  {cta.content}
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
