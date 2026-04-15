"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import clsx from "clsx";
import { Section } from "@/components/layout/Section";
import { siteContent } from "@/config/site-content";

function extractNumber(value: string | number) {
  const raw = String(value);
  const numeric = Number(raw.replace(/[^\d]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

function extractSuffix(value: string | number) {
  const raw = String(value);
  const match = raw.match(/[^\d\s]+$/);
  return match ? match[0] : "";
}

function CountUpNumber({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const target = extractNumber(value);
  const suffix = extractSuffix(value);

  const motionValue = useMotionValue(target);
  const [displayValue, setDisplayValue] = useState(target);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [motionValue]);

  useEffect(() => {
    if (!isInView) return;

    motionValue.jump(0);

    const controls = animate(motionValue, target, {
      duration: target >= 1000 ? 1.8 : 1.2,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [isInView, motionValue, target]);

  return (
    <span ref={ref} className={className}>
      {displayValue.toLocaleString("bg-BG")}
      {suffix && <span className="ml-1 text-accent">{suffix}</span>}
    </span>
  );
}

export function Stats() {
  const stats = siteContent.stats;

  return (
    <Section tone="muted" className="pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="typo-kicker">Доказани резултати</p>
        <h2 className="mt-3 typo-h3">Прецизност във всеки детайл</h2>
      </div>

      <div className="relative mt-10 md:mt-12">
        <div
          className={clsx(
            "relative overflow-hidden rounded-[30px] border border-white/45 bg-white/65",
            "px-6 py-8 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.14)] backdrop-blur-sm",
            "sm:px-8 sm:py-10 lg:px-10 lg:py-12"
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/45 to-transparent"
          />

          <div className="relative grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6">
            {stats.map((s, i) => (
              <motion.div
                key={`${s.label}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-[2.4rem] font-semibold leading-none tracking-tight text-tx-primary sm:text-5xl lg:text-6xl">
                  <CountUpNumber value={s.number} />
                </div>

                <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-tx-muted sm:text-xs">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
