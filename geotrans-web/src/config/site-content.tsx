// ========== HERO ==========
export interface HeroContent {
  title: string;
  subtitle: string;
  kicker?: string;
  image: string;
  cta?: {
    label: string;
    href: string;
    content: string;
  };
}
const hero: HeroContent = {
  title: "Геодезия с точност, || на която || можеш да разчиташ.",
  subtitle:
    "Трасиране на имоти, кадастрални заснемания и геодезически услуги, изпълнени прецизно и съобразени с всички нормативни изисквания.",
  kicker: "Лицензирани геодезисти • София и област • Точни срокове",
  image: "/images/HeroImg.jpg",
  cta: {
    label: "Свържи се",
    href: "/contacts",
    content: "Виж услуги →",
  },
};

// ========== SERVICES ==========
export interface ServicesProps {
  title: string;
  subtitle: string;
}
const services: ServicesProps = {
  title: "Геодезически услуги",
  subtitle: "Цялостни решения за измерване, заснемане и трасиране.",
};

// ========== CONTACTS ==========
export interface ContactsContent {
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  mapsUrl: string;
}
const contacts: ContactsContent = {
  title: "Свържете се с нас",
  subtitle: "Готови сме да съдействаме за вашия проект.",
  phone: "+359 98 831 6263",
  email: "tonitrans08@abv.bg",
  address: "1618 bul Bulgaria||Sofia, Bulgaria",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sofia%2C+Bulgaria",
};

// ========== SERVICE LINKS ==========
export type Service = {
  href: string;
  slug: string;
  title: string;
  thumbnail: string;
  description: string;
  icon?: string;
  neededWhen: string[];
  requiredDocs: string[];
  deliverables: string[];
};

