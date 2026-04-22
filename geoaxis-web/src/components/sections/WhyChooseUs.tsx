"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, animate, useInView, useMotionValue } from "framer-motion";
import { Section } from "@/components/layout/Section";
import type { WhyUsContent } from "@/config/content/why-us";

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

/* ============ ОБНОВЕН MAIN КОМПОНЕНТ ============ */

export function WhyChooseUs({
  id,
  title,
  subtitle,
  paragraphs,
  kicker,
  brandName,
  image,
  imageAlt,
}: WhyUsContent) {
  return (
    <Section id={id} tone="brand" className="overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Текстова колона */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="text-left"
        >
          {kicker && (
            <span className="typo-kicker text-accent/90 brightness-110 inline-block border-b border-accent/40 pb-2">
              {kicker}{" "}
              {/* <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-accent/30 rounded-full" /> */}
            </span>
          )}

          <h2 className="mt-3 typo-h2 text-tx-inverse lg:text-4xl lg:leading-[1.15] text-left">
            {title}{" "}
            <span className="relative inline-block text-accent">
              {brandName}
              {/* <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-accent/30 rounded-full" /> */}
            </span>
          </h2>

          {/* {subtitle && (
            <p className="mt-4 text-lg font-medium leading-relaxed text-tx-inverse/90 text-left">
              {subtitle}
            </p>
          )} */}

          <div className={clsx("space-y-5 text-left", subtitle ? "mt-4" : "mt-8")}>
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="typo-body text-tx-inverse/80">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Колона с изображение */}
        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            variants={scaleUp}
            className={clsx(
              "relative ml-auto w-full overflow-hidden rounded-3xl lg:w-[95%] group",
              "shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-white/10",
              "transition-transform hover:scale-110 duration-1000"
            )}
          >
            <div className="relative aspect-4/3 lg:aspect-5/4">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Градиент за дълбочина вместо плосък цвят */}
              <div className="absolute inset-0 bg-linear-to-tr from-brand-olive-900/40 via-transparent to-accent/5" />
            </div>
          </motion.div>

          {/* Декоративно сияние зад снимката */}
          <div className="absolute -bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
        </div>
      </div>
    </Section>
  );
}
