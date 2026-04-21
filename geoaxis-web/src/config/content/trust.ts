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
  kicker: "Подход",
  title: "Яснота и сигурност още от първата стъпка",
  subtitle:
    "Работим с внимание към детайла и ясна организация, така че да знаете какво предстои и да се чувствате спокойни през целия процес.",

  trustCards: [
    {
      title: "Ясни срокове",
      text: "Реалистични срокове и ясно разписани етапи.",
      icon: LuClock,
    },
    {
      title: "Подредени документи",
      text: "Съдействие за необходимите документи и следващи стъпки.",
      icon: LuFileCheck,
    },
    {
      title: "Прецизна работа",
      text: "Внимание към всяко измерване и сигурност в резултата.",
      icon: LuCrosshair,
    },
    {
      title: "Ясна комуникация",
      text: "Обясняваме процеса ясно и отговаряме на въпросите ви.",
      icon: LuMessageSquare,
    },
  ],
} as const;
