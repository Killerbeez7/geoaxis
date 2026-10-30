import Link from "next/link";
import clsx from "clsx";
import { LuArrowRight } from "react-icons/lu";
import type { HelpfulArticle } from "@/config/polezno/articles";
import { SECTION_LABELS, getArticleHref } from "@/lib/articles";
import { Eyebrow } from "@/components/ui/Text";

// Short list of related articles next to a service category: helps readers and links the
// articles from the pages that rank, so search engines find them.
export function TopicArticles({ articles, className }: { articles: HelpfulArticle[]; className?: string }) {
  if (!articles.length) return null;

  return (
    <nav aria-label="Полезно по темата" className={clsx("rounded-2xl border border-br-light bg-bg-page p-5", className)}>
      <Eyebrow rule={false} tone="muted">
        Полезно по темата
      </Eyebrow>
      <ul className="mt-3 grid gap-1">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={getArticleHref(article)}
              className="group flex items-start justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-bg-subtle"
            >
              <span>
                <span className="typo-label tone-muted block">{SECTION_LABELS[article.section].single}</span>
                <span className="typo-small mt-1 block font-semibold text-tx-primary group-hover:text-accent-text">
                  {article.title}
                </span>
              </span>
              <LuArrowRight
                aria-hidden="true"
                className="mt-5 h-4 w-4 shrink-0 text-accent-text transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-3 border-t border-br-light px-2 pt-4">
        <Link href="/polezno" className="typo-small font-semibold text-accent-text hover:underline">
          Всички материали
        </Link>
      </div>
    </nav>
  );
}
