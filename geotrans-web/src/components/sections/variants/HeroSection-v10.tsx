import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../../parts/CtaButton";
import type { HeroContent } from "@/config/site-content";

export function HeroSection({ id, title, subtitle, kicker, image, cta }: HeroContent) {
  const [line1 = "", line2 = "", accent = ""] = title.split("||").map((s) => s.trim());

  return (
    <header id={id} className="relative isolate overflow-hidden bg-bg-page">
      <div className="relative min-h-[74vh] lg:min-h-[calc(100dvh-var(--nav-h))]">
        {/* Full-bleed background */}
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

        {/* Calm overlays: readable left, open right */}
        <div className="absolute inset-0 -z-10 bg-black/18" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/62 via-black/28 to-black/0" />

        {/* Content */}
        <div className="container-page relative h-full">
          <div className="flex min-h-[74vh] lg:min-h-[82vh] items-center">
            <div className="w-full max-w-[620px] text-white">
              {kicker && (
                <p className="text-xs uppercase tracking-[0.16em] text-white/70">
                  {kicker}
                </p>
              )}

              <h1 className="mt-4 font-mont text-tx-inverse font-semibold tracking-tight text-balance">
                <span className="block text-[clamp(2.05rem,2.6vw+1rem,3.1rem)] leading-[1.03]">
                  {line1}
                </span>
                <span className="block text-[clamp(2.05rem,2.6vw+1rem,3.1rem)] leading-[1.03]">
                  {line2}{" "}
                  <span className="text-accent drop-shadow-[0_2px_0_rgba(0,0,0,0.35)]">
                    {accent}
                  </span>
                </span>
              </h1>

              <p className="mt-5 text-white/85 text-[clamp(1.02rem,0.55vw+0.95rem,1.2rem)] leading-[1.65] font-medium max-w-prose">
                {subtitle}
              </p>

              {cta && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <CtaButton href={cta.href}>
                    <FaPhone className="text-lg opacity-90" />
                    {cta.label}
                  </CtaButton>

                  {/* secondary that reads well on dark background */}
                  <CtaButton variant="glassAccent" href="/services">
                    {cta.content}
                  </CtaButton>
                </div>
              )}
            </div>
          </div>

          {/* Right-side “parcel outline” — fills empty space without being generic */}
          <div className="pointer-events-none absolute right-6 top-1/2 hidden w-[420px] -translate-y-1/2 lg:block">
            <div className="relative">
              {/* outer frame */}
              <div className="absolute inset-0 rounded-[28px] border border-white/18 bg-white/5 backdrop-blur-[2px]" />
              {/* parcel outline */}
              <svg
                className="relative h-[280px] w-full"
                viewBox="0 0 420 280"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M70 210 L95 85 L240 55 L345 125 L315 230 Z"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="2"
                  strokeDasharray="7 7"
                />
                {/* corner markers */}
                {[
                  [70, 210],
                  [95, 85],
                  [240, 55],
                  [345, 125],
                  [315, 230],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="5" fill="rgba(240,168,58,0.95)" />
                ))}
                {/* small label */}
                <text
                  x="92"
                  y="240"
                  fontSize="12"
                  fill="rgba(255,255,255,0.75)"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Парцел • ориентация • трасиране
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
