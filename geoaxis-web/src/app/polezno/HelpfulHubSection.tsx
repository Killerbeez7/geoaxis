import Link from "next/link";
import clsx from "clsx";
import {
  FaFileAlt,
  FaQuestionCircle,
  FaMapMarkedAlt,
  FaBuilding,
  FaRulerCombined,
  FaArrowRight,
} from "react-icons/fa";
import { HELPFUL_NAV_ITEMS } from "@/config/polezno/helpful-nav";
import { Section } from "@/components/layout/Section";

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
    slug: "statii",
    title: "Какво е геодезическо заснемане?",
    description: "Кратко и ясно обяснение кога се налага и защо е важно.",
    category: "Геодезия",
    href: "/polezno/statii",
  },
  {
    slug: "faq",
    title: "Колко струва трасиране?",
    description: "Факторите, които влияят върху цената и какво да очаквате.",
    category: "Трасиране",
    href: "/polezno/faq",
  },
  {
    slug: "resursi",
    title: "Какви документи са нужни за кадастър?",
    description: "Списък с най-често необходимите документи.",
    category: "Кадастър",
    href: "/polezno/resursi",
  },
];

const latestArticles: HelpfulArticle[] = [
  {
    slug: "rakovodstva",
    title: "Кога ви трябва геодезист?",
    description: "Ситуации, в които геодезистът е задължителен.",
    category: "Полезно",
    href: "/polezno/rakovodstva",
  },
  {
    slug: "rechnik",
    title: "Разлика между кадастър и регулация",
    description: "Основни понятия, обяснени просто.",
    category: "Градоустройство",
    href: "/polezno/rechnik",
  },
  {
    slug: "statii",
    title: "Какво е ПУП?",
    description: "Кратко ръководство за подробния устройствен план.",
    category: "ПУП",
    href: "/polezno/statii",
  },
];

function getCategoryIcon(slug: string) {
  switch (slug) {
    case "statii":
      return <FaFileAlt className="h-5 w-5" />;
    case "faq":
      return <FaQuestionCircle className="h-5 w-5" />;
    case "rechnik":
      return <FaMapMarkedAlt className="h-5 w-5" />;
    case "resursi":
      return <FaBuilding className="h-5 w-5" />;
    case "rakovodstva":
      return <FaRulerCombined className="h-5 w-5" />;
    default:
      return <FaFileAlt className="h-5 w-5" />;
  }
}

const categories: HelpfulCategory[] = HELPFUL_NAV_ITEMS.map((item) => ({
  title: item.label,
  description: item.description ?? "",
  href: item.href,
  icon: getCategoryIcon(item.slug),
}));

const surfaceCardCls = clsx(
  "group relative rounded-[var(--radius-card)] border border-br-light bg-white",
  "p-6 shadow-sm transition-all duration-300",
  "hover:-translate-y-1 hover:border-br-default hover:shadow-md"
);

const sectionHeaderLinkCls = clsx(
  "hidden md:inline-flex items-center gap-2 rounded-full px-1",
  "text-sm font-medium text-accent transition-colors hover:text-accent-hover"
);

function SectionEyebrow() {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-br-accent-soft bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      <FaFileAlt className="h-4 w-4" />
      Полезно
    </div>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="typo-h3">{title}</h2>
        {description ? <p className="typo-meta mt-2 max-w-2xl">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function ArticleBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex rounded-full border border-br-accent-soft bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </div>
  );
}

function ArrowLabel({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={clsx(
        "mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors",
        accent
          ? "text-accent group-hover:text-accent-hover"
          : "text-tx-primary group-hover:text-accent"
      )}
    >
      {children}
      <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  );
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: HelpfulArticle;
  featured?: boolean;
}) {
  return (
    <Link href={article.href} className={surfaceCardCls}>
      <ArticleBadge>{article.category}</ArticleBadge>

      <h3
        className={clsx(
          "leading-tight tracking-[-0.01em] transition-colors",
          featured
            ? "text-[1.375rem] font-semibold text-tx-primary"
            : "text-xl font-semibold text-tx-primary",
          "group-hover:text-accent"
        )}
      >
        {article.title}
      </h3>

      <p className="typo-meta mt-3 leading-7">{article.description}</p>

      <ArrowLabel>Прочети повече</ArrowLabel>
    </Link>
  );
}

function CategoryCard({ item }: { item: HelpfulCategory }) {
  return (
    <Link href={item.href} className={surfaceCardCls}>
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-bg-soft text-accent transition-colors duration-300 group-hover:bg-accent/12">
        {item.icon}
      </div>

      <h3 className="text-lg font-semibold text-tx-primary transition-colors group-hover:text-accent">
        {item.title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-tx-secondary">{item.description}</p>

      <ArrowLabel accent>Разгледай</ArrowLabel>
    </Link>
  );
}

export function HelpfulHubSection() {
  return (
    <Section
      id="polezno"
      variant="hero"
      tone="section"
      className="overflow-hidden"
      containerClassName="relative"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_left,rgba(199,157,50,0.08),transparent_42%)]" />

      <div className="relative">
        <div className="max-w-3xl p-4">
          <SectionEyebrow />

          <h1 className="typo-h2 max-w-2xl">Полезни материали, въпроси и насоки</h1>

          <p className="typo-subtitle mt-5 max-w-2xl">
            Практична информация за геодезия, кадастър, трасиране и устройствени
            процедури. Съдържание, което помага на клиентите да вземат по-информирано
            решение и да намерят точната услуга по-бързо.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} featured />
          ))}
        </div>

        <div className="mt-20">
          <SectionHeader
            title="Категории"
            description="Раздели съдържанието по теми, за да е лесно за потребителя и за Google."
          />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((item) => (
              <CategoryCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeader
            title="Последни статии"
            description="Кратки ръководства и практически теми с висок SEO потенциал."
            action={
              <Link href="/polezno" className={sectionHeaderLinkCls}>
                Виж всички
                <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
