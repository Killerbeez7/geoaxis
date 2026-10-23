import type { StatItem } from "./stats";

export interface WhyUsContent {
  id: "why-us";
  kicker: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  brandName?: string;
  image: string;
  imageAlt: string;
  stats?: StatItem[];
}
export const whyUs: WhyUsContent = {
  id: "why-us",
  kicker: "Експертиза и доверие",
  title: "Защо да изберете",
  subtitle:
    "Геодезически услуги с фокус върху прецизността и личното отношение към всеки проект.",
  paragraphs: [
    "Опитът ни в геодезията започва през 2008 г. Оттогава сме преминали през стотици казуси – от трасиране на ограда до ПУП и нанасяне на сгради в кадастъра.",
    "Преди всяка задача уточняваме обхвата, документите и срока, за да знаете какво предстои и какво ще получите накрая.",
    "Използваме GNSS приемници и тотални станции и проверяваме всяко измерване, преди да предадем резултата.",
  ],
  image: "/images/sections/hero-contacts.webp",
  imageAlt: "Екипът на GeoAxis извършва прецизни геодезически измервания на терен",
} as const;
