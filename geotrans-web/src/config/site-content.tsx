// ======================================== BRAND ========================================
export interface BrandContent {
  name: string;
  tagline: string;
  metaLine: string;
}

const brand: BrandContent = {
  name: "GeoTrans",
  // tagline: "Прецизни геодезически услуги, ясни срокове и надеждна документация.",
  tagline:
    "Геодезически услуги в София и Софийска област - прецизност, ясни срокове и надеждна документация.",
  metaLine: "София • Софийска област • По договаряне",
};

// ======================================== HERO ========================================
export interface HeroContent {
  id: "hero";
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
  id: "hero",
  title: "Геодезия с точност, || на която || можеш да разчиташ.",
  subtitle:
    "Геодезическо заснемане, трасиране и кадастрални услуги в София и Софийска област, изпълнени прецизно и съобразени с нормативните изисквания.",
  kicker: "Лицензирани геодезисти • София и област • Точни срокове",
  image: "/images/sections/hero-img.jpg",
  cta: {
    label: "Свържи се",
    href: "/contacts",
    content: "Виж услуги →",
  },
};

// ======================================== SERVICES ========================================
export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  ogImage?: string;
  description: string;
  neededWhen: string[];
  requiredDocs: string[];
  deliverables: string[];
  icon?: string;
  featured?: boolean;
};

