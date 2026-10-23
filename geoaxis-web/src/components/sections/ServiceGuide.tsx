"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { track } from "@vercel/analytics";
import { MdArrowRightAlt } from "react-icons/md";
import { CtaButton } from "@/components/parts/CtaButton";

type GuideOption = {
  id: string;
  label: string;
  service: string;
  recommendation: string;
  explanation: string;
  prepare: string[];
  learnMore: { label: string; href: string };
};

const OPTIONS: GuideOption[] = [
  {
    id: "build",
    label: "Ще строя или проектирам",
    service: "zasnemane",
    recommendation: "Геодезическо заснемане за проектиране",
    explanation:
      "Проектантът се нуждае от актуална основа на терена. След одобрен проект следва трасиране на сградата на място.",
    prepare: ["Адрес или идентификатор на имота", "Скица или стар план, ако има", "Каква сграда се планира"],
    learnMore: { label: "Заснемане за проектиране", href: "/uslugi/zasnemane/za-proektirane" },
  },
  {
    id: "fence",
    label: "Ще правя ограда / спор за граници",
    service: "trasirane",
    recommendation: "Трасиране на имотни граници",
    explanation:
      "Отбелязваме на място къде минават границите според кадастралните данни, за да няма спорове след това.",
    prepare: ["Идентификатор или скица на имота", "Документ за собственост", "Достъп до имота"],
    learnMore: { label: "Трасиране на имотни граници", href: "/uslugi/trasirane/na-imotni-granici" },
  },
  {
    id: "deal",
    label: "Купувам, продавам или наследявам имот",
    service: "kadastar",
    recommendation: "Проверка на кадастралните данни",
    explanation:
      "Преди сделка е добре да се провери дали имотът и сградите са отразени правилно в кадастъра. При разлики подготвяме нужните документи.",
    prepare: ["Нотариален акт или друг документ за собственост", "Скица или схема, ако има"],
    learnMore: { label: "Кадастрални услуги", href: "/uslugi/kadastar" },
  },
  {
    id: "finished",
    label: "Сградата е построена",
    service: "zasnemane",
    recommendation: "Екзекутивно заснемане и нанасяне в кадастъра",
    explanation:
      "Заснемаме изпълнената сграда и подготвяме материалите за отразяването ѝ в кадастралната карта.",
    prepare: ["Одобрен проект и разрешение за строеж", "Документ за собственост", "Протоколи от трасирането, ако има"],
    learnMore: { label: "Екзекутивно заснемане", href: "/uslugi/zasnemane/ekzekutivno-zasnemane" },
  },
  {
    id: "change",
    label: "Делба, ПУП или смяна на предназначение",
    service: "gradoustroistvo",
    recommendation: "Градоустройствена процедура",
    explanation:
      "Изготвяме проекта според намерението ви и ви насочваме през съгласуването с общината и кадастъра.",
    prepare: ["Документ за собственост", "Скица на имота", "Кратко описание какво искате да постигнете"],
    learnMore: { label: "Градоустройство и ПУП", href: "/uslugi/gradoustroistvo" },
  },
  {
    id: "unsure",
    label: "Не съм сигурен",
    service: "konsultacia",
    recommendation: "Първоначална консултация",
    explanation:
      "Опишете накратко ситуацията. Ще ви кажем каква услуга е нужна, какви документи да подготвите и колко време отнема.",
    prepare: ["Адрес на имота", "Каквито документи имате под ръка"],
    learnMore: { label: "Консултации", href: "/uslugi/konsultacia" },
  },
];

export function ServiceGuide() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = OPTIONS.find((option) => option.id === selectedId);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
      <fieldset>
        <legend className="mb-4 text-base font-semibold text-tx-primary">Какво е вашето положение?</legend>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {OPTIONS.map((option) => {
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
                  "flex min-h-12 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-[15px] font-medium transition",
                  isSelected
                    ? "border-accent bg-accent/10 text-tx-primary"
                    : "border-br-light bg-bg-page text-tx-secondary hover:border-br-accent-soft"
                )}
              >
                {option.label}
                <span
                  aria-hidden="true"
                  className={clsx(
                    "h-4 w-4 shrink-0 rounded-full border-2",
                    isSelected ? "border-accent bg-accent" : "border-br-default"
                  )}
                />
              </button>
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite" className="rounded-card border border-br-light bg-bg-page p-6 shadow-sm sm:p-8">
        {selected ? (
          <>
            <p className="typo-kicker">Препоръка</p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-tx-primary">
              {selected.recommendation}
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-tx-secondary">{selected.explanation}</p>

            <p className="mt-6 text-sm font-semibold text-tx-primary">Подгответе, ако имате:</p>
            <ul className="mt-2 space-y-2">
              {selected.prepare.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-tx-secondary">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <CtaButton href={`/contacts?service=${selected.service}`}>Изпратете запитване</CtaButton>
              <Link
                href={selected.learnMore.href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent-text"
              >
                {selected.learnMore.label}
                <MdArrowRightAlt aria-hidden="true" className="text-lg" />
              </Link>
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-48 flex-col justify-center">
            <p className="text-lg font-semibold text-tx-primary">Изберете вариант вляво</p>
            <p className="mt-2 text-[15px] leading-7 text-tx-secondary">
              Ще ви покажем подходящата услуга и какво е добре да подготвите, преди да се свържете
              с нас.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
