import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../../parts/CtaButton";
import type { HeroContent } from "@/config/site-content";

export function HeroSection({ id, title, subtitle, kicker, image, cta }: HeroContent) {
  const [line1 = "", line2 = "", accent = ""] = title.split("||").map((s) => s.trim());

  return (
    <header id={id} className="relative isolate overflow-hidden bg-bg-page">
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

        {/* Overlays */}
        <div className="absolute inset-0 -z-10 bg-black/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />

        {/* Content layout WITHOUT grid */}
        <div className="container-page w-full">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: text */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="rounded-3xl border border-white/15 bg-black/18 backdrop-blur-md shadow-2xl px-6 py-6 sm:px-8 sm:py-8">
                {kicker && (
                  <p className="text-xs uppercase tracking-[0.16em] text-white/70">
                    {kicker}
                  </p>
                )}

                <h1 className="mt-3 font-mont font-semibold tracking-tight text-balance text-white">
                  <span className="block text-[clamp(2.05rem,2.6vw+1rem,3.05rem)] leading-[1.03]">
                    {line1}
                  </span>
                  <span className="block text-[clamp(2.05rem,2.6vw+1rem,3.05rem)] leading-[1.03]">
                    {line2}{" "}
                    <span className="text-accent drop-shadow-[0_2px_0_rgba(0,0,0,0.35)]">
                      {accent}
                    </span>
                  </span>
                </h1>

                <p className="mt-4 text-white/85 text-[clamp(1.02rem,0.55vw+0.95rem,1.2rem)] leading-[1.65] font-medium">
                  {subtitle}
                </p>

                {cta && (
                  <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
                    <CtaButton href={cta.href}>
                      <FaPhone className="text-lg opacity-90" />
                      {cta.label}
                    </CtaButton>
                    <CtaButton variant="glassAccent" href="/services">
                      {cta.content}
                    </CtaButton>
                  </div>
                )}
              </div>
            </div>

            {/* Right: trust / stats card (fills empty space) */}
            <div className="w-full lg:w-[420px]">
              <div className="rounded-3xl border border-white/15 bg-black/14 backdrop-blur-md shadow-2xl p-6 sm:p-7 text-white">
                <p className="text-sm font-semibold text-white/90">Какво получавате</p>

                <ul className="mt-4 space-y-3 text-white/80">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                    <span>Ясни срокове и точна документация</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                    <span>Работа по нормативни изисквания</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                    <span>Заснемане, трасиране и кадастър</span>
                  </li>
                </ul>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/10 border border-white/10 px-3 py-3 text-center">
                    <div className="text-lg font-semibold text-white">София</div>
                    <div className="text-xs text-white/70">и област</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/10 px-3 py-3 text-center">
                    <div className="text-lg font-semibold text-white">24–72ч</div>
                    <div className="text-xs text-white/70">старт</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/10 px-3 py-3 text-center">
                    <div className="text-lg font-semibold text-white">Точност</div>
                    <div className="text-xs text-white/70">в детайла</div>
                  </div>
                </div>

                {/* subtle divider */}
                <div className="mt-6 h-px bg-white/10" />

                {/* scroll cue */}
                <div className="mt-5 flex items-center justify-between text-white/70 text-sm">
                  <span>Виж услугите по-долу</span>
                  <span className="text-white/70">↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