export interface ServicesContent {
  id: "services";
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

const services: ServicesContent = {
  id: "services",
  title: "Геодезически услуги",
  subtitle:
    "Професионални геодезически и кадастрални услуги в София - от заснемане и трасиране до проектантски решения.",

  items: [
    {
      id: "surveying",
      slug: "geodezichesko-zasnemane",
      title: "Геодезическо заснемане",
      thumbnail: "/images/services/geodezichesko-zasnemane-thumb.jpg",
      ogImage: "/images/services/geodezichesko-zasnemane-og.jpg",
      description:
        "Прецизно геодезическо заснемане на терени и обекти в София и региона за проектиране, строителство и изготвяне на техническа документация.",

      neededWhen: [
        "Преди строителство, реконструкция или узаконяване",
        "За изработване на ПУП и/или инвестиционен проект",
        "При уточняване на имотни граници и съществуващо положение",
        "Когато ти е нужна надеждна основа за проектант или институция",
      ],
      requiredDocs: [
        "Документ за собственост (ако е приложимо)",
        "Скица/схема/проект или други налични материали (ако има)",
        "Точен адрес и/или идентификатор на имота",
      ],
      deliverables: [
        "Чертеж/ситуация на съществуващото положение",
        "Цифрови файлове във формат по договорка (DWG/PDF и др.)",
        "Протокол от измерванията (при необходимост)",
        "Материали, готови за използване при проектиране и съгласуване",
      ],
      featured: true,
    },
    {
      id: "staking-out",
      slug: "trasirane",
      title: "Трасиране и контролни измервания",
      thumbnail: "/images/services/trasirane-thumb.jpg",
      ogImage: "/images/services/trasirane-og.png",
      description:
        "Точно пренасяне на проектни оси, точки и контури на терен и контрол на изпълнението — за да се строи по проект и в допуските.",
      neededWhen: [
        "При започване на строителство - трасиране на оси и контури",
        "При трасиране на граници, линии и елементи по проект",
        "При контролни измервания и проверка на изпълненото",
        "Когато се изисква протокол за трасиране/контрол",
      ],
      requiredDocs: [
        "Проект/чертеж или координатен списък (ако е наличен)",
        "Задание и изисквания за точност/допуски",
      ],
      deliverables: [
        "Маркировка на терен и трасиране на място",
        "Контролни измервания по етапи (при необходимост)",
        "Протокол/отчет за извършеното трасиране (по договорка)",
      ],
      featured: true,
    },
    {
      id: "cadastre",
      slug: "kadastar",
      title: "Кадастрални услуги",
      thumbnail: "/images/services/kadastyr-thumb.jpg",
      ogImage: "/images/services/kadastyr-og.png",
      description:
        "Кадастрални услуги и съдействие по процедури към АГКК за имоти в София и региона.",
      neededWhen: [
        "При попълване, корекции или актуализации в КККР",
        "При нанасяне/промяна на сгради, самостоятелни обекти или граници",
        "При изготвяне на материали за административни процедури",
        "Когато има несъответствия между документи и кадастър",
      ],
      requiredDocs: [
        "Документ за собственост",
        "Налични скици/схеми, проекти или предходни материали (ако има)",
        "Идентификатор и/или точен адрес на имота/обекта",
      ],
      deliverables: [
        "Подготвени материали за процедурата според случая",
        "Съдействие и комуникация по етапите (по договорка)",
        "Ясни указания какво следва, ако има допълнителни изисквания",
      ],
      featured: true,
    },
    {
      id: "grading",
      slug: "vertikalna-planirovka",
      title: "Вертикална планировка",
      thumbnail: "/images/services/vertical_plan-thumb.jpg",
      ogImage: "/images/services/vertical_plan-og.png",
      description:
        "Решения за коти, наклони и отводняване, съобразени с терена и проекта — за функционални площи и правилно водоотвеждане.",
      neededWhen: [
        "При ново строителство – дворове, алеи, паркоместа и прилежащи площи",
        "При реконструкции и благоустройство на терени",
        "При проблеми с наклони и отводняване",
        "Когато е нужна ясна котирана схема за изпълнение",
      ],
      requiredDocs: [
        "Геодезическо заснемане (или възлагане към нас)",
        "Архитектурни/проектни данни (ако са налични)",
        "Изисквания за настилки, рампи, отводняване и нива (ако има)",
      ],
      deliverables: [
        "План/чертеж за вертикална планировка",
        "Коти и наклони за изпълнение",
        "Кратки пояснения/детайли според договорения обхват",
      ],
      featured: true,
    },
    {
      id: "design",
      slug: "proektirane",
      title: "Проектантски услуги",
      thumbnail: "/images/services/proektirane-thumb.jpg",
      ogImage: "/images/services/proektirane-og.png",
      description:
        "Проектантски услуги, свързани с геодезия и устройствени решения — с ясни входни данни, координация и материали според обхвата на проекта.",
      neededWhen: [
        "При инвестиционни намерения и подготовка за проектиране",
        "При нужда от координация между части и изходни данни",
        "При комбинирани услуги (заснемане, планировка, процедури)",
        "Когато искаш един изпълнител да държи процеса под контрол",
      ],
      requiredDocs: [
        "Изходни данни за имота/обекта (идентификатор, адрес, налични материали)",
        "Задание за обхват и цели",
        "Налични проекти/скици (ако има)",
      ],
      deliverables: [
        "Проектни материали според договорения обхват",
        "Координация и консултации по процеса (при необходимост)",
        "Ясно описание на следващите стъпки, ако има съгласуване",
      ],
      featured: true,
    },
  ],
};

// ======================================== CONTACTS ========================================
export interface ContactsContent {
  id: "contacts";
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  mapsUrl: string;
}

const contacts: ContactsContent = {
  id: "contacts",
  title: "Свържи се",
  subtitle: "Имаш въпрос или нужда от услуга? Свържи се с нас и ще ти съдействаме.",
  phone: "+359 98 831 6263",
  email: "tonitrans08@abv.bg",
  address: "1618 бул. България||София, България",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sofia%2C+Bulgaria",
};

// ======================================== WORKFLOW ========================================
export interface WorkflowStep {
  title: string;
  description: string;
}

export interface WorkflowContent {
  id: "workflow";
  title: string;
  subtitle: string;
  steps: WorkflowStep[];
}

const workflow: WorkflowContent = {
  id: "workflow",
  title: "Как протича процесът",
  subtitle:
    "От първия разговор до готовата документация – ясно, организирано и без излишни усложнения.",
  steps: [
    {
      title: "Консултация",
      description:
        "Разглеждаме случая, уточняваме необходимите документи и определяме точния обхват на услугата.",
    },
    {
      title: "Оглед и измерване",
      description:
        "Извършваме прецизно геодезическо заснемане на място със съвременна апаратура.",
    },
    {
      title: "Обработка и изготвяне",
      description:
        "Обработваме данните и подготвяме необходимите планове, чертежи и документация.",
    },
    {
      title: "Предаване на документация",
      description:
        "Предоставяме готовите материали и оставаме на разположение при последващи въпроси.",
    },
  ],
};

// ======================================== STATS ========================================
export interface StatItem {
  number: string;
  label: string;
}

export const stats: StatItem[] = [
  { number: "574+", label: "Реализирани проекта" },
  { number: "15+", label: "Години опит" },
  { number: "100%", label: "Гарантирана точност" },
  { number: "375+", label: "Доволни клиенти" },
];

// ======================================== WHY US ========================================
export interface WhyUsContent {
  id: "why-us";
  title: string;
  subtitle: string;
  points: string[];
}

const whyUs: WhyUsContent = {
  id: "why-us",
  title: "Защо да избереш нас",
  subtitle:
    "Работим основно в София и Софийска област, с фокус върху точност, яснота и отговорност към всеки проект.",
  points: [
    "Прецизни измервания със съвременна геодезическа апаратура",
    "Опит в кадастрални и регулационни процедури",
    "Спазени срокове и прозрачност на всяка стъпка",
    "Лично отношение и реална ангажираност към проекта ти",
  ],
};

// ======================================== CLIENTS ========================================
export interface ClientsContent {
  id: "clients";
  title: string;
  list: string[];
}

const clients: ClientsContent = {
  id: "clients",
  title: "Работим с",
  list: [
    "Частни собственици на имоти",
    "Инвеститори и строителни фирми",
    "Архитекти и проектантски бюра",
    "Нотариуси, адвокати и консултанти",
    "Общини и държавни институции",
  ],
};

// ======================================== PROJECTS ========================================
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
  title: string;
  subtitle: string;
  items: ProjectItem[];
};

