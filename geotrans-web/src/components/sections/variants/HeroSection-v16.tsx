import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { CtaButton } from "../../parts/CtaButton";
import type { HeroContent } from "@/config/site-content";

export function HeroSection({ id, title, subtitle, kicker, image, cta }: HeroContent) {
  const [line1 = "", line2 = "", accent = ""] = title.split("||").map((s) => s.trim());

  return (
    <header id={id} className="relative isolate overflow-hidden bg-slate-900">
      <div className="relative min-h-[85vh] lg:min-h-[calc(100dvh-var(--nav-h))] flex items-center">
        {/* Full-bleed background with higher quality settings */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={image}
            alt="Professional Surveying"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.85]"
          />
        </div>

        {/* Dynamic Overlay: Darker on left for text, lighter on right to show image */}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

        <div className="container-page w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Essential Messaging */}
            <div className="lg:col-span-7 xl:col-span-6">
              {kicker && (
                <span className="inline-block mb-6 text-sm font-bold uppercase tracking-widest text-accent border-l-2 border-accent pl-4">
                  {kicker}
                </span>
              )}

              <h1 className="font-mont text-white font-bold leading-[1.1] tracking-tight">
                <span className="block text-[clamp(2.5rem,4.5vw,4rem)]">{line1}</span>
                <span className="block text-[clamp(2.5rem,4.5vw,4rem)] text-white/90">
                  {line2} <span className="text-accent italic">{accent}</span>
                </span>
              </h1>

              <p className="mt-8 text-white/75 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                {subtitle}
              </p>

              {cta && (
                <div className="mt-10 flex flex-wrap gap-4">
                  <CtaButton href={cta.href} className="shadow-2xl shadow-accent/20">
                    <FaPhone className="mr-2" /> {cta.label}
                  </CtaButton>
                  <CtaButton
                    variant="glassAccent"
                    href="/portfolio"
                    className="backdrop-blur-sm"
                  >
                    View Projects
                  </CtaButton>
                </div>
              )}
            </div>

            {/* Right Column: The "Balance" Element */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-end">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-xs shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <p className="text-accent text-3xl font-bold">15+</p>
                    <p className="text-white/60 text-sm uppercase tracking-wider">
                      Years Excellence
                    </p>
                  </div>
                  <div className="h-px bg-white/10 w-full" />
                  <div>
                    <p className="text-white text-lg font-medium italic">
                      "Precision you can build on."
                    </p>
                    <p className="text-white/40 text-xs mt-2">— Lead Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
