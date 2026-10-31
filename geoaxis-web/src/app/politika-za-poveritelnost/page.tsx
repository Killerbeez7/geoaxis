import Link from "next/link";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/config/site-content";
import { company } from "@/config/content/company";
import { createSeo } from "@/lib/seo-builder";
import { PAGE_BACKDROPS } from "@/config/services/backdrops";

export const metadata = createSeo({
  title: "Политика за поверителност",
  description:
    "Информация как GeoAxis обработва лични данни при запитвания, контактни форми, прикачени файлове и използване на сайта.",
  canonical: "/politika-za-poveritelnost",
});

const privacyEmail = siteContent.contacts.email;

const collectedData = [
  "име",
  "телефон и/или имейл адрес",
  "съобщение и описание на запитването",
  "тип услуга, населено място, имот или локация, ако са посочени",
  "прикачени файлове, когато потребителят доброволно ги изпрати",
];

const processors = [
  "Vercel Inc. – хостинг, CDN, инфраструктура, Vercel Analytics и Speed Insights",
  "Resend – изпращане на имейл съобщения от контактната форма",
  "Google (Gmail) – получаване и съхранение на имейл кореспонденцията",
];

const technicalLocations = [
  "посочения служебен имейл адрес",
  "пощенската кореспонденция на получателя",
  "Resend, доколкото е необходимо за изпращане и техническа обработка на имейла",
  "хостинг/serverless логове, когато това е технически необходимо за сигурност и диагностика",
];

const userRights = [
  "достъп до личните данни",
  "корекция на неточни или непълни данни",
  "изтриване на данни, когато няма законово основание да бъдат пазени",
  "ограничаване на обработването в приложимите случаи",
  "възражение срещу обработване, основано на легитимен интерес",
  "преносимост – да получите данните си в структуриран, машинно четим формат",
  "жалба до Комисията за защита на личните данни",
];

function LegalSection({
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        backdrop={PAGE_BACKDROPS.legal}
        breadcrumbs={[{ label: "Политика за поверителност", href: "/politika-za-poveritelnost" }]}
        title="Политика за поверителност"
        description="Тази страница обяснява как се обработват данните, изпратени чрез сайта и контактната форма на GeoAxis."
      />

      <Section>
        <div className="max-w-3xl space-y-12">
          <LegalSection title="1. Кой стои зад сайта">
            {company.legalName ? (
              <p>
                Администратор на личните данни е {company.legalName}
                {company.eik ? `, ЕИК ${company.eik}` : ""}
                {company.registeredAddress ? `, със седалище и адрес на управление ${company.registeredAddress}` : ""}
                , което използва търговското наименование GeoAxis и сайта geoaxis.bg.
              </p>
            ) : (
              <p>
                GeoAxis е търговско наименование/брандинг, използвано за
                представяне на геодезически услуги чрез сайта geoaxis.bg.
              </p>
            )}
            <p>
              За въпроси относно обработката на лични данни можете да се свържете
              с нас на{" "}
              <a
                href={`mailto:${privacyEmail}`}
              >
                {privacyEmail}
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="2. Какви данни се обработват">
            <p>
              Когато изпратите запитване през сайта, се обработват само данните,
              които са необходими, за да разберем случая и да Ви отговорим.
            </p>
            <ul>
              {collectedData.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="3. Защо се използват данните">
            <p>
              Данните се използват за отговор на Вашето запитване, уточняване на
              детайли, подготовка на отговор или оферта и последваща комуникация
              по конкретния казус.
            </p>
            <p>
              Правното основание е предприемане на стъпки по Ваше искане преди
              евентуално възлагане на услуга, както и легитимен интерес да
              отговорим на получени запитвания.
            </p>
          </LegalSection>

          <LegalSection title="4. Как се обработват запитванията">
            <p>
              Запитванията не се съхраняват в клиентски профили или вътрешна база
              данни на сайта. Информацията, изпратена чрез формата, се препраща
              към посочения служебен имейл адрес с цел обработка на конкретното
              запитване.
            </p>
            <p>
              Това е обработване на лични данни, но не представлява създаване на
              потребителски профил, CRM запис или отделна база данни с клиенти в
              сайта.
            </p>
          </LegalSection>

          <LegalSection title="5. Прикачени файлове">
            <p>
              Прикачените файлове се използват единствено за конкретното
              запитване. Моля, изпращайте само документи, снимки или скици, които
              са необходими за първоначална преценка на случая.
            </p>
            <p>
              Когато е възможно, скрийте чувствителни данни, които не са нужни за
              първоначалната консултация.
            </p>
          </LegalSection>

          <LegalSection title="6. Къде може да остане информацията">
            <p>
              Данните от запитването и прикачените файлове могат да останат в
              технически системи, необходими за изпращане и получаване на
              съобщението:
            </p>
            <ul>
              {technicalLocations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="7. Доставчици и обработващи данни">
            <p>
              За работата на сайта и контактната форма се използват външни
              доставчици. Те обработват данни само доколкото е необходимо за
              предоставяне на съответната техническа услуга.
            </p>
            <ul>
              {processors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="8. Предаване на данни извън ЕС">
            <p>
              Някои от посочените доставчици са установени в САЩ. Предаването на
              данни към тях се основава на Рамката за защита на данните между ЕС и
              САЩ (EU–US Data Privacy Framework) или на стандартни договорни клаузи,
              одобрени от Европейската комисия.
            </p>
            <p>
              Сървърната обработка на запитванията се извършва в региона на
              Франкфурт (ЕС).
            </p>
          </LegalSection>

          <LegalSection title="9. Аналитика и бисквитки">
            <p>
              Сайтът не използва рекламни или маркетингови бисквитки и не съдържа
              рекламни пиксели. Използваме Vercel Analytics и Vercel Speed
              Insights за техническа статистика и измерване на производителност.
            </p>
          </LegalSection>

          <LegalSection title="10. Срок на съхранение">
            <p>
              Запитванията и свързаната с тях кореспонденция се съхраняват в
              пощенската кореспонденция до 12 месеца след последната комуникация,
              освен ако има договорна, счетоводна, законова или друга
              основателна причина за по-дълго съхранение.
            </p>
          </LegalSection>

          <LegalSection title="11. Вашите права">
            <p>Имате право да поискате:</p>
            <ul>
              {userRights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Можете да упражните правата си чрез имейл до{" "}
              <a
                href={`mailto:${privacyEmail}`}
              >
                {privacyEmail}
              </a>
              . Ако считате, че правата Ви са нарушени, можете да подадете жалба
              до Комисията за защита на личните данни.
            </p>
          </LegalSection>

          <div className="typo-small rounded-2xl border border-br-light bg-bg-subtle p-5 text-tx-secondary">
            Последна актуализация: 23 октомври 2026 г. Вижте също{" "}
            <Link href="/usloviya-za-polzvane" className="font-semibold text-accent-text underline underline-offset-2">
              Условия за ползване
            </Link>
            .
          </div>
        </div>
      </Section>
    </>
  );
}
