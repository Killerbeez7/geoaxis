import Link from "next/link";
import clsx from "clsx";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { SiViber, SiWhatsapp } from "react-icons/si";

import { FOOTER } from "@/config/footer";
import { contactLinks } from "@/config/content/contacts";
import { getCompanyLines } from "@/config/content/company";

export const Footer = () => {
  const { brand, sections, contact, legalLinks } = FOOTER;
  const companyLines = getCompanyLines();

  const [quickLinksSection, serviceLinksSection] = sections;

  const phone = contact.phone;
  const email = contact.email;
  const addressLines = contact.addressLines;
  const mapsHref = contact.mapsHref;

  const telHref = contactLinks.tel;
  const mailHref = contactLinks.mail;

  // Styles
  const sectionTitle =
    "font-semibold text-md uppercase tracking-[0.16em] text-tx-inverse/60";
  const linkCls = clsx(
    "inline-flex items-center gap-2 py-1",
    "font-semibold text-tx-inverse/85",
    "transition-colors duration-200 hover:text-accent-on-dark"
  );
  const metaCls = "text-sm leading-relaxed text-tx-inverse";
  const dot =
    "before:content-[''] before:h-[6px] before:w-[6px] before:rounded-full before:bg-accent";

  const iconBtn = clsx(
    "inline-flex h-10 w-10 items-center justify-center",
    "rounded-full bg-white/10 text-tx-inverse",
    "transition duration-200",
    "hover:bg-white/20 hover:scale-110 active:scale-100"
  );

  return (
    <footer className="relative bg-bg-footer">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 to-black/25" />

      <div className="container-page relative py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-10 text-center lg:grid-cols-4 lg:text-left">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold tracking-wide text-tx-inverse">
              {brand.name}
            </p>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-tx-inverse/75 text-balance">
              {brand.tagline}
            </p>
            <p className="font-mont mt-4 text-xs uppercase tracking-[0.16em] text-balance text-tx-inverse/60">
              {brand.metaLine}
            </p>
            {companyLines.length > 0 ? (
              <ul className="mt-4 space-y-1 text-xs leading-5 text-tx-inverse/70">
                {companyLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Quick Links */}
          <div>
            <p className={sectionTitle}>{quickLinksSection.title}</p>
            <ul className="mt-4 space-y-1">
              {quickLinksSection.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${linkCls} ${dot}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className={sectionTitle}>{serviceLinksSection.title}</p>
            <ul className="mt-4 space-y-1">
              {serviceLinksSection.links.map((link) => (
                <li key={link.href}>
                  <Link href={`${link.href}`} className={`${linkCls} ${dot}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className={sectionTitle}>Контакти</p>

            <div className="mt-4 space-y-2">
              <p className={metaCls}>
                <span className="text-tx-inverse/60">Имейл:</span>{" "}
                <a className={linkCls} href={mailHref}>
                  {email}
                </a>
              </p>

              <p className={metaCls}>
                <span className="text-tx-inverse/60">Телефон:</span>{" "}
                <a className={linkCls} href={telHref}>
                  {phone}
                </a>
              </p>

              <p className={metaCls}>
                <span className="text-tx-inverse/60">Адрес:</span>{" "}
                {addressLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < addressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>

            {/* Icons */}
            <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a className={iconBtn} href={telHref} aria-label="Обадете се">
                <FaPhone aria-hidden="true" />
              </a>
              <a className={iconBtn} href={mailHref} aria-label="Пишете ни на имейл">
                <FaEnvelope aria-hidden="true" />
              </a>
              <a
                className={iconBtn}
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Адрес в Google Maps"
              >
                <FaLocationDot aria-hidden="true" />
              </a>
              <a
                className={iconBtn}
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Пишете ни в WhatsApp"
              >
                <SiWhatsapp aria-hidden="true" />
              </a>
              <a className={iconBtn} href={contactLinks.viber} aria-label="Пишете ни във Viber">
                <SiViber aria-hidden="true" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-br-strong/40 bg-black/20">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-col items-center justify-center gap-3 px-6 py-4 text-center sm:px-8 lg:flex-row lg:justify-between lg:px-12">
          <p className="text-sm tracking-wide text-tx-inverse/80">
            © {new Date().getFullYear()} {brand.name}. Всички права запазени.
          </p>

          <nav
            aria-label="Правна информация"
            className="flex flex-wrap justify-center gap-x-4 gap-y-2"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-tx-inverse/65 transition hover:text-accent-on-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