const serviceLinks: Service[] = [
  {
    href: "/services/geodezichesko-zasnemane",
    slug: "geodezichesko-zasnemane",
    title: "Геодезическо заснемане",
    thumbnail: "/images/tripod.jpg",
    description:
      "Заснемане на терени и обекти за проектиране, строителство и документация.",
    neededWhen: [
      "Преди строителство или реконструкция",
      "За изработване на ПУП или инвестиционен проект",
      "Определяне на граници на имоти",
    ],
    requiredDocs: [
      "Документ за собственост (ако е приложимо)",
      "Налични скици/проекти (ако има)",
      "Адрес/идентификатор на имота (ако е наличен)",
    ],
    deliverables: [
      "Геодезически чертеж/ситуация",
      "Цифрови файлове (по договорка)",
      "Протокол от измерването",
      "Материали, готови за използване при проектиране/съгласуване",
    ],
  },
  {
    href: "/services/trasirane",
    slug: "trasirane",
    title: "Трасиране на имоти",
    thumbnail: "/images/trasirane.jpg",
    description: "Пренасяне на проектни точки/оси на терен и контролни измервания.",
    neededWhen: [
      "Трасиране на оси и контури на сгради",
      "Трасиране на граници, линии и елементи",
      "Контролни измервания по време на строителство",
    ],
    requiredDocs: ["Проект/чертеж (ако има)", "Задание/изисквания за трасиране"],
    deliverables: ["Трасиране на място", "Протокол/отчет (ако е необходим)"],
  },
  {
    href: "/services/kadastar",
    slug: "kadastar",
    title: "Кадастър",
    thumbnail: "/images/kadastyr.jpg",
    description: "Подготовка на материали и съдействие при кадастрални процедури.",
    neededWhen: [
      "Поправки/актуализации в КККР",
      "Нанасяне/промяна на обекти в кадастъра",
      "Скици/схеми и процедури към институции",
    ],
    requiredDocs: [
      "Документ за собственост",
      "Налични скици/схеми (ако има)",
      "Идентификатор/адрес",
    ],
    deliverables: [
      "Подготвени материали за процедура",
      "Съдействие по етапите (по договорка)",
    ],
  },
  {
    href: "/services/vertikalna-planirovka",
    slug: "vertikalna-planirovka",
    title: "Вертикална планировка",
    thumbnail: "/images/vertical_plan.jpg",
    description: "Решения за коти, наклони и отводняване според терена и проекта.",
    neededWhen: [
      "Нови сгради и дворове",
      "Реконструкции и благоустройство",
      "Отводняване и наклони",
    ],
    requiredDocs: [
      "Геодезическо заснемане (или възлагане към нас)",
      "Архитектурни данни (ако има)",
    ],
    deliverables: [
      "План/чертеж вертикална планировка",
      "Коти/наклони и обяснения (по договорка)",
    ],
  },
  {
    href: "/services/proektirane",
    slug: "proektirane",
    title: "Проектиране",
    thumbnail: "/images/proektirane.png",
    description:
      "Проектантски услуги, свързани с геодезия и устройствени решения (по обхват).",
    neededWhen: [
      "Инвестиционни намерения",
      "Подготовка за съгласуване",
      "Комбинирани услуги",
    ],
    requiredDocs: [
      "Изходни данни за имота/обекта",
      "Задание/изисквания",
      "Налични материали (ако има)",
    ],
    deliverables: [
      "Проектни материали по договорка",
      "Координация с други части (ако е приложимо)",
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  serviceLinks.find((s) => s.slug === slug);

// ========== WORKFLOW ==========
export interface WorkflowStep {
  title: string;
  subtitle: string;
}

export interface WorkflowContent {
  title: string;
  subtitle: string;
  steps: WorkflowStep[];
}

const workflow: WorkflowContent = {
  title: "Как протича работният процес",
  subtitle: "Ясни стъпки. Прецизно изпълнение. Навременни резултати.",
  steps: [
    {
      title: "Консултация",
      subtitle:
        "Анализ на казуса и уточняване на необходимата документация и обхват на услугата.",
    },
    {
      title: "Оглед и измерване",
      subtitle: "Точно геодезическо заснемане с професионална апаратура.",
    },
    {
      title: "Обработка на данни",
      subtitle: "Прецизна обработка и изготвяне на необходимите планове и документи.",
    },
    {
      title: "Предаване на документация",
      subtitle:
        "Предоставяне на готовите материали, съобразени с нормативните изисквания.",
    },
  ],
};

// ========== STATS ==========
export interface StatItem {
  number: string;
  label: string;
}

export const stats: StatItem[] = [
  { number: "574+", label: "Завършени проекта" },
  { number: "15+", label: "Години опит" },
  { number: "100%", label: "Точност" },
  { number: "28+", label: "Корпоративни клиента" },
];

// ========== WHY US ==========
export interface WhyUsContent {
  title: string;
  subtitle: string;
  points: string[];
}

const whyUs: WhyUsContent = {
  title: "Защо да изберете нас",
  subtitle: "Комбинираме опит, прецизност и коректност във всяка услуга.",
  points: [
    "Висока точност и съвременна измервателна техника",
    "Познаване на кадастралното и регулационно законодателство",
    "Бързи срокове и яснота в процеса",
    "Индивидуален подход към всеки клиент",
  ],
};

// ========== CLIENTS ==========
export interface ClientsContent {
  title: string;
  list: string[];
}

const clients: ClientsContent = {
  title: "Работим за",
  list: [
    "Частни собственици на имоти",
    "Инвеститори и строителни фирми",
    "Архитекти и проектанти",
    "Нотариуси и адвокати",
    "Общини и институции",
  ],
};

// ========== PROJECTS ==========
export type ProjectsContent = {
  id: string | number;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  blurDataURL?: string;
};

const projects: ProjectsContent[] = [
  {
    id: 1,
    src: "/images/tripod.jpg",
    alt: "Геодезическо заснемане на земеделски терен с GNSS",
    caption: "Точно определяне на граници върху 120 дка земеделска земя",
    category: "Заснемане",
  },
  {
    id: 2,
    src: "/images/trasirane.jpg",
    alt: "Работа с тотална станция на строителен обект",
    caption: "Трасиране на регулационни линии за нов строеж",
    category: "Трасиране",
  },
];

export const siteContent = {
  hero,
  services,
  contacts,
  serviceLinks,
  workflow,
  whyUs,
  clients,
  stats,
  projects,
} as const;
