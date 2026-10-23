import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { LuArrowRight } from "react-icons/lu";
import type { HelpfulArticle } from "@/config/polezno/articles";
import { SECTION_LABELS, formatDate, getArticleHref, readingMinutes } from "@/lib/articles";

export function ArticleCard({ article, featured = false }: { article: HelpfulArticle; featured?: boolean }) {
  const labels = SECTION_LABELS[article.section];

  return (
    <Link
      href={getArticleHref(article)}
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-br-light bg-bg-page shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift",
        featured && "md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      )}
    >
      {article.coverImage ? (
        <div className={clsx("relative aspect-16/9 overflow-hidden bg-bg-subtle", featured && "md:aspect-auto md:min-h-72")}>
          <Image
            src={article.coverImage.src}
            alt=""
            fill
            sizes={featured ? "(max-width: 768px) calc(100vw - 2.5rem), 640px" : "(max-width: 768px) calc(100vw - 2.5rem), 400px"}
            quality={70}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className={clsx("flex flex-1 flex-col p-6", featured && "md:p-8")}>
        <p className="typo-label text-accent-text">
          {labels.single} · {readingMinutes(article)} мин четене
        </p>
        <h3 className={clsx("mt-3", featured ? "typo-h2" : "typo-h4")}>{article.title}</h3>
        <p className="typo-small mt-3 line-clamp-3 text-tx-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="typo-caption text-tx-muted">{formatDate(article.updatedAt ?? article.publishedAt)}</span>
          <span className="typo-small inline-flex items-center gap-1.5 font-semibold text-accent-text">
            {labels.cta}
            <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
