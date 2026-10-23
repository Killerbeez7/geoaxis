"use client";

import clsx from "clsx";

type MobileMenuToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <button
      className="relative group md:hidden p-2 h-10 w-10 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5 active:bg-white/10"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Затвори менюто" : "Отвори менюто"}
      type="button"
    >
      <div className="relative flex flex-col items-center justify-center w-6 h-5">
        {/* Top Line */}
        <span
          className={clsx(
            "block absolute h-0.5 w-6 bg-tx-inverse rounded-full transition-all duration-300 ease-out",
            isOpen ? "rotate-45" : "-translate-y-2"
          )}
        />

        {/* Middle Line */}
        <span
          className={clsx(
            "block absolute h-0.5 w-6 bg-tx-inverse rounded-full transition-all duration-300 ease-out",
            isOpen ? "opacity-0 -translate-x-4" : "opacity-100"
          )}
        />

        {/* Bottom Line */}
        <span
          className={clsx(
            "block absolute h-0.5 w-6 bg-tx-inverse rounded-full transition-all duration-300 ease-out",
            isOpen ? "-rotate-45" : "translate-y-2"
          )}
        />
      </div>
    </button>
  );
}
