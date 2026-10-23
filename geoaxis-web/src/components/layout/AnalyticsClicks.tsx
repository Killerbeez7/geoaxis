"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// One listener for the whole site: any element with data-track="event_name" is reported on click.
export function AnalyticsClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      const name = target?.dataset.track;
      if (!name) return;
      track(name, { path: window.location.pathname });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
