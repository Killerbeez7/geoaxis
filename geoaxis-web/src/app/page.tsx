import { siteContent } from "@/config/site-content";
import { SITE_URL } from "@/config/site";
import { pageSeo } from "@/config/seo";
import { createSeo } from "@/lib/seo-builder";
import { getWebSiteSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { HomeHero } from "@/components/home/HomeHero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HomeFaq } from "@/components/home/HomeFaq";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export const metadata = createSeo(pageSeo.home);

export default function Home() {
  return (
    <>
      <JsonLd data={getWebSiteSchema(SITE_URL)} />

      <HomeHero />

      <ServicesOverview />
      <WhyUsSection />
      <ProcessSection />
      <FeaturedProjects />
      <TestimonialsSection {...siteContent.testimonials} />
      <HomeFaq />
      <CtaBand />
    </>
  );
}
