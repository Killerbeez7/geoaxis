"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
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

function CountUpNumber({ value }: { value: string | number }) {
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
    <span ref={ref}>
      {displayValue.toLocaleString("bg-BG")}
      {suffix && <span className="text-accent">{suffix}</span>}
    </span>
  );
}

export function StatsLight() {
  const stats = siteContent.stats;

  return (
    <Section tone="muted" className="py-12 sm:py-14 lg:py-16">
      <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={`${s.label}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="text-center"
          >
            <div className="text-3xl font-semibold tracking-normal text-tx-primary sm:text-4xl">
              <CountUpNumber value={s.number} />
            </div>

            <div className="mt-2 text-[12px] font-medium text-tx-muted sm:text-[13px]">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
