import { notFound } from "next/navigation";

import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { ArticleListPage } from "../_components/ArticleListPage";

const pageContent = getHelpfulNavItem("rakovodstva");

export const metadata = pageContent
  ? createSeo({
      title: pageContent.seo.title,
      description: pageContent.seo.description,
      canonical: pageContent.href,
    })
  : {};

export default function Page() {
  if (!pageContent) notFound();
  return <ArticleListPage section="rakovodstva" pageContent={pageContent} />;
}
