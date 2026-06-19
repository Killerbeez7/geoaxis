import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { siteContent } from "@/config/site-content";
import { createSeo } from "@/lib/seo-builder";

export const metadata = createSeo({
  title: "Политика за поверителност",
  description:
    "Информация как GeoAxis обработва лични данни при запитвания, контактни форми, прикачени файлове и използване на сайта.",
  canonical: "/politika-za-poveritelnost",
});

const privacyEmail = siteContent.contacts.email;

// TODO: Replace these placeholders with the exact legal entity, EIK/BULSTAT and registered address.
const controllerName = "GeoAxis / [попълнете юридическо лице или администратор]";
const controllerAddress = "[попълнете адрес на регистрация, ако е приложимо]";

const collectedData = [
  "име",
  "телефон и/или имейл адрес",
  "съобщение и описание на запитването",
  "тип услуга, населено място, имот или локация, ако са посочени",
  "прикачени файлове, когато потребителят доброволно ги изпрати",
];

const processors = [
  "Vercel - хостинг, CDN, инфраструктура, Vercel Analytics и Speed Insights",
  "Resend - изпращане на имейл съобщения от контактната форма",
  "доставчикът на получаващата имейл поща",
];

const userRights = [
  "достъп до личните данни",
  "корекция на неточни или непълни данни",
  "изтриване на данни, когато няма законово основание да бъдат пазени",
  "ограничаване или възражение срещу обработването в приложимите случаи",
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

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-bg-page">
      <Section variant="compactHero" tone="section">
        <div className="max-w-3xl">
          <p className="typo-kicker text-accent">Правна информация</p>
          <h1 className="typo-h2 mt-3">Политика за поверителност</h1>
          <p className="typo-subtitle mt-4">
            Тази страница обяснява как обработваме данните, изпратени чрез сайта
            и контактната форма на GeoAxis.
          </p>
        </div>
      </Section>

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="mx-auto max-w-4xl space-y-10">
          <LegalSection title="1. Администратор на данните">
            <p>
              Администратор на личните данни е {controllerName}. Адрес за
              кореспонденция: {controllerAddress}.
            </p>
            <p>
              За въпроси, свързани с лични данни, можете да ни пишете на{" "}
              <a className="font-medium text-accent-strong underline" href={`mailto:${privacyEmail}`}>
                {privacyEmail}
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="2. Какви данни събираме">
            <p>
              Когато изпратите запитване през сайта, обработваме само данните,
              които са необходими, за да разберем случая и да Ви отговорим.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              {collectedData.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="3. Защо използваме данните">
            <p>
              Данните се използват за отговор на Вашето запитване, уточняване на
              детайли, подготовка на оферта и последваща комуникация по конкретния
              казус.
            </p>
            <p>
              Правното основание е предприемане на стъпки по Ваше искане преди
              евентуално възлагане на услуга, както и легитимен интерес да
              отговорим на получени запитвания.
            </p>
          </LegalSection>

          <LegalSection title="4. Прикачени файлове">
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

          <LegalSection title="5. Доставчици и обработващи данни">
            <p>
              За работата на сайта и контактната форма използваме външни
              доставчици. Те обработват данни само доколкото е необходимо за
              предоставяне на съответната техническа услуга.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              {processors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="6. Аналитика и бисквитки">
            <p>
              Сайтът не използва рекламни или маркетингови бисквитки и не съдържа
              рекламни пиксели. Използваме Vercel Analytics и Vercel Speed
              Insights за техническа статистика и измерване на производителност.
            </p>
          </LegalSection>

          <LegalSection title="7. Срок на съхранение">
            <p>
              Запитванията и свързаната с тях кореспонденция се съхраняват до 12
              месеца след последната комуникация, освен ако има договорна,
              счетоводна, законова или друга основателна причина за по-дълго
              съхранение.
            </p>
          </LegalSection>

          <LegalSection title="8. Вашите права">
            <p>Имате право да поискате:</p>
            <ul className="list-disc space-y-2 pl-6">
              {userRights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Можете да упражните правата си чрез имейл до{" "}
              <a className="font-medium text-accent-strong underline" href={`mailto:${privacyEmail}`}>
                {privacyEmail}
              </a>
              . Ако считате, че правата Ви са нарушени, можете да подадете жалба
              до Комисията за защита на личните данни.
            </p>
          </LegalSection>

          <div className="rounded-2xl border border-br-light bg-bg-section p-5 text-sm leading-7 text-tx-secondary">
            Последна актуализация: 19 юни 2026 г. Вижте също{" "}
            <Link className="font-medium text-accent-strong underline" href="/usloviya-za-polzvane">
              Условия за ползване
            </Link>
            .
          </div>
        </div>
      </Section>
    </main>
  );
}
