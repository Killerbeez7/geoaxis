import type { HelpfulArticle, HelpfulArticleSection } from "@/config/polezno/articles";

export const SECTION_LABELS: Record<HelpfulArticleSection, { single: string; plural: string; cta: string }> = {
  statii: { single: "Статия", plural: "Статии", cta: "Прочетете" },
  rakovodstva: { single: "Ръководство", plural: "Ръководства", cta: "Вижте стъпките" },
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

const WORDS_PER_MINUTE = 200;

export function readingMinutes(article: HelpfulArticle) {
  const text = article.body
    .map((block) => (block.type === "paragraph" ? block.content : [block.title ?? "", ...block.items].join(" ")))
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
