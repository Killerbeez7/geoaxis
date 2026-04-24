"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import type { WhyUsContent } from "@/config/content/why-us";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const scaleUp = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

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
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Text - left side */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="text-left"
        >
          {kicker && (
            <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
              {kicker}{" "}
            </p>
          )}

          <h2 className="typo-h2 mt-1 text-tx-inverse md:mt-2">
            {title} <span className="relative inline-block text-accent">{brandName}</span>
          </h2>

          {/* {subtitle && (
            <p className="mt-4 text-lg font-medium leading-relaxed text-tx-inverse/90 text-left">
              {subtitle}
            </p>
          )} */}
          {/* <p className="typo-subtitle mt-2 md:mt-4 max-w-2xl mx-0 md:mx-auto whitespace-normal md:whitespace-pre-line"></p> */}
          {subtitle && (
            <p className="mt-4 max-w-xl text-base leading-7 text-tx-inverse/82">
              {subtitle}
            </p>
          )}

          <div className={clsx("space-y-4 text-left", "mt-5 md:mt-7")}>
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base leading-8 text-tx-inverse/78">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Image - Right side */}
        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            variants={scaleUp}
            className={clsx(
              "group relative ml-auto w-full overflow-hidden rounded-card lg:w-[95%]",
              "border border-white/10 shadow-2xl shadow-black/20"
            )}
          >
            <div className="relative aspect-4/3 lg:aspect-5/4">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
