import Link from "next/link";
import { articleTypeLabel, getArticleHref } from "../_utils/helpers";
import { type HelpfulArticle } from "@/config/polezno/articles";

export function CompactArticleLink({ article }: { article: HelpfulArticle }) {
  return (
    <Link
      href={getArticleHref(article)}
      className="group block -mx-2 rounded-xl px-2 py-3 transition hover:bg-bg-muted"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tx-muted">
        {articleTypeLabel(article)}
      </p>

      <h3 className="mt-1 text-base font-semibold leading-snug text-tx-primary transition group-hover:text-accent-strong">
        {article.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-tx-secondary">
        {article.excerpt}
      </p>
    </Link>
  );
}
