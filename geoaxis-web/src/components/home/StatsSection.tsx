import { stats } from "@/config/content/stats";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/Text";
import { CountUp } from "./CountUp";

function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { number: Number(match[1]), suffix: match[2] } : null;
}

// The company numbers as their own light band between the services and "Защо GeoAxis", as on the
// previous site.
export function StatsSection() {
  return (
    <Section tone="subtle" spacing="compact" aria-labelledby="stats-title">
      <div className="text-center">
        <Eyebrow>Доказани резултати</Eyebrow>
        <Heading id="stats-title" size="h3" className="mt-3">
          Прецизност във всеки детайл
        </Heading>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 rounded-3xl border border-br-light bg-bg-page px-4 py-10 sm:px-6 md:mt-12 lg:grid-cols-4 lg:gap-x-6">
        {stats.map((stat) => {
          const parts = splitStat(stat.number);
          return (
            <div key={stat.label} className="flex flex-col-reverse items-center justify-end gap-3 text-center">
              <dt className="typo-label tone-muted">{stat.label}</dt>
              <dd className="typo-display tone-strong">
                {parts ? (
                  <>
                    <CountUp value={parts.number} />
                    <span className="tone-accent">{parts.suffix}</span>
                  </>
                ) : (
                  stat.number
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </Section>
  );
}
