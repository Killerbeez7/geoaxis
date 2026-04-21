import { IconType } from "react-icons";
import { LuClock, LuFileCheck, LuCrosshair, LuMessageSquare } from "react-icons/lu";

export interface TrustCard {
  title: string;
  text: string;
  icon: IconType;
}

export interface TrustContent {
  id: "trust";
  kicker: string;
  title: string;
  subtitle: string;
  trustCards: TrustCard[];
}

export const trust: TrustContent = {
  id: "trust",
  kicker: "Защо да изберете нас",
  // kicker: "Подход",
  title: "Яснота и сигурност във всяка стъпка",
  // title: "Яснота и сигурност",
  subtitle:
    "Работим с внимание към детайла и ясна организация,\nза да знаете какво предстои и да сте спокойни през целия процес.",

  trustCards: [
    {
      title: "Точни срокове",
      text: "Планираме и изпълняваме поетите ангажименти без забавяне.",
      icon: LuClock,
    },
    {
      title: "Подредени документи",
      text: "Пълно съдействие при подготовка на документи към АГКК и общини.",

      icon: LuFileCheck,
    },
    {
      title: "Прецизна работа",
      text: "Съвременна апаратура за максимална точност при заснемане.",
      icon: LuCrosshair,
    },
    {
      title: "Ясна комуникация",
      text: "Разбираеми обяснения на процеса и постоянна обратна връзка.",
      icon: LuMessageSquare,
    },
  ],
} as const;
