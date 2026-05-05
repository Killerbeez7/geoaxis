import {
  HELPFUL_ARTICLES,
  HelpfulArticle,
  type HelpfulArticleSection,
} from "@/config/polezno/articles";

export function getArticleBySlug(slug: string) {
  return HELPFUL_ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesBySection(section: HelpfulArticleSection) {
  return HELPFUL_ARTICLES.filter((article) => article.section === section);
}

export function getRelatedArticles(currentSlug: string, limit = 2) {
  return HELPFUL_ARTICLES.filter((article) => article.slug !== currentSlug).slice(
    0,
    limit
  );
}
