import { FaExternalLinkAlt } from "react-icons/fa";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";

const pageContent = getHelpfulNavItem("resursi");

export const metadata = pageContent
  ? createSeo({
      title: pageContent.seo.title,
      description: pageContent.seo.description,
      canonical: pageContent.href,
    })
  : {};

const RESOURCE_GROUPS = [
  {
    title: "Преди геодезическа услуга",
    description:
      "Какво е добре да подготвите, преди да изпратите запитване или да се уговори оглед.",
    items: [
      "Адрес или точна локация на имота",
      "Кадастрален идентификатор, ако разполагате с такъв",
      "Скица, нотариален акт или друг наличен документ",
      "Кратко описание какво искате да се направи",
    ],
  },
  {
    title: "Преди строителство",
    description:
      "Основни проверки и документи, които често са нужни още в началото на процеса.",
    items: [
      "Проверка на имота в кадастралната карта",
      "Изясняване дали има действащ ПУП",
      "Геодезическо заснемане за проектна основа",
      "Уточняване на достъп, граници и съществуваща инфраструктура",
    ],
  },
  {
    title: "При кадастрални процедури",
    description:
      "Ориентир при промени в кадастралната карта, сгради или самостоятелни обекти.",
    items: [
      "Актуална скица или схема",
      "Документи за собственост",
      "Информация за реалното състояние на място",
      "Предходни проекти, разрешения или заснемания, ако има такива",
    ],
  },
];

const EXTERNAL_RESOURCES = [
  {
    title: "КАИС Портал",
    description:
      "Онлайн порталът на АГКК за кадастрални справки, заявления и електронни услуги.",
    href: "https://kais.cadastre.bg/",
  },
  {
    title: "Агенция по геодезия, картография и кадастър",
    description:
      "Официалният сайт на АГКК с информация за услуги, офиси, заявления и кадастрална карта.",
    href: "https://www.cadastre.bg/frontpage",
  },
  {
    title: "ГИС София",
    description:
      "Ресурс за кадастър, регулация, устройствено планиране и справки за територията на Столична община.",
    href: "https://www.gis-sofia.bg/bg/",
  },
  {
    title: "iSofMap",
    description:
      "Карта и електронни услуги, свързани със София — адреси, кадастрална карта, регулация и други слоеве.",
    href: "https://www.isofmap.bg/",
  },
  {
    title: "Закон за устройство на територията",
    description:
      "Основният закон, който урежда устройството на територията, инвестиционното проектиране и строителството.",
    href: "https://www.lex.bg/laws/ldoc/2135163904",
  },
];

export default function ResursiPage() {
  if (!pageContent) notFound();

  return (
    <main className="bg-bg-page">
      <PoleznoPlainHero
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="max-w-5xl">
          <section>
            <h2 className="text-2xl font-semibold text-tx-primary">
              Подготовка преди услуга
            </h2>

            <div className="mt-6 border-t border-br-light/60">
              {RESOURCE_GROUPS.map((group) => (
                <div
                  key={group.title}
                  className="grid gap-4 border-b border-br-light/50 py-6 md:grid-cols-[18rem_1fr] md:gap-10"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-tx-primary">
                      {group.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-tx-secondary">
                      {group.description}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-tx-secondary"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-br-light/60 pt-8">
            <h2 className="text-2xl font-semibold text-tx-primary">
              Външни справки и полезни сайтове
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-tx-secondary">
              Официални и практични ресурси за кадастър, регулация, имотни проверки и
              строителни процедури.
            </p>

            <div className="mt-6 divide-y divide-br-light/50 border-y border-br-light/60">
              {EXTERNAL_RESOURCES.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-2 py-5 transition md:grid-cols-[18rem_1fr_auto] md:gap-8"
                >
                  <h3 className="text-base font-semibold text-accent-strong">
                    {resource.title}
                  </h3>

                  <p className="text-sm leading-6 text-tx-secondary">
                    {resource.description}
                  </p>

                  <FaExternalLinkAlt className="hidden h-3.5 w-3.5 text-accent transition group-hover:translate-x-1 md:block" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </Section>
    </main>
  );
}
