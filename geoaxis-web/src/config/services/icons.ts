import type { IconType } from "react-icons";
import {
  LuCircleHelp,
  LuCrosshair,
  LuDraftingCompass,
  LuLandPlot,
  LuMap,
  LuMessagesSquare,
  LuWaypoints,
} from "react-icons/lu";

export const CATEGORY_ICONS: Record<string, IconType> = {
  zasnemane: LuCrosshair,
  trasirane: LuWaypoints,
  kadastar: LuLandPlot,
  proektirane: LuDraftingCompass,
  gradoustroistvo: LuMap,
  konsultacia: LuMessagesSquare,
};

export function getCategoryIcon(slug: string): IconType {
  return CATEGORY_ICONS[slug] ?? LuCircleHelp;
}
