import Link from "next/link";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
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
    <section className="border-t border-br-light pt-10 first:border-t-0 first:pt-0">
      <h2 className="typo-h3">{title}</h2>
      <div className="prose-geo mt-4">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        size="compact"
        breadcrumbs={[{ label: "Условия за ползване", href: "/usloviya-za-polzvane" }]}
        eyebrow="Правна информация"
        title="Условия за ползване"
        description="Основни условия за използване на сайта, публикуваното съдържание и формите за контакт."
      />

      <Section>
        <div className="max-w-3xl space-y-12">
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
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>{" "}
              или на{" "}
              <a
                href={`tel:${contactPhone.replace(/\s+/g, "")}`}
              >
                {contactPhone}
              </a>
              .
            </p>
          </TermsSection>

          <div className="typo-small rounded-2xl border border-br-light bg-bg-subtle p-5 text-tx-secondary">
            Последна актуализация: 19 юни 2026 г.
          </div>
        </div>
      </Section>
    </>
  );
}
