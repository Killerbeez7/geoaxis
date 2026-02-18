export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const FOOTER_SECTION: FooterSection[] = [
  {
    title: "Бързи линкиве",
    links: [
      { label: "Начало", href: "/" },
      { label: "Услуги", href: "/services" },
      { label: "Проекти", href: "/projects" },
      { label: "Контакти", href: "/contacts" },
    ],
  },
  {
    title: "Услуги",
    links: [
      { label: "Трасиране", href: "/services#trasirane" },
      { label: "Кадастрално заснемане", href: "/services#kadastralno" },
      { label: "Ситуационни планове", href: "/services#situacionni" },
      { label: "Консултации", href: "/services#konsultacii" },
    ],
  },
];
