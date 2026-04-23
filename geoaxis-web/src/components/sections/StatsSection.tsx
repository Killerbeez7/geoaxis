"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import clsx from "clsx";
import { siteContent } from "@/config/site-content";
import { Section } from "../layout/Section";

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

  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => unsubscribe();
  }, [motionValue]);

  useEffect(() => {
    if (!isInView) return;

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
    <Section tone="muted">
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]"
        )}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-xl text-center">
          <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
            Доказани резултати
          </p>
          <h2 className="mt-1 md:mt-2 typo-h3 text-tx-primary">
            Прецизност във всеки детайл
          </h2>
        </div>

        <div
          className={clsx(
            "rounded-[28px] border border-br-light",
            "bg-bg-page/70 p-6 backdrop-blur-sm md:p-8",
            "mt-8 md:mt-12"
          )}
        >
          <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
            {stats.map((s, i) => (
              <motion.div
                key={`${s.label}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="px-2 text-center lg:px-4"
              >
                <div className="text-4xl font-semibold tracking-tight text-tx-primary md:text-5xl lg:text-6xl">
                  <CountUpNumber value={s.number} />
                </div>

                <div className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-tx-muted">
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
