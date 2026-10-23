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
  return getArticleMetadata("statii", articleSlug);
}

export function generateStaticParams() {
  return getArticleStaticParams("statii");
}

export default async function Page({ params }: Props) {
  const { articleSlug } = await params;
  return <ArticleDetailPage section="statii" slug={articleSlug} />;
}
