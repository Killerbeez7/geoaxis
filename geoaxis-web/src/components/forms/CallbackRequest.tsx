"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { HONEYPOT_FIELD, STARTED_AT_FIELD, isValidPhone } from "@/lib/contact";

export function CallbackRequest() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidPhone(phone)) {
      setError("Моля, въведете валиден телефонен номер.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            phone,
            privacyConsent: consent,
            [HONEYPOT_FIELD]: honeypot,
            [STARTED_AT_FIELD]: startedAt,
          }),
        });
        const data = (await res.json().catch(() => null)) as { error?: string } | null;

        if (!res.ok) {
          setError(data?.error || "Грешка при изпращане. Опитайте отново.");
          setStatus("error");
          return;
        }

        track("callback_requested");
        setStatus("sent");
      } catch {
        setError("Грешка при изпращане. Опитайте отново.");
        setStatus("error");
      }
    });
  };

  if (status === "sent") {
    return (
      <p role="status" className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-tx-primary">
        Благодарим! Ще Ви се обадим в рамките на работния ден.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3" aria-label="Заявка за обратно обаждане">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="callback-website">Не попълвайте това поле</label>
        <input
          id="callback-website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="callback-phone" className="sr-only">
          Телефон за обратно обаждане
        </label>
        <input
          id="callback-phone"
          type="tel"
          autoComplete="tel"
          required
          maxLength={30}
          placeholder="Вашият телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="min-h-11 flex-1 rounded-xl border border-br-default bg-bg-page px-4 text-tx-primary placeholder:text-tx-muted focus:border-br-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={isPending}
          className="min-h-11 rounded-xl bg-bg-inverse px-5 text-sm font-semibold text-tx-inverse transition hover:bg-bg-brand disabled:opacity-60"
        >
          {isPending ? "Изпращане..." : "Обадете ми се"}
        </button>
      </div>

      <label className="flex items-start gap-2 text-xs leading-5 text-tx-secondary">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0"
        />
        <span>
          Запознах се с{" "}
          <Link href="/politika-za-poveritelnost" className="font-medium text-accent-text underline">
            Политиката за поверителност
          </Link>
          .
        </span>
      </label>

      <div aria-live="assertive">
        {error ? <p className="text-xs text-red-700">{error}</p> : null}
      </div>
    </form>
  );
}
