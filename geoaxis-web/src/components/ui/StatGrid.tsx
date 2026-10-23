import clsx from "clsx";
import { stats } from "@/config/content/stats";

function splitStat(value: string) {
  const match = value.match(/^([\d\s.,]+)(.*)$/);
  return match ? { number: match[1], suffix: match[2] } : { number: value, suffix: "" };
}

export function StatGrid({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <dl
      className={clsx(
        "grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4",
        dark ? "bg-white/10 ring-1 ring-white/10" : "bg-br-light ring-1 ring-br-light",
        className
      )}
    >
      {stats.map((stat) => {
        const { number, suffix } = splitStat(stat.number);
        return (
          <div
            key={stat.label}
            className={clsx("flex flex-col-reverse justify-end px-5 py-5", dark ? "bg-bg-inverse" : "bg-bg-page")}
          >
            <dt className={clsx("typo-caption mt-1", dark ? "text-tx-inverse-muted" : "text-tx-muted")}>{stat.label}</dt>
            <dd className={clsx("typo-h2 tabular-nums", dark ? "text-tx-inverse" : "text-tx-primary")}>
              {number}
              <span className={dark ? "text-accent-on-dark" : "text-accent-text"}>{suffix}</span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
