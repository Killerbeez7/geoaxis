"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FaViber } from "react-icons/fa6";
import { LuPhone, LuSend } from "react-icons/lu";
import { contactLinks } from "@/config/content/contacts";

const itemCls =
  "flex flex-1 flex-col items-center justify-center gap-1 typo-badge rounded-xl py-2 text-center transition-colors";

// The one contact row on phones: call, Viber, quote.
function QuickActions({ className }: { className?: string }) {
  return (
    <div className={clsx("flex gap-2 text-tx-primary", className)}>
      <a href={contactLinks.tel} data-track="call_click" className={`${itemCls} hover:bg-bg-subtle`}>
        <LuPhone aria-hidden="true" className="h-5 w-5 text-accent-text" />
        Обадете се
      </a>
      <a href={contactLinks.viber} data-track="viber_click" className={`${itemCls} hover:bg-bg-subtle`}>
        <FaViber aria-hidden="true" className="h-5 w-5 text-accent-text" />
        Viber
      </a>
      <Link
        href="/contacts"
        data-track="quote_click"
        className={`${itemCls} text-accent-text ring-1 ring-inset ring-br-accent hover:bg-accent-soft`}
      >
        <LuSend aria-hidden="true" className="h-5 w-5" />
        Оферта
      </Link>
    </div>
  );
}

export const MOBILE_MENU_EVENT = "geoaxis:mobile-menu";

// Shown only at the top of the page and above the open mobile menu.
// When hidden it leaves the page entirely (not just slides away), so iOS Safari floats its
// transparent address bar over the content instead of docking a solid strip under the bar.
export function MobileActionBar() {
  const [atEdge, setAtEdge] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  // True once the slide-out has finished; the bar is then removed until it is needed again
  const [gone, setGone] = useState(false);
  const visible = atEdge || menuOpen;

  useEffect(() => {
    const onScroll = () => {
      // Hides on the first bit of scrolling
      const edge = window.scrollY < 4;
      setAtEdge(edge);
      if (edge) setGone(false);
    };
    const onMenu = (event: Event) => {
      const open = (event as CustomEvent<boolean>).detail;
      setMenuOpen(open);
      if (open) setGone(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(MOBILE_MENU_EVENT, onMenu);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(MOBILE_MENU_EVENT, onMenu);
    };
  }, []);

  if (gone && !visible) return null;

  return (
    <nav
      aria-label="Бърз контакт"
      onTransitionEnd={() => {
        if (!visible) setGone(true);
      }}
      className={clsx(
        "fixed inset-x-0 bottom-0 z-60 border-t border-br-light bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgb(20_33_27_/_0.25)] transition-transform duration-300 starting:translate-y-full md:hidden",
        !visible && "translate-y-full"
      )}
    >
      <QuickActions className="px-3 py-2" />
    </nav>
  );
}
