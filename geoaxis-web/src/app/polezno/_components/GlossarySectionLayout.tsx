import { HELPFUL_GLOSSARY_TERMS } from "@/config/polezno/glossary";

export function GlossarySectionLayout() {
  return (
    <div className="max-w-6xl">
      <dl className="border-t border-br-light/60">
        {HELPFUL_GLOSSARY_TERMS.map((term, index) => (
          <div
            key={term.term}
            id={`term-${index + 1}`}
            className="grid gap-4 border-b border-br-light/50 py-7 transition md:grid-cols-[18rem_1fr] md:gap-10"
          >
            <dt className="text-base font-semibold leading-snug text-accent-strong md:text-lg">
              {term.term}
            </dt>

            <dd className="max-w-3xl text-base leading-8 text-tx-secondary">
              {term.definition}

              {term.note ? (
                <span className="mt-2 block text-sm leading-6 text-tx-muted">
                  {term.note}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
