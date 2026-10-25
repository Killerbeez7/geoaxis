import clsx from "clsx";
import type { ReactNode } from "react";
import { FaViber } from "react-icons/fa6";
import { LuMail, LuPhone } from "react-icons/lu";
import { contactLinks, contacts } from "@/config/content/contacts";

type Props = { dark?: boolean; showEmail?: boolean; className?: string };

// Phone first (fastest), then chat apps and email; shared by the CTA band and the contact page.
export function ContactChannels({ dark = false, showEmail = true, className }: Props) {
  const row = clsx(
    "group flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors",
    dark ? "hover:bg-white/6" : "hover:bg-bg-subtle"
  );
  const icon = clsx(
    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
    dark ? "bg-white/8 text-accent-on-dark" : "bg-accent-soft text-accent-text"
  );

  const item = (glyph: ReactNode, label: string, value: ReactNode, valueClass?: string) => (
    <>
      <span className={icon}>{glyph}</span>
      <span className="min-w-0">
        <span className="typo-small tone-muted block">{label}</span>
        <span className={clsx("typo-h5 block", valueClass)}>{value}</span>
      </span>
    </>
  );

  return (
    <div className={clsx("grid gap-1", className)}>
      <a href={contactLinks.tel} className={row} data-track="call_click">
        {item(<LuPhone aria-hidden="true" className="h-5 w-5" />, "Телефон", contacts.phone, "tabular-nums")}
      </a>
      <a href={contactLinks.viber} className={row} data-track="viber_click">
        {item(<FaViber aria-hidden="true" className="h-5 w-5" />, "Viber", contacts.phone, "tabular-nums")}
      </a>
      {showEmail ? (
        <a href={contactLinks.mail} className={row} data-track="email_click">
          {item(<LuMail aria-hidden="true" className="h-5 w-5" />, "Имейл", contacts.email, "break-all")}
        </a>
      ) : null}
    </div>
  );
}
