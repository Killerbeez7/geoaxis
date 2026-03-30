import { FaHome, FaPhone, FaEnvelope } from "react-icons/fa";
import { siteContent } from "@/config/site-content";
import { CtaButton } from "@/components/parts/CtaButton";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import clsx from "clsx";

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

function FloatingInput({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div className="relative">
      <input
        type={type}
        required
        placeholder=" "
        className="
                peer w-full px-4 pt-6 pb-2 rounded-xl
                bg-white/5
                border border-white/10
                text-white placeholder-transparent
                backdrop-blur-md
                focus:outline-none
                focus:border-color-accent
                focus:ring-2 focus:ring-color-accent/20
                transition-all duration-200
            "
      />
      <label
        className="
                absolute left-4 top-1/2 -translate-y-1/2
                text-white/50 text-base
                transition-all duration-200
                peer-focus:text-accent
                peer-focus:text-sm
                peer-focus:top-2
                peer-focus:translate-y-0
                peer-not-placeholder-shown:text-accent
                peer-not-placeholder-shown:text-sm
                peer-not-placeholder-shown:top-2
                peer-not-placeholder-shown:translate-y-0
                pointer-events-none
            "
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label }: { label: string }) {
  return (
    <div className="relative">
      <textarea
        required
        rows={4}
        placeholder=" "
        className="
                peer w-full px-4 pt-6 pb-2 rounded-xl
                bg-white/5
                border border-white/10
                text-white placeholder-transparent resize-none
                backdrop-blur-md
                focus:outline-none
                focus:border-accent
                focus:ring-2 focus:ring-accent/20
                transition-all duration-200
            "
      />
      <label
        className="
                absolute left-4 top-5 -translate-y-1/2
                text-white/50 text-base
                transition-all duration-200
                peer-focus:text-accent
                peer-focus:text-sm
                peer-focus:top-2
                peer-focus:translate-y-0
                peer-not-placeholder-shown:text-accent
                peer-not-placeholder-shown:text-sm
                peer-not-placeholder-shown:top-2
                peer-not-placeholder-shown:translate-y-0
                pointer-events-none
            "
      >
        {label}
      </label>
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
      <div className="absolute inset-0 z-0">
        <Image
          // src="/images/projects/project-5.jpg"
          src="/images/plamen.png"
          alt="Геодезически тахеометър / Robotic total station for precise surveying"
          fill
          fetchPriority="high"
          className={clsx(
            "w-full h-full object-cover",
            "object-[15%_50%]", // 15% from left, 50% (centered) vertically
            "brightness-[0.35] contrast-[1.1]" // Darken slightly more for text legibility
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
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-12 my-auto ">
            <ContactItem icon={<FaPhone />} title="Телефон" text={phone} />
            <ContactItem icon={<FaEnvelope />} title="Имейл" text={email} />
            <ContactItem icon={<FaHome />} title="Адрес" text={formattedAddress} />
          </div>

          {/* Glass Form */}
          <div
            className="
                        rounded-3xl
                      bg-white/4
                        backdrop-blur-2xl
                        border border-white/8
                        p-12
                        shadow-2xl
                    "
          >
            <h3 className="mb-8 typo-h3 text-tx-inverse">Изпратете запитване</h3>

            <form className="space-y-6">
              <FloatingInput label="Вашето име" />
              <FloatingInput label="Имейл адрес" type="email" />
              <FloatingTextarea label="Вашето съобщение" />

              <CtaButton type="submit" size="lg" variant="glassAccent" className="w-full">
                Изпрати съобщение
              </CtaButton>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
