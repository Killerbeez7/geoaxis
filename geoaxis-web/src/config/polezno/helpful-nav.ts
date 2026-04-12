export type HelpfulNavItem = {
  slug: string;
  label: string;
  href: string;
  description?: string;
};

export const HELPFUL_NAV_ITEMS: readonly HelpfulNavItem[] = [
  {
    slug: "statii",
    label: "Статии",
    href: "/polezno/statii",
    description: "Практически теми и обяснения",
  },
  {
    slug: "faq",
    label: "Въпроси и отговори",
    href: "/polezno/faq",
    description: "Кратки отговори на често задавани въпроси",
  },
  {
    slug: "rechnik",
    label: "Речник",
    href: "/polezno/rechnik",
    description: "Основни термини в геодезията и кадастъра",
  },
  {
    slug: "resursi",
    label: "Полезни ресурси",
    href: "/polezno/resursi",
    description: "Институции, справки и външни източници",
  },
  {
    slug: "rakovodstva",
    label: "Ръководства",
    href: "/polezno/rakovodstva",
    description: "По-подробни насоки и материали",
  },
] as const;
