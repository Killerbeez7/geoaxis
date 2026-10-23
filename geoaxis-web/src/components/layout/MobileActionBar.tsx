"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { FaPhone, FaViber } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { contactLinks } from "@/config/content/contacts";

const itemCls =
  "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold";

// Always-visible contact shortcuts on phones, where most visitors arrive.
export function MobileActionBar() {
  return (
    <nav
      aria-label="Бърз контакт"
      className="fixed inset-x-0 bottom-0 z-60 flex border-t border-white/10 bg-bg-nav pb-[env(safe-area-inset-bottom)] text-tx-inverse shadow-[0_-8px_24px_rgba(0,0,0,0.18)] md:hidden"
    >
      <a href={contactLinks.tel} className={itemCls} onClick={() => track("call_click", { from: "mobile_bar" })}>
        <FaPhone className="h-4 w-4 text-accent-on-dark" aria-hidden="true" />
        Обадете се
      </a>
      <a href={contactLinks.viber} className={itemCls} onClick={() => track("viber_click", { from: "mobile_bar" })}>
        <FaViber className="h-4 w-4 text-accent-on-dark" aria-hidden="true" />
        Viber
      </a>
      <Link
        href="/contacts"
        className={`${itemCls} m-1.5 rounded-xl bg-accent text-tx-on-accent`}
        onClick={() => track("inquiry_click", { from: "mobile_bar" })}
      >
        <LuSend className="h-4 w-4" aria-hidden="true" />
        Запитване
      </Link>
    </nav>
  );
}
