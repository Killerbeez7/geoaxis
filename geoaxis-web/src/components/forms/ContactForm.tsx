"use client";

import { useState } from "react";
import clsx from "clsx";
import { CtaButton } from "@/components/parts/CtaButton";

function FloatingInput({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        required={required}
        placeholder=" "
        className={clsx(
          "peer w-full px-4 pt-6 pb-2 rounded-xl",
          "bg-white/5 border border-white/10",
          "text-white placeholder-transparent",
          "backdrop-blur-md",
          "focus:outline-none",
          "focus:border-color-accent",
          "focus:ring-2 focus:ring-accent/20",
          "transition-all duration-200"
        )}
      />
      <label
        className={clsx(
          "absolute left-4 top-1/2 -translate-y-1/2",
          "text-white/50 text-base",
          "transition-all duration-200",
          "peer-focus:text-accent",
          "peer-focus:text-sm",
          "peer-focus:top-2",
          "peer-focus:translate-y-0",
          "peer-not-placeholder-shown:text-accent",
          "peer-not-placeholder-shown:text-sm",
          "peer-not-placeholder-shown:top-2",
          "peer-not-placeholder-shown:translate-y-0",
          "pointer-events-none"
        )}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label }: { label: string }) {
  return (
    <div className="relative">
      <textarea
        required
        rows={4}
        placeholder=" "
        className={clsx(
          "peer w-full px-4 pt-6 pb-2 rounded-xl",
          "bg-white/5 border border-white/10",
          "text-white placeholder-transparent resize-none",
          "backdrop-blur-md",
          "focus:outline-none",
          "focus:border-accent",
          "focus:ring-2 focus:ring-accent/20",
          "transition-all duration-200"
        )}
      />
      <label
        className={clsx(
          "absolute left-4 top-5 -translate-y-1/2",
          "text-white/50 text-base",
          "transition-all duration-200",
          "peer-focus:text-accent",
          "peer-focus:text-sm",
          "peer-focus:top-2",
          "peer-focus:translate-y-0",
          "peer-not-placeholder-shown:text-accent",
          "peer-not-placeholder-shown:text-sm",
          "peer-not-placeholder-shown:top-2",
          "peer-not-placeholder-shown:translate-y-0",
          "pointer-events-none"
        )}
      >
        {label}
      </label>
    </div>
  );
}

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      e.currentTarget.reset();
    }
  }

  return (
    <div
      className={clsx(
        "rounded-3xl",
        "bg-white/4",
        "backdrop-blur-2xl",
        "border border-white/8",
        "p-12",
        "shadow-2xl"
      )}
    >
      <h3 className="mb-8 typo-h3 text-tx-inverse">Изпратете запитване</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FloatingInput name="name" label="Вашето име" />
        <FloatingInput name="email" label="Имейл адрес" type="email" />
        <FloatingTextarea label="Вашето съобщение" />

        <CtaButton
          type="submit"
          size="lg"
          variant="glassAccent"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Изпращане..." : "Изпрати съобщение"}
        </CtaButton>

        {success && (
          <p className="text-sm text-green-400">
            Успешно изпратено! Ще се свържем с вас.
          </p>
        )}
      </form>
    </div>
  );
}
