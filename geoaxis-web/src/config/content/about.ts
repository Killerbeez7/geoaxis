import { brand } from "./brand";

export interface AboutValueItem {
  key: "precision" | "speed" | "partnership";
  title: string;
  description: string;
}

export interface AboutContent {
  id: "about";
  title: string;
  hero: {
    intro: string;
    imageBg: string;
  };

  story: {
    title: string;
    paragraphs: string[];
    image: {
      src: string;
      alt: string;
    };
  };

  values: {
    title: string;
    intro: string;
    items: AboutValueItem[];
  };

  cta: {
    title: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export const about: AboutContent = {
  id: "about",
  title: "За нас",

  hero: {
    intro:
      `${brand.name} е компания за професионални геодезически и кадастрални услуги, ` +
      `която комбинира модерна технология, експертен опит и безкомпромисна точност. ` +
      `Работим с частни клиенти, инвеститори и строителни компании в София и Софийска област.`,
    imageBg: "/images/sections/hero-about.webp",
  },

  story: {
    title: "Нашата история",
    paragraphs: [
      `${brand.name} е основана през 2008 г. от екип лицензирани геодезисти с дългогодишен практически опит в кадастъра, регулационните процедури и инженерната геодезия. Още от самото начало поставихме фокус върху прецизността, прозрачността и коректността към клиента.`,
      `Днес реализираме проекти с различен мащаб – от заснемане и трасиране на частни имоти до участие в инфраструктурни и инвестиционни проекти. Работим със съвременна техника и софтуер, което ни позволява да гарантираме надеждни резултати във всеки етап от процеса.`,
    ],
    image: {
      src: "/images/sections/about-element.webp",
      alt: `Екипът на ${brand.name} на терен`,
    },
  },

  values: {
    title: "Нашите ценности",
    intro: "Всичко, което правим, се ръководи от тези принципи.",
    items: [
      {
        key: "precision",
        title: "Прецизност",
        description:
          "Работим с GNSS системи, тотални станции и съвременен софтуер. Всяко измерване преминава през вътрешен контрол за гарантирана точност.",
      },
      {
        key: "speed",
        title: "Срокове",
        description:
          "Процесите ни са оптимизирани за бързо изпълнение без компромис в качеството. Спазването на срокове е стандарт.",
      },
      {
        key: "partnership",
        title: "Партньорство",
        description:
          "Изграждаме доверие с ясна комуникация и професионална отговорност към всеки проект – от първия разговор до финалния документ.",
      },
    ],
  },
  cta: {
    title: "Готови ли сте да започнем?",
    text: "Ще получите бърза консултация и ясни стъпки. При нужда – среща на място.",
    buttonLabel: "Запитване",
    buttonHref: "/contacts",
  },
} as const;
