import Image from "next/image";
import type { Service } from "@/config/services/categories";
import { getCategoryIcon } from "@/config/services/icons";
import { normalizeParagraphs } from "@/utils/normalizeText";
import { getServiceHref } from "@/utils/urlHelpers";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";
import { ServiceFacts } from "./ServiceFacts";

type Props = {
  service: Service;
  categorySlug: string;
  /** null when the photo is already shown elsewhere on the page */
  image: string | null;
};

export function CategoryServiceItem({ service, categorySlug, image }: Props) {
  const paragraphs = normalizeParagraphs(service.longDescription ?? service.description);
  // Services with their own page show a short intro here; the rest show their full description.
  const shown = service.hasDedicatedPage ? paragraphs.slice(0, 1) : paragraphs;

  return (
    <article
      id={service.slug}
      className="grid overflow-hidden rounded-2xl border border-br-light bg-bg-page shadow-card md:grid-cols-[15rem_minmax(0,1fr)]"
    >
      {image ? (
        <div className="relative aspect-16/9 bg-bg-subtle md:aspect-auto">
          <Image
            src={image}
            alt={service.imageAlt ?? service.title}
            fill
            sizes="(max-width: 768px) calc(100vw - 2.5rem), 240px"
            quality={70}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="pattern-summit on-dark flex h-20 items-center justify-center bg-bg-inverse md:h-auto">
          <IconBadge icon={getCategoryIcon(categorySlug)} dark size="lg" />
        </div>
      )}

      <div className="p-6 sm:p-8">
        {service.meta ? <Eyebrow rule={false}>{service.meta}</Eyebrow> : null}
        <Heading as="h3" className={service.meta ? "mt-2.5" : undefined}>
          {service.title}
        </Heading>
        <div className="mt-3 grid max-w-2xl gap-3">
          {shown.map((paragraph) => (
            <Text key={paragraph.slice(0, 40)}>{paragraph}</Text>
          ))}
        </div>
        <ServiceFacts service={service} />

        {/* Only a link to the details; the quote buttons are the hero and the closing CTA */}
        {service.hasDedicatedPage ? (
          <Button href={getServiceHref(categorySlug, service)} variant="link" arrow className="mt-6">
            Научете повече
          </Button>
        ) : null}
      </div>
    </article>
  );
}
