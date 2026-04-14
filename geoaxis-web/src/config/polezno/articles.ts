export type HelpfulArticleSection = "statii" | "rakovodstva";

export type HelpfulArticleCategory =
  | "geodezia"
  | "kadastar"
  | "trasirane"
  | "gradoustroistvo"
  | "pup"
  | "polezno";

export type HelpfulArticle = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  section: HelpfulArticleSection;
  category: HelpfulArticleCategory;
  publishedAt: string;
  updatedAt?: string;
  coverImage?: string;
  keywords?: string[];
  body: string[];
};

export const HELPFUL_ARTICLES: readonly HelpfulArticle[] = [
  {
    slug: "kakvo-e-geodezichesko-zasnemane",
    title: "Какво е геодезическо заснемане?",
    excerpt: "Кратко и ясно обяснение кога се налага и защо е важно.",
    description:
      "Научете какво представлява геодезическото заснемане, кога се изисква и как помага при проектиране, строителство и кадастър.",
    section: "statii",
    category: "geodezia",
    publishedAt: "2026-04-14",
    coverImage: "/images/sections/hero-img.jpeg",
    keywords: ["геодезическо заснемане", "геодезия", "София"],
    body: [
      "Геодезическото заснемане представлява измерване и графично представяне на съществуващото положение на терена, сградите, съоръженията и характерните точки в имота.",
      "То е необходимо при проектиране, подготовка за строителство, процедури по кадастър, регулация и различни административни действия, при които се изисква точна информация за реалното състояние на място.",
      "Добре изготвеното заснемане дава надеждна основа за следващите стъпки и намалява риска от грешки, разминавания и забавяния в проекта.",
    ],
  },
  {
    slug: "kolko-struva-trasirane",
    title: "Колко струва трасиране?",
    excerpt: "Факторите, които влияят върху цената и какво да очаквате.",
    description:
      "Вижте кои фактори влияят върху цената на трасирането и как да прецените каква услуга е нужна за вашия случай.",
    section: "statii",
    category: "trasirane",
    publishedAt: "2026-04-14",
    keywords: ["трасиране", "цена трасиране", "геодезия"],
    body: [
      "Цената на трасирането зависи от вида на обекта, броя точки, сложността на терена, наличната документация и това дали се трасират граници, сграда, оси или линейни съоръжения.",
      "При по-прости случаи цената е по-ниска, но при сложни обекти, липсващи данни или необходимост от допълнителна подготовка стойността се увеличава.",
      "Най-добрият подход е първо да се уточни конкретният случай, за да се даде точна насока каква услуга е нужна и какъв е обхватът на работа.",
    ],
  },
  {
    slug: "koga-vi-tryabva-geodezist",
    title: "Кога ви трябва геодезист?",
    excerpt: "Най-честите ситуации, в които геодезистът е задължителен.",
    description:
      "Разберете в кои случаи е необходим геодезист и как професионалната помощ спестява грешки, време и разходи.",
    section: "rakovodstva",
    category: "polezno",
    publishedAt: "2026-04-14",
    keywords: ["кога трябва геодезист", "геодезически услуги"],
    body: [
      "Геодезист е нужен при заснемане на имот, трасиране, подготовка за проектиране, строителство, кадастрални процедури и случаи, в които трябва точно установяване на граници и положения.",
      "Често професионалната намеса е необходима още в началото, за да не се стигне до грешен проект, неправилно позициониране или проблеми при последващи административни процедури.",
      "Когато не сте сигурни каква услуга ви е нужна, кратка консултация обикновено е най-добрият първи ход.",
    ],
  },
] as const;

export function getArticleBySlug(slug: string) {
  return HELPFUL_ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesBySection(section: HelpfulArticleSection) {
  return HELPFUL_ARTICLES.filter((article) => article.section === section);
}
