import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../parts/CtaButton";
import type { HeroContent } from "@/config/site-content";

export function HeroSection({ id, title, subtitle, kicker, image, cta }: HeroContent) {
  // Enhanced split logic with fallbacks
  const parts = title.split("||").map((s) => s.trim());
  const line1 = parts[0] || "";
  const line2 = parts[1] || "";
  const accent = parts[2] || "";

  return (
    <header id={id} className="relative isolate overflow-hidden bg-slate-900">
      <div className="relative min-h-[calc(100dvh-var(--nav-h))] flex items-center">
        {/* Background Image with subtle zoom effect */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={image}
            alt="Professional Surveying Services"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover scale-105"
          />
        </div>

        {/* Sophisticated Layered Overlays */}
        <div className="absolute inset-0 -z-10 bg-slate-950/30" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-slate-950/80 via-slate-950/40 to-transparent" />

        <div className="container-page relative w-full">
          <div className="max-w-3xl">
            {/* Kicker with refined spacing */}
            {kicker && (
              <span className="inline-block mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent/90 border-l-2 border-accent pl-4">
                {kicker}
              </span>
            )}

            <h1 className="font-mont font-bold text-white tracking-tight leading-[1.1] text-balance">
              <span className="block text-[clamp(2.5rem,5vw,4.5rem)]">{line1}</span>
              <span className="block text-[clamp(2.5rem,5vw,4.5rem)] text-white/95">
                {line2} <span className="text-accent italic font-medium">{accent}</span>
              </span>
            </h1>

            <p className="mt-8 text-white/80 text-lg md:text-xl leading-relaxed max-w-xl font-light border-l border-white/20 pl-6">
              {subtitle}
            </p>

            {cta && (
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <CtaButton
                  href={cta.href}
                  className="px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform"
                >
                  <FaPhone className="mr-2 text-base" />
                  {cta.label}
                </CtaButton>

                <CtaButton
                  variant="glassAccent"
                  href="/services"
                  className="backdrop-blur-md border-white/30 text-white hover:bg-white/10"
                >
                  {cta.content || "View Services"}
                </CtaButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
