export const HELPFUL_SECTION_SLUGS = [
  "statii",
  "rakovodstva",
  "faq",
  "rechnik",
  "resursi",
] as const;

export type HelpfulSectionSlug = (typeof HELPFUL_SECTION_SLUGS)[number];

export type HelpfulNavItem = {
  slug: HelpfulSectionSlug;
  label: string;
  shortLabel: string;
  href: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  seo: {
    title: string;
    description: string;
  };
};

export const HELPFUL_NAV_ITEMS: readonly HelpfulNavItem[] = [
  {
    slug: "statii",
    label: "Статии",
    shortLabel: "Статии",
    href: "/polezno/statii",
    description:
      "По-подробни теми за имоти, кадастър, ПУП и геодезически услуги в реални ситуации.",
    heroTitle: "Статии за геодезия и имоти",
    heroDescription:
      "Тук разглеждаме въпросите, които най-често създават объркване — какво е нужно преди строителство, кога се прави заснемане, как се работи с кадастъра и какво да проверите при имот.",
    seo: {
      title: "Статии за геодезия, кадастър и имоти",
      description:
        "Статии за кадастър, ПУП, геодезическо заснемане, трасиране и практически казуси при имоти, строителство и проектиране.",
    },
  },
  {
    slug: "rakovodstva",
    label: "Ръководства",
    shortLabel: "Ръководства",
    href: "/polezno/rakovodstva",
    description:
      "Практични стъпки за документи, строителство и избор на геодезическа услуга.",
    heroTitle: "Ръководства за подготовка",
    heroDescription:
      "Подредени насоки за строеж, сделка или административна процедура без излишна терминология.",
    seo: {
      title: "Ръководства за имоти и строителство",
      description:
        "Ръководства за документи, строителни процедури и избор на геодезическа услуга. Подредени стъпки за по-лесна подготовка на проекта.",
    },
  },
  {
    slug: "faq",
    label: "Въпроси и отговори",
    shortLabel: "FAQ",
    href: "/polezno/faq",
    description: "Кратки отговори на най-честите въпроси преди геодезическа услуга.",
    heroTitle: "Често задавани въпроси",
    heroDescription:
      "Кратки отговори за заснемане, трасиране, кадастър, документи и работа на терен.",
    seo: {
      title: "Въпроси и отговори за геодезически услуги",
      description:
        "Често задавани въпроси за заснемане, трасиране, кадастър, проектиране и документи. Кратки отговори за имоти и строителство.",
    },
  },
  {
    slug: "rechnik",
    label: "Речник",
    shortLabel: "Речник",
    href: "/polezno/rechnik",
    description: "Основни термини в геодезията, кадастъра и устройствените процедури.",
    heroTitle: "Речник на термините",
    heroDescription:
      "Кратки обяснения на думи и съкращения от скици, проекти, ПУП и кадастрални услуги.",
    seo: {
      title: "Речник по геодезия и кадастър",
      description:
        "Кратък речник с важни термини като ПУП, УПИ, кадастрална карта, скица, схема, трасиране и вертикална планировка.",
    },
  },
  {
    slug: "resursi",
    label: "Полезни ресурси",
    shortLabel: "Ресурси",
    href: "/polezno/resursi",
    description:
      "Списъци с документи, проверки и подготовка преди оглед, проект или процедура.",
    heroTitle: "Практични ресурси",
    heroDescription:
      "Кратки списъци за документи, оглед, кадастрална услуга, ПУП и подготовка преди строителство.",
    seo: {
      title: "Ресурси за документи и геодезически услуги",
      description:
        "Полезни списъци с документи за заснемане, кадастър, ПУП, оглед и подготовка преди строителство или проект.",
    },
  },
] as const;

export function getHelpfulNavItem(slug: string) {
  return HELPFUL_NAV_ITEMS.find((item) => item.slug === slug);
}
