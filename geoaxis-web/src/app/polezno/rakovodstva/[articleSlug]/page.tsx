import {
  ArticleDetailPage,
  getArticleMetadata,
  getArticleStaticParams,
} from "../../_components/ArticleDetailPage";

type Props = {
  params: Promise<{ articleSlug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { articleSlug } = await params;
  return getArticleMetadata("rakovodstva", articleSlug);
}

export function generateStaticParams() {
  return getArticleStaticParams("rakovodstva");
}

export default async function Page({ params }: Props) {
  const { articleSlug } = await params;
  return <ArticleDetailPage section="rakovodstva" slug={articleSlug} />;
}
