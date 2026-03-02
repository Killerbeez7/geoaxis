import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../parts/CtaButton";
import type { HeroContent } from "@/config/site-content";
import { ScrollHint } from "../parts/ScrollHint";

export function HeroSection({ id, title, subtitle, kicker, image, cta }: HeroContent) {
  const [line1 = "", line2 = "", accent = ""] = title.split("||").map((s) => s.trim());

  return (
    <header id={id} className="relative isolate overflow-hidden bg-bg-page">
      {/* Use dvh so it behaves better on mobile toolbars */}
      <div className="relative min-h-[calc(100dvh-var(--nav-h))] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={image}
            alt="Геодезическо заснемане на терен"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Overlay: global dim + reading lane */}
        <div className="absolute inset-0 -z-10 bg-black/20" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/35 to-black/0" />

        {/* Content */}
        <div className="container-page w-full">
          {/* Keep inner content MAX WIDTH <= ~900px for readability (Toolset guideline) */}
          <div className="mx-auto max-w-[900px] text-center text-white">
            {kicker && (
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">
                {kicker}
              </p>
            )}

            {/* Soft scrim behind text only: boosts readability without “fog” transitions */}
            <div className="mt-5 rounded-3xl border border-white/10 bg-black/18 backdrop-blur-sm px-5 py-6 sm:px-8 sm:py-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <h1 className="font-mont font-semibold tracking-tight text-balance">
                <span className="block text-[clamp(2.1rem,2.7vw+1rem,3.2rem)] leading-[1.02] text-tx-inverse">
                  {line1}
                </span>
                <span className="block text-[clamp(2.1rem,2.7vw+1rem,3.2rem)] leading-[1.02] text-tx-inverse">
                  {line2}{" "}
                  <span className="text-accent drop-shadow-[0_2px_0_rgba(0,0,0,0.35)]">
                    {accent}
                  </span>
                </span>
              </h1>

              <p className="mt-4 mx-auto max-w-[62ch] text-white/85 text-[clamp(1.02rem,0.55vw+0.95rem,1.22rem)] leading-[1.65] font-medium">
                {subtitle}
              </p>

              {cta && (
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <CtaButton href={cta.href}>
                    <FaPhone className="text-lg opacity-90" />
                    {cta.label}
                  </CtaButton>

                  {/* Ensure secondary CTA is visually secondary (Toolset guideline) */}
                  <CtaButton variant="glassAccent" href="/services">
                    {cta.content}
                  </CtaButton>
                </div>
              )}
            </div>

            <ScrollHint />
          </div>
        </div>
      </div>
    </header>
  );
}
