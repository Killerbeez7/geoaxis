import Image from "next/image";
import Link from "next/link";
import { LuPhone } from "react-icons/lu";

import { hero } from "@/config/content/hero";
import { contactLinks, contacts } from "@/config/content/contacts";
import { Button } from "@/components/ui/Button";
import { TrustBar } from "@/components/ui/TrustBar";

export function HomeHero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-bg-deep">
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-bg-deep via-bg-deep/80 to-bg-deep/25"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-bg-deep to-transparent" />

      <p
        aria-hidden="true"
        className="typo-caption absolute right-8 top-[calc(var(--header-h)+2rem)] hidden font-medium tracking-[0.2em] text-white/55 tabular-nums lg:block"
      >
        42.6977° N · 23.3219° E
      </p>

      <div className="container-page flex min-h-[min(100svh,60rem)] flex-col pb-10 pt-[calc(var(--header-h)+3.5rem)] lg:pt-[calc(var(--header-h)+6rem)]">
        <div className="max-w-2xl flex-1">
          <p className="typo-eyebrow text-accent-on-dark">{hero.eyebrow}</p>
          <h1 className="typo-display mt-5">
            {hero.title} <span className="text-accent-on-dark">{hero.titleAccent}</span>
          </h1>
          <p className="typo-lead mt-6 max-w-xl text-tx-inverse-muted">{hero.lead}</p>

          <div className="mt-9">
            <p className="typo-small font-semibold text-tx-inverse">{hero.quickStartLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {hero.quickStart.map((option) => (
                <li key={option.label}>
                  <Link
                    href={"service" in option ? `/contacts?service=${option.service}` : option.href}
                    data-track="hero_quickstart"
                    className="typo-small inline-flex h-10 items-center rounded-full border border-white/20 bg-white/8 px-4 font-medium text-tx-inverse backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent hover:text-tx-on-accent"
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contacts" size="lg" arrow track="quote_click">
              Поискайте оферта
            </Button>
            <Button
              href={contactLinks.tel}
              size="lg"
              variant="outline-light"
              icon={<LuPhone className="h-4 w-4" />}
              track="call_click"
            >
              {contacts.phone}
            </Button>
          </div>
        </div>

        <div className="mt-14 hidden md:block">
          <TrustBar variant="overlay" />
        </div>
      </div>
    </section>
  );
}
