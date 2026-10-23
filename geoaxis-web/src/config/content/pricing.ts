import type { IconType } from "react-icons";
import { LuClipboardList, LuMountain, LuReceipt, LuRepeat, LuRoute, LuTimer } from "react-icons/lu";

export type PriceFactor = { icon: IconType; title: string; text: string };

// Shown on service pages next to the starting price ("от X лв."), which is set per service.
export const PRICE_FACTORS: readonly PriceFactor[] = [
  { icon: LuClipboardList, title: "Вид и цел на услугата", text: "за проект, за кадастър или за строителство" },
  { icon: LuMountain, title: "Площ и терен", text: "наклон, растителност, застрояване" },
  { icon: LuRoute, title: "Местоположение", text: "пътни разходи извън София" },
  { icon: LuRepeat, title: "Брой посещения", text: "когато работата е на етапи" },
  { icon: LuReceipt, title: "Такси към институции", text: "АГКК или община, когато процедурата ги изисква" },
  { icon: LuTimer, title: "Срочност", text: "при експресни поръчки" },
];

export const PRICE_NOTE_WITH_PRICES =
  "Посочените цени са начални за типичен случай в София. Точната цена получавате в оферта преди започване на работа.";

export const PRICE_NOTE = "Точната цена получавате в оферта преди започване на работа.";
