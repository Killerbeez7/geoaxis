import clsx from "clsx";
import { FaViber, FaWhatsapp } from "react-icons/fa6";
import { LuClock, LuMail, LuPhone } from "react-icons/lu";
import { contactLinks, contacts } from "@/config/content/contacts";

type Props = { dark?: boolean; showEmail?: boolean; showWhatsapp?: boolean; className?: string };

// Phone first (fastest), then chat apps and email; shared by the CTA band, footer and contact page.
export function ContactChannels({ dark = false, showEmail = true, showWhatsapp = false, className }: Props) {
  const row = clsx(
    "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
    dark ? "hover:bg-white/6" : "hover:bg-bg-subtle"
  );
  const icon = clsx(
    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
    dark ? "bg-white/8 text-accent-on-dark" : "bg-accent-soft text-accent-text"
  );
  const label = clsx("typo-caption", dark ? "text-tx-inverse-muted" : "text-tx-muted");
  const value = clsx("font-semibold", dark ? "text-tx-inverse" : "text-tx-primary");

  return (
    <div className={clsx("grid gap-1", className)}>
      <a href={contactLinks.tel} className={row} data-track="call_click">
        <span className={icon}>
          <LuPhone aria-hidden="true" className="h-5 w-5" />
        </span>
        <span>
          <span className={clsx("block", label)}>Телефон</span>
          <span className={clsx("block text-lg", value)}>{contacts.phone}</span>
        </span>
      </a>
      <a href={contactLinks.viber} className={row} data-track="viber_click">
        <span className={icon}>
          <FaViber aria-hidden="true" className="h-5 w-5" />
        </span>
        <span>
          <span className={clsx("block", label)}>Viber</span>
          <span className={clsx("block", value)}>Пишете ни във Viber</span>
        </span>
      </a>
      {showWhatsapp ? (
        <a
          href={contactLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={row}
          data-track="whatsapp_click"
        >
          <span className={icon}>
            <FaWhatsapp aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>
            <span className={clsx("block", label)}>WhatsApp</span>
            <span className={clsx("block", value)}>Пишете ни в WhatsApp</span>
          </span>
        </a>
      ) : null}
      {showEmail ? (
        <a href={contactLinks.mail} className={row} data-track="email_click">
          <span className={icon}>
            <LuMail aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className={clsx("block", label)}>Имейл</span>
            <span className={clsx("block break-all", value)}>{contacts.email}</span>
          </span>
        </a>
      ) : null}
      <div className={clsx("flex items-center gap-3 px-3 py-2.5")}>
        <span className={icon}>
          <LuClock aria-hidden="true" className="h-5 w-5" />
        </span>
        <span>
          <span className={clsx("block", label)}>Работно време</span>
          <span className={clsx("block", value)}>{contacts.workingHours}</span>
        </span>
      </div>
    </div>
  );
}
