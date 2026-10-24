"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FaViber } from "react-icons/fa6";
import { LuPhone, LuSend } from "react-icons/lu";
import { contactLinks } from "@/config/content/contacts";

const itemCls =
  "flex flex-1 flex-col items-center justify-center gap-1 typo-badge rounded-xl py-2 text-center transition-colors";

// The one contact row on phones: call, Viber, quote. Used by the bottom bar and the mobile menu.
export function QuickActions({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  return (
    <div className={clsx("flex gap-2 text-tx-inverse", className)}>
      <a href={contactLinks.tel} data-track="call_click" className={`${itemCls} hover:bg-white/6`}>
        <LuPhone aria-hidden="true" className="h-5 w-5 text-accent-on-dark" />
        Обадете се
      </a>
      <a href={contactLinks.viber} data-track="viber_click" className={`${itemCls} hover:bg-white/6`}>
        <FaViber aria-hidden="true" className="h-5 w-5 text-accent-on-dark" />
        Viber
      </a>
      <Link
        href="/contacts"
        data-track="quote_click"
        onClick={onNavigate}
        className={`${itemCls} bg-accent text-tx-on-accent hover:bg-accent-hover`}
      >
        <LuSend aria-hidden="true" className="h-5 w-5" />
        Оферта
      </Link>
    </div>
  );
}

// Slides away while scrolling down to read, comes back on scroll up, at the top and at the end of the page.
export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
      if (y < 80 || nearEnd) setHidden(false);
      else if (Math.abs(y - lastY) > 8) setHidden(y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Бърз контакт"
      className={clsx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bg-deep pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-12px_rgb(0_0_0_/_0.35)] transition-transform duration-300 md:hidden",
        hidden && "translate-y-full"
      )}
    >
      <QuickActions className="px-3 py-2" />
    </nav>
  );
}
