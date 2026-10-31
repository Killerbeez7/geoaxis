"use client";

import { useState } from "react";
import clsx from "clsx";
import { track } from "@vercel/analytics";
import { LuCircleCheck, LuMousePointerClick } from "react-icons/lu";

import { GUIDE_OPTIONS } from "@/config/services/guide";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";

export function ServiceGuide() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = GUIDE_OPTIONS.find((option) => option.id === selectedId);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
      <fieldset>
        <legend className="typo-h4 mb-4">Какво е вашето положение?</legend>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {GUIDE_OPTIONS.map((option) => {
            const isSelected = option.id === selectedId;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedId(option.id);
                  track("guide_choice", { choice: option.id });
                }}
                className={clsx(
                  "flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left font-medium transition-colors",
                  isSelected
                    ? "border-accent bg-accent-soft text-tx-primary"
                    : "border-br-light bg-bg-page text-tx-secondary hover:border-br-accent"
                )}
              >
                {option.label}
                <span
                  aria-hidden="true"
                  className={clsx(
                    "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected ? "border-accent bg-accent" : "border-br-default"
                  )}
                >
                  {isSelected ? <span className="h-1.5 w-1.5 rounded-full bg-bg-page" /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite" className="rounded-3xl border border-br-light bg-bg-page p-6 shadow-card sm:p-8">
        {selected ? (
          <div>
            <Eyebrow>Препоръка</Eyebrow>
            <Heading as="h3" className="mt-3">
              {selected.recommendation}
            </Heading>
            <Text className="mt-3 max-w-xl">{selected.explanation}</Text>

            <Text size="small" weight="semibold" tone="strong" className="mt-7">
              Подгответе, ако имате:
            </Text>
            <CheckList items={selected.prepare} className="typo-small mt-3" />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={`/contacts?service=${selected.service}`} arrow track="quote_click">
                Поискайте оферта
              </Button>
              <Button href={selected.learnMore.href} variant="outline">
                {selected.learnMore.label}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-56 flex-col items-center justify-center text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-text">
              <LuMousePointerClick aria-hidden="true" className="h-7 w-7" />
            </span>
            <Heading as="p" size="h4" className="mt-5">
              Изберете вашата ситуация
            </Heading>
            <Text size="small" className="mt-2 max-w-sm">
              Ще ви покажем подходящата услуга и какво е добре да подготвите, преди да се свържете с нас.
            </Text>
            <p className="typo-small tone-muted mt-6 inline-flex items-center gap-2">
              <LuCircleCheck aria-hidden="true" className="h-4 w-4 text-accent-text" />
              Отнема под минута
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
