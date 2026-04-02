import Link from "next/link";
import {
  FaFileAlt,
  FaQuestionCircle,
  FaMapMarkedAlt,
  FaBuilding,
  FaRulerCombined,
  FaArrowRight,
} from "react-icons/fa";

type HelpfulArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  href: string;
};

type HelpfulCategory = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const featuredArticles: HelpfulArticle[] = [
  {
    slug: "kakvo-e-geodezichesko-zasnemane",
    title: "Какво е геодезическо заснемане?",
    description:
      "Кратко и ясно обяснение кога се налага, какво включва и защо е важно за имоти, строителство и кадастър.",
    category: "Геодезия",
    href: "/polezno/kakvo-e-geodezichesko-zasnemane",
  },
  {
    slug: "kolko-struva-trasirane",
    title: "Колко струва трасиране?",
    description:
      "Основните фактори, които влияят върху цената на трасирането и как да прецените каква услуга ви е нужна.",
    category: "Трасиране",
    href: "/polezno/kolko-struva-trasirane",
  },
  {
    slug: "kakvi-dokumenti-za-kadastar",
    title: "Какви документи са нужни за кадастър?",
    description:
      "Практичен списък с най-често необходимите документи при нанасяне, промени и процедури в кадастъра.",
    category: "Кадастър",
    href: "/polezno/kakvi-dokumenti-za-kadastar",
  },
];

const latestArticles: HelpfulArticle[] = [
  {
    slug: "koga-vi-tryabva-geodezist",
    title: "Кога ви трябва геодезист?",
    description:
      "Най-честите ситуации, в които професионалната геодезическа помощ спестява време, грешки и разходи.",
    category: "Полезно",
    href: "/polezno/koga-vi-tryabva-geodezist",
  },
  {
    slug: "razlika-mezhdu-kadastar-i-regulacia",
    title: "Разлика между кадастър и регулация",
    description:
      "Две понятия, които често се бъркат. Вижте каква е разликата и кога всяко от тях има значение.",
    category: "Градоустройство",
    href: "/polezno/razlika-mezhdu-kadastar-i-regulacia",
  },
  {
    slug: "kakvo-e-pup",
    title: "Какво е ПУП?",
    description:
      "Кратко ръководство за подробния устройствен план, кога се изисква и каква е връзката му със строителството.",
    category: "ПУП",
    href: "/polezno/kakvo-e-pup",
  },
];

const categories: HelpfulCategory[] = [
  {
    title: "Геодезия",
    description: "Заснемане, измервания, имоти и основни геодезически услуги.",
    href: "/polezno/kategoria/geodezia",
    icon: <FaMapMarkedAlt className="h-5 w-5" />,
  },
  {
    title: "Кадастър",
    description: "Документи, процедури, нанасяне и често задавани въпроси.",
    href: "/polezno/kategoria/kadastar",
    icon: <FaBuilding className="h-5 w-5" />,
  },
  {
    title: "Трасиране",
    description: "Какво представлява, кога е нужно и как протича на терен.",
    href: "/polezno/kategoria/trasirane",
    icon: <FaRulerCombined className="h-5 w-5" />,
  },
  {
    title: "Често задавани въпроси",
    description: "Кратки и ясни отговори на най-търсените теми.",
    href: "/polezno/faq",
    icon: <FaQuestionCircle className="h-5 w-5" />,
  },
];

function ArticleCard({ article }: { article: HelpfulArticle }) {
  return (
    <Link
      href={article.href}
      className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="mb-4 inline-flex rounded-full border border-[#c9a227]/20 bg-[#c9a227]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a227]">
        {article.category}
      </div>

      <h3 className="text-xl font-semibold leading-tight text-white transition group-hover:text-[#f3c64d]">
        {article.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-white/70">{article.description}</p>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/85 transition group-hover:text-white">
        Прочети повече
        <FaArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function CategoryCard({ item }: { item: HelpfulCategory }) {
  return (
    <Link
      href={item.href}
      className="group rounded-3xl border border-white/10 bg-[#101a19]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c9a227]/30 hover:bg-[#13201f]"
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-[#f3c64d]">
        {item.icon}
      </div>

      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-7 text-white/70">{item.description}</p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#f3c64d]">
        Разгледай
        <FaArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function HelpfulHubSection() {
  return (
    <section className="bg-[#0d1514] py-20 text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a227]/20 bg-[#c9a227]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
            <FaFileAlt className="h-4 w-4" />
            Полезно
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Полезни материали, въпроси и насоки
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            Практична информация за геодезия, кадастър, трасиране и устройствени
            процедури. Съдържание, което помага на клиентите да вземат по-информирано
            решение и да намерят точната услуга по-бързо.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">Категории</h3>
              <p className="mt-2 text-sm text-white/65">
                Раздели съдържанието по теми, за да е лесно за потребителя и за Google.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((item) => (
              <CategoryCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">Последни статии</h3>
              <p className="mt-2 text-sm text-white/65">
                Кратки ръководства и практически теми с висок SEO потенциал.
              </p>
            </div>

            <Link
              href="/polezno"
              className="hidden items-center gap-2 text-sm font-medium text-[#f3c64d] md:inline-flex"
            >
              Виж всички
              <FaArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
