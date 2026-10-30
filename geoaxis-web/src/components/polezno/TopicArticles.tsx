import Link from "next/link";
import clsx from "clsx";
import { LuArrowRight } from "react-icons/lu";
import type { HelpfulArticle } from "@/config/polezno/articles";
import { SECTION_LABELS, getArticleHref } from "@/lib/articles";
import { Heading } from "@/components/ui/Text";

// Related articles at the end of a service category: helps readers and links the articles from the
// pages that rank, so search engines find them.
export function TopicArticles({ articles, className }: { articles: HelpfulArticle[]; className?: string }) {
  if (!articles.length) return null;

  return (
    <section aria-labelledby="topic-articles-title" className={clsx("border-t border-br-light pt-12", className)}>
      <Heading id="topic-articles-title" size="h3">
        Полезно по темата
      </Heading>
      <ul className="mt-6 border-t border-br-light">
        {articles.map((article) => (
          <li key={article.slug} className="border-b border-br-light">
            <Link href={getArticleHref(article)} className="group flex items-center justify-between gap-6 py-5">
              <span>
                <span className="typo-label tone-muted block">{SECTION_LABELS[article.section].single}</span>
                <span className="typo-h5 mt-1 block transition-colors group-hover:text-accent-text">{article.title}</span>
              </span>
              <LuArrowRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-text transition-transform group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/polezno" className="typo-small mt-5 inline-block font-semibold text-accent-text hover:underline">
        Всички материали
      </Link>
    </section>
  );
}
