"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, animate, useInView, useMotionValue } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { siteContent } from "@/config/site-content";

/* ============ ANIMATIONS ============ */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const scaleUp = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/* ============ STATS COUNTER ============ */

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

/* ============ MAIN ============ */

export function WhyChooseUs() {
  const stats = siteContent.stats;

  return (
    <Section tone="brand" className="overflow-hidden">
      {/* ---- Text + Image ---- */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="max-w-xl text-center md:text-left"
        >
          <span className="typo-kicker">Кои сме ние</span>

          <h2 className="mt-2 typo-h2 text-tx-inverse">
            Защо да изберете <span className="text-accent">{siteContent.brand.name}</span>
          </h2>

          <div className="mt-4 space-y-4">
            <p className="typo-body text-tx-inverse/85">
              Работим в областта на геодезията от 2008 година и през годините сме
              преминали през множество различни казуси и ситуации на терен.
            </p>

            <p className="typo-body text-tx-inverse/85">
              Този опит ни е помогнал да изградим подреден и ефективен начин на работа,
              който дава точност, яснота и сигурност във всяка стъпка от процеса.
            </p>

            <p className="typo-body text-tx-inverse/85">
              Използваме съвременна геодезическа техника и софтуер, които позволяват
              измервания с изключително висока точност и надеждни резултати за всеки
              обект.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <div className="relative mx-auto w-full max-w-2xl self-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            variants={scaleUp}
            className={clsx(
              "relative ml-auto w-full lg:w-[90%] overflow-hidden rounded-3xl",
              // "border border-white/10 bg-white/5",
              "shadow-[0_18px_50px_-24px_rgba(0,0,0,0.25)]"
            )}
          >
            <div className="relative aspect-4/3">
              <Image
                src="/images/9.jpeg"
                alt="Геодезическа работа на терен"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-black/30 mix-blend-color" />
          </motion.div>

          <div className="hidden h-8 lg:block" />
        </div>
      </div>

      {/* ---- Stats row ---- */}
      <div className="mt-16 pt-10 border-t border-white/10">
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
              <div className="text-3xl font-semibold tracking-tight text-tx-inverse sm:text-4xl">
                <CountUpNumber value={s.number} />
              </div>

              <div className="mt-2 text-[12px] font-medium text-tx-inverse/85 sm:text-[13px]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
