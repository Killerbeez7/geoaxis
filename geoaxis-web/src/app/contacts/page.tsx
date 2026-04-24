import clsx from "clsx";
import { FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { ContactForm } from "@/components/forms/ContactForm";
import { Section } from "@/components/layout/Section";
import { siteContent } from "@/config/site-content";
import { createSeo } from "@/lib/seo-builder";

export const metadata = createSeo({
  title: "Контакти",
  description:
    "Свържете се с GeoAxis за геодезически услуги в София и Софийска област. Изпратете запитване за заснемане, трасиране, кадастър, проектиране и градоустройство.",
  canonical: "/contacts",
});

type Item = {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
  href?: string;
};

function ContactItem({ icon, title, text, href }: Item) {
  const content = (
    <>
      <div
        className={clsx(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          "border border-br-light bg-bg-page text-base text-accent",
          "transition group-hover:border-br-accent group-hover:bg-accent/10"
        )}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-tx-muted">
          {title}
        </h3>
        <p className="mt-1 wrap-break-word text-base leading-relaxed text-tx-primary">
          {text}
        </p>
      </div>
    </>
  );

  const className =
    "group flex items-start gap-4 rounded-xl p-3 transition hover:bg-accent/10";

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function Contacts() {
  const { title, subtitle, phone, email, address, mapsUrl } = siteContent.contacts;

  const formattedAddress = address.split("||").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <Section
      variant="hero"
      tone="section"
      className="min-h-[calc(100dvh)] overflow-hidden"
      containerClassName="max-w-7xl"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="lg:pt-8">
          <h1 className="typo-h2">{title}</h1>
          <p className="typo-subtitle mt-4 max-w-xl">{subtitle}</p>

          <div className="mt-6 max-w-xl border-l-2 border-accent pl-4">
            <p className="typo-meta">
              Обикновено отговаряме в рамките на работния ден. Ако случаят е спешен,
              най-бързо е по телефона.
            </p>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-2xl border border-br-light bg-bg-page p-5 shadow-sm sm:p-6">
            {/* <div className="absolute inset-x-0 top-0 h-1 bg-accent" /> */}
            <h2 className="text-xl font-semibold text-tx-primary">Директен контакт</h2>
            <p className="typo-meta mt-2">
              За спешни въпроси се обадете директно. За конкретен имот или услуга
              изпратете кратко запитване през формата.
            </p>

            <div className="mt-5 space-y-2">
              <ContactItem
                icon={<FaPhone />}
                title="Телефон"
                text={phone}
                href={`tel:${phone}`}
              />
              <ContactItem
                icon={<FaEnvelope />}
                title="Имейл"
                text={email}
                href={`mailto:${email}`}
              />
              <ContactItem
                icon={<FaHome />}
                title="Адрес"
                text={formattedAddress}
                href={mapsUrl}
              />
            </div>
          </div>
        </div>

        <div className="lg:justify-self-end lg:w-full lg:max-w-[720px]">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
