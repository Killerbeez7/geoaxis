import clsx from "clsx";
import { FaViber } from "react-icons/fa6";
import { LuClock, LuPhone } from "react-icons/lu";
import { contactLinks, contacts } from "@/config/content/contacts";
import { Button } from "./Button";

type Props = {
  service?: string;
  title?: string;
  text?: string;
  className?: string;
};

// Sticky sidebar card on service and article pages: one clear next step plus the fastest channels.
export function InquiryCard({
  service,
  title = "Имате конкретен имот?",
  text = "Изпратете адрес или идентификатор и ще ви кажем срока, цената и какво е нужно.",
  className,
}: Props) {
  return (
    <div className={clsx("rounded-2xl border border-br-light bg-bg-page p-6 shadow-card", className)}>
      <p className="typo-eyebrow text-accent-text">Запитване</p>
      <p className="typo-h4 mt-3 text-tx-primary">{title}</p>
      <p className="typo-small mt-2 text-tx-muted">{text}</p>

      <Button
        href={service ? `/contacts?service=${service}` : "/contacts"}
        arrow
        track="quote_click"
        className="mt-5 w-full"
      >
        Поискайте оферта
      </Button>

      <div className="mt-5 grid gap-1 border-t border-br-light pt-4">
        <a
          href={contactLinks.tel}
          data-track="call_click"
          className="flex items-center gap-3 rounded-lg px-2 py-2 font-semibold text-tx-primary transition-colors hover:bg-bg-subtle"
        >
          <LuPhone aria-hidden="true" className="h-4 w-4 text-accent-text" />
          {contacts.phone}
        </a>
        <a
          href={contactLinks.viber}
          data-track="viber_click"
          className="flex items-center gap-3 rounded-lg px-2 py-2 font-semibold text-tx-primary transition-colors hover:bg-bg-subtle"
        >
          <FaViber aria-hidden="true" className="h-4 w-4 text-accent-text" />
          Пишете ни във Viber
        </a>
        <p className="typo-caption flex items-center gap-3 px-2 py-2 text-tx-muted">
          <LuClock aria-hidden="true" className="h-4 w-4" />
          {contacts.responseTime}
        </p>
      </div>
    </div>
  );
}
