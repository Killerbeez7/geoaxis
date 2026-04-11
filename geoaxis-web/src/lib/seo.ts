import { brand } from "@/config/content/brand";
import { SITE_URL } from "@/config/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function createSeo({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
}: SeoInput) {
  const fullTitle = `${title} - ${brand.name}`;
  const fullPath = `${SITE_URL}${path}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: fullPath,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullPath,
      siteName: brand.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "bg_BG",
      type: "website",
    },
  };
}
