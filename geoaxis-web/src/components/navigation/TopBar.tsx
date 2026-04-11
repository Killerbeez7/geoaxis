import clsx from "clsx";

import { FaPhone } from "react-icons/fa6";
import { siteContent } from "@/config/site-content";

type TopBarProps = {
  isShrunk: boolean;
};

export const TopBar = ({ isShrunk }: TopBarProps) => {
  const phoneNumber = siteContent.contacts.phone;

  return (
    <div
      className={clsx(
        "fixed inset-x-0 top-0 z-60 hidden overflow-hidden border-b border-white/6 text-xs backdrop-blur-xl md:block",
        "transition-[height] duration-300 ease-in-out",
        "bg-bg-top-nav/95",
        isShrunk ? "pointer-events-none h-0 border-b-0" : "h-(--top-bar-h)"
      )}
    >
      <div className="container-page flex h-(--top-bar-h) items-center justify-between">
        <span className="pl-2 font-medium text-tx-inverse/70 tracking-wide">
          Пон - Пет: 08:30 - 17:30
        </span>

        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-2 transition-colors"
        >
          <FaPhone className="text-accent" />
          <span className="pr-2 font-medium tracking-wider text-tx-inverse/70 hover:text-accent-hover">
            {phoneNumber}
          </span>
        </a>
      </div>
    </div>
  );
};
