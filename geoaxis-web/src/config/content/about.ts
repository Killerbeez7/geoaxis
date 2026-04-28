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
      `${brand.name} предлага геодезически, кадастрални и проектантски услуги за частни клиенти, ` +
      `инвеститори и строителни екипи. Комбинираме работа на терен, съвременна техника и ясна комуникация, ` +
      `за да получите точни данни и подредени следващи стъпки.`,
    imageBg: "/images/sections/hero-about.webp",
  },

  story: {
    title: "Опит, изграден на терен",
    paragraphs: [
      `${brand.name} работи от 2008 г. с фокус върху точността, коректното отношение и практичните решения. Екипът ни има опит в кадастъра, регулационните процедури, инженерната геодезия и подготовката на данни за проектиране.`,
      `Днес изпълняваме задачи с различен мащаб - от заснемане и трасиране на частни имоти до съдействие по инвестиционни, устройствени и строителни процеси. Поддържаме ясен ред на работа, за да знаете какво получавате и защо е необходимо.`,
    ],
    image: {
      src: "/images/sections/about-element.webp",
      alt: `Екипът на ${brand.name} на терен`,
    },
  },

  values: {
    title: "Как работим",
    intro:
      "Добрият резултат идва от точни измервания, ясни решения и отговорност към детайла.",
    items: [
      {
        key: "precision",
        title: "Прецизност",
        description:
          "Използваме GNSS системи, тотални станции и специализиран софтуер. Всяко измерване се проверява преди да бъде предадено.",
      },
      {
        key: "speed",
        title: "Организация",
        description:
          "Уточняваме обхвата, нужните документи и срока още в началото, за да няма изненади по средата на процеса.",
      },
      {
        key: "partnership",
        title: "Отговорност",
        description:
          "Обясняваме резултатите разбираемо и оставаме на разположение при въпроси, съгласуване или следваща стъпка.",
      },
    ],
  },
  cta: {
    title: "Имате конкретен имот или казус?",
    text: "Изпратете кратко описание и ще върнем ясна насока каква услуга е подходяща и какви документи са нужни.",
    buttonLabel: "Изпрати запитване",
    buttonHref: "/contacts",
  },
} as const;
