import Link from "next/link";
import clsx from "clsx";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { SiViber, SiWhatsapp } from "react-icons/si";
import { CtaButton } from "../parts/CtaButton";

import { FOOTER } from "@/config/footer";

export const Footer = () => {
  const { brand, sections, contact, ctas } = FOOTER;

  const [quickLinksSection, serviceLinksSection] = sections;

  const phone = contact.phone;
  const email = contact.email;
  const addressLines = contact.addressLines;
  const mapsHref = contact.mapsHref;

  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${email}`;

  // Styles
  const sectionTitle =
    "font-semibold text-md uppercase tracking-[0.16em] text-tx-inverse/60";
  const linkCls = clsx(
    "inline-flex items-center gap-2 py-1",
    "font-semibold text-tx-inverse/85",
    "transition-colors duration-200 hover:text-accent"
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
      {/* <footer className="relative bg-bg-nav"> */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 to-black/25" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 text-center lg:grid-cols-4 lg:text-left">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold tracking-wide text-tx-inverse">
              {brand.name}
            </h3>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-tx-inverse/75 text-balance">
              {brand.tagline}
            </p>
            <p className="font-mont mt-4 text-xs uppercase tracking-[0.16em] text-balance text-tx-inverse/60">
              {brand.metaLine}
            </p>
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
                <span className="text-tx-inverse/60">Email:</span>{" "}
                <a className={linkCls} href={mailHref}>
                  {email}
                </a>
              </p>

              <p className={metaCls}>
                <span className="text-tx-inverse/60">Phone:</span>{" "}
                <a className={linkCls} href={telHref}>
                  {phone}
                </a>
              </p>

              <p className={metaCls}>
                <span className="text-tx-inverse/60">Address:</span>{" "}
                {addressLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < addressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>

            <div className="mt-5 flex justify-center gap-3 lg:justify-start">
              <a className={iconBtn} href={telHref} aria-label="Call">
                <FaPhone />
              </a>
              <a className={iconBtn} href={mailHref} aria-label="Email">
                <FaEnvelope />
              </a>
              <a
                className={iconBtn}
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Maps"
              >
                <FaLocationDot />
              </a>

              {/* If you later add whatsapp/viber urls to config, wire them here */}
              <a className={iconBtn} href={telHref} aria-label="WhatsApp">
                <SiWhatsapp />
              </a>
              <a className={iconBtn} href={telHref} aria-label="Viber">
                <SiViber />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link href={ctas.inquiry.href}>
                <CtaButton size="sm">{ctas.inquiry.label}</CtaButton>
              </Link>

              <Link href={ctas.projects.href}>
                <CtaButton size="sm" variant="glass">
                  {ctas.projects.label}
                </CtaButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-12 border-t border-br-strong/40 bg-black/20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-6 sm:px-8 lg:px-12">
          <p className="text-center text-sm tracking-wide text-tx-inverse/80">
            © {new Date().getFullYear()} {brand.name} - Bulgaria. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
};
