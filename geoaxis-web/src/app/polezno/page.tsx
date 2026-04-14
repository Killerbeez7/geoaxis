// import { notFound } from "next/navigation";
import { HELPFUL_NAV_ITEMS } from "@/config/polezno/helpful-nav";
// import { Section } from "@/components/layout/Section";
import { createSeo } from "@/lib/seo-builder";
import { HelpfulHubSection } from "./HelpfulHubSection";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const currentItem = HELPFUL_NAV_ITEMS.find((item) => item.slug === slug);

  if (!currentItem) {
    return createSeo({
      title: "Полезни материали",
      description: "Полезни статии, въпроси и отговори, ръководства и ресурси.",
      canonical: "/polezno",
      noIndex: true,
    });
  }

  return createSeo({
    title: currentItem.label,
    description:
      currentItem.description ?? `Полезни материали от GeoAxis: ${currentItem.label}.`,
    canonical: `/polezno/${currentItem.slug}`,
    noIndex: true,
  });
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return HELPFUL_NAV_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

// export default async function HelpfulPlaceholderPage({ params }: Props) {
//   const { slug } = await params;

//   const currentItem = HELPFUL_NAV_ITEMS.find((item) => item.slug === slug);

//   if (!currentItem) notFound();

//   return (
//     <main className="bg-bg-page">
//       <Section className="min-h-[70vh]">
//         <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
//           <p className="typo-kicker text-accent">{currentItem.label}</p>

//           <h1 className="mt-3 typo-h1 text-tx-primary">{currentItem.label}</h1>

//           <p className="mt-4 max-w-2xl text-sm leading-7 text-tx-secondary md:text-base">
//             {currentItem.description ?? "Подготвяме съдържанието за тази секция."}
//           </p>

//           <div className="mt-10 flex flex-col items-center">
//             <div className="h-16 w-16 animate-spin rounded-full border-4 border-br-light border-t-accent" />
//             <p className="mt-5 text-base font-medium text-tx-primary">Coming soon</p>
//             <p className="mt-2 text-sm text-tx-secondary">Be patient.</p>
//           </div>
//         </div>
//       </Section>
//     </main>
//   );
// }

export default function HelpfulPage() {
  return (
    <main className="bg-bg-page">
      <HelpfulHubSection />
    </main>
  );
}
