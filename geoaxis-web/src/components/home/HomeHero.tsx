import Image from "next/image";
import { LuPhone } from "react-icons/lu";

import { hero } from "@/config/content/hero";
import { contactLinks, contacts } from "@/config/content/contacts";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Eyebrow, Text } from "@/components/ui/Text";
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
      {/* Neutral shade only behind the text, so the warm light of the photo stays true */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/45 to-black/25 md:bg-linear-to-r md:from-black/75 md:via-black/40 md:to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-black/60 to-transparent" />

      <p
        aria-hidden="true"
        className="typo-label absolute right-8 top-[calc(var(--header-h)+2rem)] hidden tracking-[0.2em] text-white/50 tabular-nums lg:block"
      >
        42.6977° N · 23.3219° E
      </p>

      <div className="container-page flex min-h-[calc(100svh+2rem)] flex-col pb-14 md:min-h-[min(100svh,60rem)] md:pb-10 pt-[calc(var(--header-h)+2.5rem)] lg:pt-[calc(var(--header-h)+6rem)]">
        <div className="max-w-2xl flex-1">
          {/* The last topic is dropped on phones so the kicker stays on one line */}
          <Eyebrow>
            <span>
              {hero.eyebrow.split(" · ").map((part, index) => (
                <span key={part} className={index > 1 ? "hidden sm:inline" : undefined}>
                  {index > 0 ? " · " : ""}
                  {part}
                </span>
              ))}
            </span>
          </Eyebrow>
          <h1 className="typo-display mt-5">
            {hero.title} <span className="text-accent-on-dark">{hero.titleAccent}</span>
          </h1>
          <Text size="lead" className="mt-6 max-w-xl">
            {hero.lead}
          </Text>

          <div className="mt-8 md:mt-10">
            <Text size="small" weight="semibold" tone="strong">
              {hero.quickStartLabel}
            </Text>
            {/* One scrollable row on phones keeps the main button above the fold */}
            <ul className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {hero.quickStart.map((option) => (
                <li key={option.label} className="shrink-0">
                  <Chip
                    href={"service" in option ? `/contacts?service=${option.service}` : option.href}
                    tone="dark"
                    size="sm"
                    track="hero_quickstart"
                    className="backdrop-blur-sm"
                  >
                    {option.label}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>

          {/* On phones the bottom bar carries these actions */}
          <div className="mt-8 hidden gap-3 md:flex">
            <Button href="/contacts" size="lg" arrow track="quote_click">
              Поискайте оферта
            </Button>
            <Button
              href={contactLinks.tel}
              size="lg"
              variant="outline-light"
              icon={<LuPhone className="h-4 w-4" />}
              track="call_click"
              className="tabular-nums"
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
