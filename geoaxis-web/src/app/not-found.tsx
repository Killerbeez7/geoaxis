import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/parts/CtaButton";
import { serviceCategories } from "@/config/services/categories";

export const metadata = {
  title: { absolute: "Страницата не е намерена - GeoAxis" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Section variant="hero" tone="section" className="min-h-[70dvh]">
      <div className="max-w-2xl">
        <p className="typo-kicker">Грешка 404</p>
        <h1 className="typo-h2 mt-3">Тази страница не съществува</h1>
        <p className="typo-subtitle mt-4">
          Възможно е адресът да е сгрешен или страницата да е преместена. Ето откъде можете да
          продължите:
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CtaButton href="/">Към началото</CtaButton>
          <CtaButton href="/contacts" variant="soft">
            Изпратете запитване
          </CtaButton>
        </div>

        <ul className="mt-10 grid gap-2 sm:grid-cols-2">
          {serviceCategories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/uslugi/${category.slug}`}
                className="text-base font-medium text-tx-primary underline-offset-4 hover:text-accent-text hover:underline"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
