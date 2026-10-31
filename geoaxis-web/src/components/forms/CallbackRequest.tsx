"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { track } from "@vercel/analytics";
import { HONEYPOT_FIELD, STARTED_AT_FIELD, isValidPhone } from "@/lib/contact";

export function CallbackRequest() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const startedAtRef = useRef(0);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startedAtRef.current = Date.now();
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
            [STARTED_AT_FIELD]: startedAtRef.current,
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
      <p role="status" className="typo-small rounded-xl bg-accent-soft px-4 py-3 font-medium text-tx-primary">
        Благодарим! Ще ви се обадим възможно най-скоро.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="@container space-y-3" aria-label="Заявка за обратно обаждане">
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

      <div className="flex flex-col gap-2 @sm:flex-row">
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
          className="h-11 w-full min-w-0 rounded-xl border border-br-default bg-bg-page px-4 text-tx-primary placeholder:text-tx-muted/80 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20 @sm:flex-1"
        />
        <Button type="submit" variant="dark" disabled={isPending} className="shrink-0">
          {isPending ? "Изпращане…" : "Обадете ми се"}
        </Button>
      </div>

      <label className="typo-small flex items-start gap-2.5">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-[0.2rem] h-4 w-4 shrink-0 accent-accent"
        />
        <span>
          Запознах се с{" "}
          <Link href="/politika-za-poveritelnost" className="font-medium text-accent-text underline underline-offset-2">
            Политиката за поверителност
          </Link>
          .
        </span>
      </label>

      <div aria-live="assertive">
        {error ? <p className="typo-small font-medium text-danger">{error}</p> : null}
      </div>
    </form>
  );
}
