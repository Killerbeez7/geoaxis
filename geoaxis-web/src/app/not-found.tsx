import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import { serviceCategories } from "@/config/services/categories";
import { getCategoryIcon } from "@/config/services/icons";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PAGE_BACKDROPS } from "@/config/services/backdrops";

export const metadata = {
  title: { absolute: "Страницата не е намерена – GeoAxis" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        backdrop={PAGE_BACKDROPS.notFound}
        eyebrow="Грешка 404"
        title="Тази страница не съществува"
        description="Възможно е адресът да е сгрешен или страницата да е преместена. Ето откъде можете да продължите."
        actions={
          <>
            <Button href="/" size="lg">
              Към началото
            </Button>
            <Button href="/contacts" size="lg" variant="outline" arrow>
              Поискайте оферта
            </Button>
          </>
        }
      />

      <Section spacing="compact" aria-labelledby="not-found-services">
        <h2 id="not-found-services" className="typo-h3">
          Нашите услуги
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/uslugi/${category.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-br-light bg-bg-page p-4 transition-colors hover:border-br-accent"
              >
                <IconBadge icon={getCategoryIcon(category.slug)} />
                <span className="flex-1 font-semibold text-tx-primary group-hover:text-accent-text">{category.title}</span>
                <LuArrowRight aria-hidden="true" className="h-4 w-4 text-tx-muted transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
