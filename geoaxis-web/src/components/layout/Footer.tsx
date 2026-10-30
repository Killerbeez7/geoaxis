import Link from "next/link";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";

import { brand } from "@/config/content/brand";
import { contactLinks, contacts } from "@/config/content/contacts";
import { getCompanyLines } from "@/config/content/company";
import { LEGAL_LINKS } from "@/config/nav";
import { HELPFUL_NAV_ITEMS } from "@/config/polezno/helpful-nav";
import { serviceCategories } from "@/config/services/categories";
import { Logo } from "@/components/ui/Logo";
import { Eyebrow } from "@/components/ui/Text";

const COMPANY_LINKS = [
  { label: "Проекти", href: "/projects" },
  { label: "За нас", href: "/about" },
  { label: "Контакти", href: "/contacts" },
  { label: "Поискайте оферта", href: "/contacts" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <Eyebrow>{title}</Eyebrow>
      <ul className="typo-ui mt-5 grid gap-3">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link href={link.href} className="text-tx-inverse-muted transition-colors hover:text-tx-inverse">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const companyLines = getCompanyLines();
  const [street, city] = contacts.address.split("||").map((part) => part.trim());

  return (
    <footer className="on-dark border-t border-white/10 bg-bg-deep">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16 lg:py-20">
        <div>
          <Link href="/" className="inline-flex rounded-lg text-tx-inverse" aria-label="GeoAxis – начало">
            <Logo markId="logo-mark-footer" markClassName="h-9 w-9" />
          </Link>
          <p className="mt-5 max-w-sm">{brand.description}</p>
          <ul className="typo-ui mt-6 grid gap-3">
            <li>
              <a href={contactLinks.tel} data-track="call_click" className="inline-flex items-center gap-2.5 font-semibold text-tx-inverse tabular-nums hover:text-accent-on-dark">
                <LuPhone aria-hidden="true" className="h-4 w-4 text-accent-on-dark" />
                {contacts.phone}
              </a>
            </li>
            <li>
              <a href={contactLinks.mail} data-track="email_click" className="inline-flex items-center gap-2.5 break-all text-tx-inverse-muted hover:text-tx-inverse">
                <LuMail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-on-dark" />
                {contacts.email}
              </a>
            </li>
            {contacts.showAddress ? (
              <li>
                <a
                  href={contacts.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 text-tx-inverse-muted hover:text-tx-inverse"
                >
                  <LuMapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-on-dark" />
                  <span>
                    {street}, {city}
                  </span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <FooterColumn
            title="Услуги"
            links={[
              ...serviceCategories.map((category) => ({
                label: category.shortTitle ?? category.title,
                href: `/uslugi/${category.slug}`,
              })),
              { label: "Всички услуги", href: "/uslugi" },
            ]}
          />
          <FooterColumn
            title="Полезно"
            links={[
              ...HELPFUL_NAV_ITEMS.map((item) => ({ label: item.label, href: item.href })),
              { label: "Всички материали", href: "/polezno" },
            ]}
          />
          <FooterColumn title="GeoAxis" links={COMPANY_LINKS} />
        </div>
      </div>

      <div className="border-t border-br-strong/20 bg-black/20">
        <div className="container-page flex min-h-16 flex-col items-center justify-center gap-3 py-4 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="typo-small tracking-wide text-tx-inverse-muted">
            <p>
              © {new Date().getFullYear()} {brand.name} – Bulgaria.{" "}
              <span className="max-lg:block">Всички права запазени.</span>
            </p>
            {companyLines.length > 0 ? (
              <p className="typo-caption mt-1 tracking-normal">{companyLines.join(" · ")}</p>
            ) : null}
          </div>
          <nav aria-label="Правна информация">
            <ul className="typo-caption flex flex-wrap justify-center gap-x-5 gap-y-2 font-medium">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-tx-inverse-subtle transition-colors hover:text-accent-on-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
