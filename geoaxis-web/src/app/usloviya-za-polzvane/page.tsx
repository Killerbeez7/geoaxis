import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { siteContent } from "@/config/site-content";
import { createSeo } from "@/lib/seo-builder";

export const metadata = createSeo({
  title: "Условия за ползване",
  description:
    "Условия за използване на сайта GeoAxis, информационното съдържание, външните връзки и контактните форми.",
  canonical: "/usloviya-za-polzvane",
});

const contactEmail = siteContent.contacts.email;
const contactPhone = siteContent.contacts.phone;

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-br-light pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-semibold leading-tight text-tx-primary">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-tx-secondary">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-bg-page">
      <Section variant="compactHero" tone="section">
        <div className="max-w-3xl">
          <p className="typo-kicker">Правна информация</p>
          <h1 className="typo-h2 mt-3">Условия за ползване</h1>
          <p className="typo-subtitle mt-4">
            Основни условия за използване на сайта, публикуваното съдържание и
            формите за контакт.
          </p>
        </div>
      </Section>

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="mx-auto max-w-4xl space-y-10">
          <TermsSection title="1. За сайта">
            <p>
              GeoAxis е публичното търговско наименование/брандинг, използвано за
              представяне на геодезически услуги чрез сайта geoaxis.bg.
            </p>
            <p>
              Сайтът представя услуги, проекти и полезна информация в областта на
              геодезията, кадастъра, трасирането, проектирането и устройствените
              процедури.
            </p>
          </TermsSection>

          <TermsSection title="2. Информационен характер">
            <p>
              Публикуваната информация е обща и не замества индивидуална
              професионална консултация за конкретен имот, проект или
              административна процедура.
            </p>
            <p>
              Всяка услуга зависи от конкретните документи, изходни данни,
              теренни условия и приложимите административни изисквания.
            </p>
          </TermsSection>

          <TermsSection title="3. Запитвания и предоставена информация">
            <p>
              Когато изпращате запитване, моля предоставяйте вярна и достатъчно
              ясна информация, за да можем да Ви насочим към подходяща услуга или
              следваща стъпка.
            </p>
            <p>
              Може да бъдат поискани допълнителни документи или уточнения, когато
              първоначалната информация не е достатъчна за надеждна преценка.
            </p>
            <p>
              Данните от контактната форма се обработват съгласно{" "}
              <Link
                className="font-medium text-accent-strong underline"
                href="/politika-za-poveritelnost"
              >
                Политиката за поверителност
              </Link>
              .
            </p>
          </TermsSection>

          <TermsSection title="4. Външни връзки">
            <p>
              Сайтът може да съдържа връзки към външни институции, портали, карти
              или други ресурси. Те са предоставени за удобство и ориентация.
            </p>
            <p>
              GeoAxis не носи отговорност за съдържанието, достъпността или
              политиките на външни сайтове.
            </p>
          </TermsSection>

          <TermsSection title="5. Интелектуална собственост">
            <p>
              Текстовете, структурата, изображенията и визуалните елементи на
              сайта принадлежат на GeoAxis или са използвани на законно основание,
              освен ако изрично е посочено друго.
            </p>
            <p>
              Копиране, публикуване или използване на съдържание от сайта без
              разрешение не е позволено, освен в случаите, разрешени от закона.
            </p>
          </TermsSection>

          <TermsSection title="6. Промени в сайта">
            <p>
              Съдържанието, услугите и тези условия могат да бъдат обновявани, за
              да отразяват промени в практиката, нормативната рамка или начина на
              работа.
            </p>
          </TermsSection>

          <TermsSection title="7. Контакт">
            <p>
              За въпроси относно сайта или услугите можете да се свържете с нас
              на{" "}
              <a
                className="font-medium text-accent-strong underline"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>{" "}
              или на{" "}
              <a
                className="font-medium text-accent-strong underline"
                href={`tel:${contactPhone.replace(/\s+/g, "")}`}
              >
                {contactPhone}
              </a>
              .
            </p>
          </TermsSection>

          <div className="rounded-2xl border border-br-light bg-bg-section p-5 text-sm leading-7 text-tx-secondary">
            Последна актуализация: 19 юни 2026 г.
          </div>
        </div>
      </Section>
    </div>
  );
}
