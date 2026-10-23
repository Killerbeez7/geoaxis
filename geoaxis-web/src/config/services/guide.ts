// Situations a visitor can pick from when they don't know which service they need.
// Also used by the quote form to show what to prepare for the chosen service.
export type GuideOption = {
  id: string;
  label: string;
  service: string;
  recommendation: string;
  explanation: string;
  prepare: string[];
  learnMore: { label: string; href: string };
};

export const GUIDE_OPTIONS: readonly GuideOption[] = [
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

const DEFAULT_PREPARE = ["Адрес или идентификатор на имота", "Каквито документи имате под ръка"];

export function getPrepareList(service: string) {
  return GUIDE_OPTIONS.find((option) => option.service === service)?.prepare ?? DEFAULT_PREPARE;
}
