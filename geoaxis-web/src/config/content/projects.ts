export type ProjectItem = {
  id: string | number;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  blurDataURL?: string;
};

export type ProjectsContent = {
  id: "projects";
  kicker?: string;
  title: string;
  subtitle: string;
  cta: {
    label: string;
    href: string;
    content: string;
  };
  items: ProjectItem[];
};

export const projects: ProjectsContent = {
  id: "projects",
  kicker: "Проекти",
  title: "Завършени обекти",
  subtitle: "Подбрани примери от реализирани геодезически и кадастрални дейности.",
  cta: {
    label: "Всички проекти",
    href: "/projects",
    content: "Виж услуги →",
  },
  items: [
    {
      id: 1,
      src: "/images/projects/project-1.webp",
      alt: "Геодезическо заснемане на земеделски терен с GNSS апаратура",
      caption:
        "Прецизно определяне на граници и заснемане на 120 дка земеделска земя с GNSS технология.",
      category: "Геодезическо заснемане",
    },
    {
      id: 2,
      src: "/images/projects/project-2.jpg",
      alt: "Трасиране на строителен обект с тотална станция",
      caption:
        "Трасиране на регулационни линии и оси за ново строителство с тотална станция.",
      category: "Трасиране",
    },
    {
      id: 3,
      src: "/images/projects/project-3.jpg",
      alt: "Кадастрална процедура за нанасяне на сграда в кадастъра",
      caption:
        "Подготовка и изготвяне на документи за нанасяне на новоизградена сграда в кадастъра.",
      category: "Кадастрални услуги",
    },
    {
      id: 4,
      src: "/images/projects/project-4.webp",
      alt: "Вертикална планировка на двор и прилежащ терен",
      caption:
        "Изготвяне на вертикална планировка за жилищен имот с решение за наклони и отводняване.",
      category: "Вертикална планировка",
    },
    {
      id: 5,
      src: "/images/projects/project-5.jpg",
      alt: "Проектантски услуги и координация на геодезически данни",
      caption:
        "Изготвяне на проектни материали и координация с други части по инвестиционен проект.",
      category: "Проектиране",
    },
    {
      id: 6,
      src: "/images/projects/project-6.jpg",
      alt: "Контролни геодезически измервания на строителен обект",
      caption:
        "Контролни измервания и проверка на изпълнението по време на строителен процес.",
      category: "Контролни измервания",
    },
  ],
} as const;
