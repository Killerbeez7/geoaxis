import Link from "next/link";
import { FaViber } from "react-icons/fa6";
import { LuPhone, LuSend } from "react-icons/lu";
import { contactLinks } from "@/config/content/contacts";

const itemCls =
  "flex flex-1 flex-col items-center justify-center gap-1 typo-badge rounded-xl py-2 text-center transition-colors";

// Always-visible contact shortcuts on phones, where most visitors arrive.
export function MobileActionBar() {
  return (
    <nav
      aria-label="Бърз контакт"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bg-deep pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-12px_rgb(0_0_0_/_0.35)] md:hidden"
    >
      <div className="flex gap-2 px-3 py-2 text-tx-inverse">
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
          className={`${itemCls} bg-accent text-tx-on-accent hover:bg-accent-hover`}
        >
          <LuSend aria-hidden="true" className="h-5 w-5" />
          Оферта
        </Link>
      </div>
    </nav>
  );
}
