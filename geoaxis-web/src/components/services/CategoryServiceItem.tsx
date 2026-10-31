import Image from "next/image";
import { LuChevronDown } from "react-icons/lu";
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

// Every card shows the same short summary. Services with their own page link to it; for the rest,
// "Още за услугата" opens the remaining text in place, so it stays on the page for readers and search engines.
export function CategoryServiceItem({ service, categorySlug, image }: Props) {
  const [summary, ...rest] = normalizeParagraphs(service.longDescription ?? service.description);

  return (
    <article
      id={service.slug}
      className="flex scroll-mt-[calc(var(--header-h)+1rem)] flex-col overflow-hidden rounded-2xl border border-br-light bg-bg-page shadow-card"
    >
      <div className="relative aspect-16/10 bg-bg-subtle">
        {image ? (
          <Image
            src={image}
            alt={service.imageAlt ?? service.title}
            fill
            sizes="(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1280px) 45vw, 400px"
            quality={70}
            className="object-cover"
          />
        ) : (
          <div className="pattern-summit on-dark absolute inset-0 flex items-center justify-center bg-bg-inverse">
            <IconBadge icon={getCategoryIcon(categorySlug)} dark size="lg" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {service.meta ? <Eyebrow rule={false}>{service.meta}</Eyebrow> : null}
        <Heading as="h3" size="h4" className={service.meta ? "mt-2.5" : undefined}>
          {service.title}
        </Heading>
        {summary ? <Text className="mt-3">{summary}</Text> : null}
        <ServiceFacts service={service} />

        <div className="mt-auto pt-5">
          {service.hasDedicatedPage ? (
            <Button href={getServiceHref(categorySlug, service)} variant="link" arrow>
              Научете повече
            </Button>
          ) : rest.length ? (
            <details className="group">
              <summary className="typo-small inline-flex cursor-pointer list-none items-center gap-1.5 font-semibold text-accent-text hover:underline underline-offset-4 [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Още за услугата</span>
                <span className="hidden group-open:inline">По-малко</span>
                <LuChevronDown aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="mt-3 grid gap-3">
                {rest.map((paragraph) => (
                  <Text key={paragraph.slice(0, 40)}>{paragraph}</Text>
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </div>
    </article>
  );
}
