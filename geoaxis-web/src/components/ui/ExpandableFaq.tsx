"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { LuChevronDown } from "react-icons/lu";
import type { HelpfulFaqItem } from "@/config/polezno/faq";
import { FaqAccordion } from "./FaqAccordion";

// A frameless question list that shows the first few and opens the rest in place.
// The rest is in the HTML from the start (only hidden), so readers and search engines get every answer.
export function ExpandableFaq({ items, initial = 5 }: { items: readonly HelpfulFaqItem[]; initial?: number }) {
  const [open, setOpen] = useState(false);
  const restId = useId();
  const first = items.slice(0, initial);
  const rest = items.slice(initial);

  return (
    <div>
      <FaqAccordion items={first} variant="plain" />
      {rest.length ? (
        <>
          <div id={restId} hidden={!open}>
            <FaqAccordion items={rest} variant="plain" className="border-t-0" />
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={restId}
            onClick={() => setOpen(!open)}
            className="typo-small mt-5 inline-flex items-center gap-1.5 font-semibold text-accent-text underline-offset-4 hover:underline"
          >
            {open ? "По-малко" : `Още ${rest.length} ${rest.length === 1 ? "въпрос" : "въпроса"}`}
            <LuChevronDown
              aria-hidden="true"
              className={clsx("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
            />
          </button>
        </>
      ) : null}
    </div>
  );
}