const projects: ProjectsContent = {
  id: "projects",
  title: "Завършени проекти",
  subtitle: "Част от успешно завърпените ни проекти",

  items: [
    {
      id: 1,
      src: "/images/services/tripod.jpg",
      alt: "Геодезическо заснемане на земеделски терен с GNSS апаратура",
      caption:
        "Прецизно определяне на граници и заснемане на 120 дка земеделска земя с GNSS технология.",
      category: "Геодезическо заснемане",
    },
    {
      id: 2,
      src: "/images/services/trasirane.jpg",
      alt: "Трасиране на строителен обект с тотална станция",
      caption:
        "Трасиране на регулационни линии и оси за ново строителство с тотална станция.",
      category: "Трасиране",
    },
    {
      id: 3,
      src: "/images/services/kadastyr.jpg",
      alt: "Кадастрална процедура за нанасяне на сграда в кадастъра",
      caption:
        "Подготовка и изготвяне на документи за нанасяне на новоизградена сграда в кадастъра.",
      category: "Кадастрални услуги",
    },
    {
      id: 4,
      src: "/images/services/vertical_plan.jpg",
      alt: "Вертикална планировка на двор и прилежащ терен",
      caption:
        "Изготвяне на вертикална планировка за жилищен имот с решение за наклони и отводняване.",
      category: "Вертикална планировка",
    },
    {
      id: 5,
      src: "/images/services/proektirane.png",
      alt: "Проектантски услуги и координация на геодезически данни",
      caption:
        "Изготвяне на проектни материали и координация с други части по инвестиционен проект.",
      category: "Проектиране",
    },
    {
      id: 6,
      src: "/images/services/tripod.jpg",
      alt: "Контролни геодезически измервания на строителен обект",
      caption:
        "Контролни измервания и проверка на изпълнението по време на строителен процес.",
      category: "Контролни измервания",
    },
  ],
};

export const siteContent = {
  brand,
  hero,
  services,
  contacts,
  workflow,
  whyUs,
  clients,
  stats,
  projects,
} as const;
