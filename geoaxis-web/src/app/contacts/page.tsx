import clsx from "clsx";
import Image from "next/image";
import { FaHome, FaPhone, FaEnvelope } from "react-icons/fa";
// Components
import { ContactForm } from "@/components/forms/ContactForm";
import { Section } from "@/components/layout/Section";
// Data
import { siteContent } from "@/config/site-content";
// SEO
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
};

function ContactItem({ icon, title, text }: Item) {
  return (
    <div className="flex items-start gap-6 group">
      <div
        className="
                flex h-14 w-14 shrink-0 items-center justify-center
                rounded-2xl
                bg-white/5
                backdrop-blur-md
                border border-white/10
                text-accent
                text-lg
                transition
                group-hover:bg-accent/10
                group-hover:scale-105
            "
      >
        {icon}
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="mt-1 text-white/70 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function Contacts() {
  const { title, subtitle, phone, email, address } = siteContent.contacts;

  const formattedAddress = address.split("||").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <Section className="relative isolate min-h-[calc(103dvh)]" variant="hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-(--brand-olive-900)">
        <Image
          src="/images/sections/hero-contacts.webp"
          alt="Геодезически тахеометър / Robotic total station for precise surveying"
          fill
          preload
          sizes="100vw"
          className={clsx(
            "w-full h-full object-cover",
            "object-cover",
            "brightness-[0.35] contrast-[1.1]", // Darken slightly more for text legibility
            "object-[40%_65%]",
            "sm:object-[35%_72%]",
            "md:object-[40%_68%]",
            "lg:object-[80%_55%]"
          )}
        />
        {/* Green Brand Overlay */}
        <div className="absolute inset-0 z-1 bg-[rgba(63,76,69,0.18)]" />
      </div>

      <div className="mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="typo-h2 text-tx-inverse">{title}</h2>
          <p className="typo-hero-sub mt-4 mx-auto md:mx-0 text-tx-inverse/87">
            {subtitle}
          </p>

          {/* <div className="mx-auto mt-8 max-w-3xl text-center text-white/80 space-y-4">
            <p>
              Свържете се с GeoAxis за геодезически услуги в София и Софийска област.
              Можете да изпратите запитване при нужда от геодезическо заснемане,
              трасиране, кадастър, проектиране и градоустройство.
            </p>
            <p>
              Отговаряме според конкретния случай, вида на имота и необходимите следващи
              стъпки, за да получите по-ясна насока още в началото.
            </p>
          </div> */}
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-12 my-auto ">
            <ContactItem icon={<FaPhone />} title="Телефон" text={phone} />
            <ContactItem icon={<FaEnvelope />} title="Имейл" text={email} />
            <ContactItem icon={<FaHome />} title="Адрес" text={formattedAddress} />
          </div>

          {/* Glass Form */}
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
