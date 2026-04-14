import { createSeo } from "@/lib/seo-builder";
import { HelpfulHubSection } from "./HelpfulHubSection";

export const metadata = createSeo({
  title: "Полезни материали",
  description:
    "Полезни статии, въпроси и отговори, ръководства и ресурси за геодезия, кадастър, трасиране и устройствени процедури.",
  canonical: "/polezno",
});

export default function HelpfulPage() {
  return <HelpfulHubSection />;
}
