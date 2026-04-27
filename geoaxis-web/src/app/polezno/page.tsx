import { pageSeo } from "@/config/seo";
import { createSeo } from "@/lib/seo-builder";
import { HelpfulHubSection } from "./HelpfulHubSection";

export const metadata = createSeo(pageSeo.polezno);

export default function HelpfulPage() {
  return <HelpfulHubSection />;
}
