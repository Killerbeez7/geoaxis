import type { IconType } from "react-icons";
import { LuBadgeCheck, LuClock, LuMapPin, LuSatellite } from "react-icons/lu";

export type TrustItem = { icon: IconType; title: string; text: string };

// Proof points shown near calls to action. Every item must stay factually true.
export const TRUST_ITEMS: readonly TrustItem[] = [
  { icon: LuBadgeCheck, title: "Опит от 2008 г.", text: "в геодезията и кадастъра" },
  { icon: LuSatellite, title: "GNSS и тотални станции", text: "всяко измерване се проверява" },
  { icon: LuMapPin, title: "София и област", text: "други райони по договаряне" },
  { icon: LuClock, title: "Отговор до 1 работен ден", text: "оферта преди започване" },
];
