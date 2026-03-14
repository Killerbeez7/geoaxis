import { siteContent } from "@/config/site-content";

export function Stats() {
  const stats = siteContent.stats;

  return (
    <section className="relative overflow-hidden bg-bg-section py-20 md:py-28">
      {/* pattern overlay */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.16]"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[92%] w-[88%] -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundImage: "url('/patterns/vector.avif')",
            backgroundRepeat: "repeat",
            backgroundSize: "900px auto",
            backgroundPosition: "center",
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 38%, rgba(0,0,0,0) 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 38%, rgba(0,0,0,0) 78%)",
          }}
        />
      </div> */}

      <div className="relative z-10 container-page">
        <div className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
          {stats.map((s, i) => (
            <div key={i} className="px-2 text-center lg:text-left">
              <div className="text-4xl font-semibold tracking-tight text-tx-primary md:text-6xl">
                {s.number}
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-tx-muted">
                {s.label}
              </div>
              <div className="mx-auto mt-5 h-[2px] w-12 bg-accent lg:mx-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
