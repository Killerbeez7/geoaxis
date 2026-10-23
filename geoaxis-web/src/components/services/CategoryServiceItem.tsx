import Image from "next/image";
import type { Service } from "@/config/services/categories";
import { getCategoryIcon } from "@/config/services/icons";
import { normalizeParagraphs } from "@/utils/normalizeText";
import { getServiceHref } from "@/utils/urlHelpers";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { ServiceFacts } from "./ServiceFacts";

type Props = {
  service: Service;
  categorySlug: string;
  /** null when the photo is already shown elsewhere on the page */
  image: string | null;
};

export function CategoryServiceItem({ service, categorySlug, image }: Props) {
  const paragraphs = normalizeParagraphs(service.longDescription ?? service.description);

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
        <div className="pattern-contours on-dark flex h-20 items-center justify-center bg-bg-inverse md:h-auto">
          <IconBadge icon={getCategoryIcon(categorySlug)} dark size="lg" />
        </div>
      )}

      <div className="p-6 sm:p-7">
        {service.meta ? <p className="typo-label text-accent-text">{service.meta}</p> : null}
        <h3 className="typo-h3 mt-2">{service.title}</h3>
        <div className="typo-small mt-3 grid gap-2.5 text-tx-secondary">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <ServiceFacts service={service} />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={`/contacts?service=${categorySlug}`} track="quote_click">
            Поискайте оферта
          </Button>
          {service.hasDedicatedPage ? (
            <Button href={getServiceHref(categorySlug, service)} variant="outline" arrow>
              Научете повече
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
