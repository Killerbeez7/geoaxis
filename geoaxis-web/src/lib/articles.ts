import {
  HELPFUL_ARTICLES,
  type HelpfulArticle,
  type HelpfulArticleCategory,
  type HelpfulArticleSection,
} from "@/config/polezno/articles";

export const SECTION_LABELS: Record<HelpfulArticleSection, { single: string; plural: string; cta: string }> = {
  statii: { single: "Статия", plural: "Статии", cta: "Прочетете" },
  rakovodstva: { single: "Ръководство", plural: "Ръководства", cta: "Вижте стъпките" },
};

// Topic shown on article cards
export const TOPIC_LABELS: Record<HelpfulArticleCategory, string> = {
  geodezia: "Заснемане",
  kadastar: "Кадастър",
  trasirane: "Трасиране",
  gradoustroistvo: "Градоустройство",
  pup: "ПУП",
  polezno: "Общи",
};

export function getArticleHref(article: HelpfulArticle) {
  return `/polezno/${article.section}/${article.slug}`;
}

export function articleTypeLabel(article: HelpfulArticle) {
  return SECTION_LABELS[article.section].single;
}

const dateFormatter = new Intl.DateTimeFormat("bg-BG", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Sofia",
});

// "2026-04-16" -> "16 април 2026 г."
export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(`${isoDate}T12:00:00Z`));
}



/**
 * Articles that point to a service category in their related services, the ones that name it first
 * leading. Used for the "Полезно по темата" links on category pages.
 */
export function getArticlesForServiceCategory(categorySlug: string, limit = 3) {
  const base = `/uslugi/${categorySlug}`;
  const rank = (article: HelpfulArticle) =>
    (article.relatedServices ?? []).findIndex(
      (link) => link.href === base || link.href.startsWith(`${base}#`) || link.href.startsWith(`${base}/`)
    );
  return HELPFUL_ARTICLES.filter((article) => rank(article) >= 0)
    .toSorted((a, b) => rank(a) - rank(b))
    .slice(0, limit);
}
