import { CtaButton } from "@/components/parts/CtaButton";
import { siteContent } from "@/config/site-content";
import { FaPhone } from "react-icons/fa";
import { Section } from "../layout/Section";

export function FinalCta() {
  const { phone } = siteContent.contacts;

  return (
    <Section tone="brand" className="border-t border-br-light/70">
      <div className="flex items-center">
        <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0 pl-4">
          <p className="typo-kicker text-accent">Контакт</p>

          <h2 className="mt-3 typo-h2 text-tx-inverse">
            Имате нужда от <span className="text-accent">геодезическа услуга?</span>
          </h2>

          {/* <p className="typo-body mt-4 max-w-xl text-tx-inverse/75"> */}
          <p className="typo-body mt-4 max-w-xl mx-auto text-tx-inverse/75 lg:mx-0">
            Свържете се с нас за консултация. Ще разгледаме вашия случай и ще предложим
            най-подходящото решение за вашия имот или проект.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 lg:ml-auto lg:w-[320px] lg:items-start">
          <CtaButton href="/contacts" size="lg">
            Изпрати запитване
          </CtaButton>

          <a href={`tel:${phone}`} className="flex items-center gap-3 lg:pl-1">
            <FaPhone className="text-accent" />
            <span className="typo-body font-medium text-tx-inverse/75 transition-colors hover:text-accent">
              {phone}
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}
