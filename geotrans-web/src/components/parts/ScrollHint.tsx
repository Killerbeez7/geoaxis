"use client";

import { useEffect, useState } from "react";

interface ScrollHintProps {
  hintText?: boolean;
}

export function ScrollHint({ hintText = false }: ScrollHintProps) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const onScroll = () => setHide(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "absolute left-1/2 bottom-8 -translate-x-1/2 hidden md:flex flex-col items-center gap-2",
        "pointer-events-none transition-opacity duration-300",
        hide ? "opacity-0" : "opacity-70",
      ].join(" ")}
    >
      {/* Text */}
      {hintText && (
        <div className="text-white/65 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-px w-8 bg-white/30" />
            Виж услуги
            <span className="h-px w-8 bg-white/30" />
          </span>
        </div>
      )}

      {/* Animated icon */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="scroll-hint w-10 h-10 invert brightness-200"
      >
        <source src="/animations/scroll-down.webm" type="video/webm" />
      </video>
    </div>
  );
}
