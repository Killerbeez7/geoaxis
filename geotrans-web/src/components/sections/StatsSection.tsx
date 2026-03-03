import { siteContent } from "@/config/site-content";

export function Stats() {
  const stats = siteContent.stats;
  const brand = siteContent.brand.name;

  return (
    <section className="relative py-20 md:py-28 bg-bg-section border-y border-br-light overflow-hidden">
      {/* watermark */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none z-0">
        <span className="text-[18vw] font-black uppercase tracking-tighter text-tx-muted/10">
          {brand}
        </span>
      </div>

      <div className="relative z-10 container-page">
        <div className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center lg:text-left px-2">
              <div className="text-4xl md:text-6xl font-semibold tracking-tight text-tx-primary">
                {s.number}
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-tx-muted">
                {s.label}
              </div>
              <div className="mt-5 h-[2px] w-12 bg-accent mx-auto lg:mx-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
