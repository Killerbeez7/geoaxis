import Link from "next/link";
import clsx from "clsx";
import { MdArrowRightAlt } from "react-icons/md";
// Config
import { serviceCategories } from "@/config/services/categories";
import { servicesVisuals } from "@/config/services/visuals";
import { pageSeo } from "@/config/seo";
// Components
import { CtaButton } from "@/components/parts/CtaButton";
import { Section } from "@/components/layout/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { createSeo } from "@/lib/seo-builder";
import {
  CategoryOverviewCard,
  SectionIntro,
  ServicesHero,
} from "./_components/ServicesUi";

export const metadata = createSeo(pageSeo.uslugiIndex);

const scenarios = [
  {
    title: "Започвате проект",
    text: "Най-често се започва със заснемане за проектиране и проверка на наличните данни.",
    href: "/uslugi/zasnemane#za-proektirane",
  },
  {
    title: "Ще строите или ограждате",
    text: "При строителство, ограда или спор за граници най-подходящо е трасиране на място.",
    href: "/uslugi/trasirane",
  },
  {
    title: "Имате кадастрален казус",
    text: "За скици, схеми, промени в кадастъра или нанасяне на сграда започнете от кадастър.",
    href: "/uslugi/kadastar",
  },
];

export default function ServicesPage() {
  const serviceCount = serviceCategories.reduce(
    (total, category) => total + category.services.length,
    0
  );

  return (
    <>
      <ServicesHero
        eyebrow="Геодезически услуги"
        title="Изберете услуга според вашия случай"
        description={`Подредихме ${serviceCategories.length} категории и ${serviceCount} конкретни услуги, за да намерите бързо правилната следваща стъпка за имот, проект или процедура.`}
        image={servicesVisuals.heroImage}
        imageAlt={servicesVisuals.heroAlt}
        imagePosition={servicesVisuals.heroPosition}
        tone="light"
      >
        <CtaButton href="/contacts" className="min-h-12 w-full sm:w-auto">
          Изпрати запитване
        </CtaButton>
      </ServicesHero>

      <Section id="categories" tone="page">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow="Категории"
            title="Всички услуги на едно място"
            description="Изберете категорията, която най-добре описва вашия казус. Вътре ще намерите конкретните услуги, необходими документи и последователност на работа."
          />
        </div>

        <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
          {serviceCategories.map((category) => (
            <CategoryOverviewCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro
          eyebrow="Бърза ориентация"
          title="Ако не знаете откъде да започнете"
          description="Тези насоки покриват най-честите случаи. Ако ситуацията е по-специфична, изпратете кратко описание и ще ви насочим."
        />

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
          {scenarios.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group rounded-card border border-br-light bg-bg-page p-5 shadow-sm",
                "transition duration-300 hover:border-br-accent-soft hover:shadow-md sm:p-6"
              )}
            >
              <h3 className="text-lg font-semibold leading-tight text-tx-primary">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-tx-muted">{item.text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">
                Виж подходящата услуга
                <MdArrowRightAlt className="text-lg transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
