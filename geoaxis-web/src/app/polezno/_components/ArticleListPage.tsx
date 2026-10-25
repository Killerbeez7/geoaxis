import { getArticlesBySection, type HelpfulArticleSection } from "@/config/polezno/articles";
import type { HelpfulNavItem } from "@/config/polezno/helpful-nav";
import { SECTION_LABELS } from "@/lib/articles";
import { ArticleCard } from "@/components/polezno/ArticleCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export function ArticleListPage({
  section,
  pageContent,
}: {
  section: HelpfulArticleSection;
  pageContent: HelpfulNavItem;
}) {
  const articles = getArticlesBySection(section);
  const labels = SECTION_LABELS[section];

  return (
    <>
      <PageHero
        size="compact"
        breadcrumbs={[
          { label: "Полезно", href: "/polezno" },
          { label: labels.plural, href: pageContent.href },
        ]}
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />

      <Section aria-labelledby="article-list-title">
        <h2 id="article-list-title" className="sr-only">
          Всички {labels.plural.toLowerCase()}
        </h2>
        <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Имате конкретен случай?"
        text="Опишете накратко имота и задачата – ще ви кажем какво е нужно, срока и цената."
      />
    </>
  );
}
