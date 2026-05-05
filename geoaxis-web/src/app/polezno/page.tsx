import { pageSeo } from "@/config/seo";
import { createSeo } from "@/lib/seo-builder";
import { PoleznoPageContent } from "./PoleznoPageContent";

export const metadata = createSeo(pageSeo.polezno);

export default function HelpfulPage() {
  return <PoleznoPageContent />;
}
