import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { LuArrowRight } from "react-icons/lu";
import type { HelpfulArticle } from "@/config/polezno/articles";
import { SECTION_LABELS, formatDate, getArticleHref } from "@/lib/articles";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";

type Props = {
  article: HelpfulArticle;
  /** Replaces the section label, e.g. "Започнете оттук" */
  kicker?: string;
  /** In a grid list the cover, text and footer rows line up across cards (subgrid); off for a single card */
  aligned?: boolean;
  /** Heading level of the title; "p" when the card sits outside the page outline (e.g. in a hero) */
  titleAs?: "h2" | "h3" | "p";
};

export function ArticleCard({ article, kicker, aligned = true, titleAs = "h3" }: Props) {
  const labels = SECTION_LABELS[article.section];

  return (
    <Link
      href={getArticleHref(article)}
      className={clsx(
        "group overflow-hidden rounded-2xl border border-br-light bg-bg-page shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift",
        aligned ? "row-span-3 grid grid-rows-subgrid gap-0" : "flex flex-col"
      )}
    >
      <div className="relative aspect-16/9 overflow-hidden bg-bg-subtle">
        {article.coverImage ? (
          <Image
            src={article.coverImage.src}
            alt=""
            fill
            sizes="(max-width: 768px) calc(100vw - 2.5rem), 400px"
            quality={70}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="px-6 pt-6">
        <Eyebrow rule={false}>{kicker ?? labels.single}</Eyebrow>
        <Heading as={titleAs} size="h4" className="mt-2.5">
          {article.title}
        </Heading>
        <Text className="mt-2.5 line-clamp-3">{article.excerpt ?? article.description}</Text>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 px-6 pb-6 pt-6">
        <Text as="span" size="small" tone="muted">
          {formatDate(article.updatedAt ?? article.publishedAt)}
        </Text>
        <span className="typo-small inline-flex items-center gap-1.5 font-semibold text-accent-text">
          {labels.cta}
          <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
