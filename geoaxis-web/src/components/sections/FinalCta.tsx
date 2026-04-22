"use client";

import { useActionState, useEffect, useRef } from "react";
import clsx from "clsx";
import { FaPhone } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { CtaButton } from "@/components/parts/CtaButton";
import { Section } from "../layout/Section";
import { siteContent } from "@/config/site-content";
import Link from "next/link";

type FormState = {
  error: string | null;
  success: boolean;
};

async function quickContactAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: { error?: string } | null = null;
    try {
      data = await res.json();
    } catch {
      return { error: "Сървърът върна невалиден отговор.", success: false };
    }

    if (!res.ok) {
      return {
        error: data?.error || "Грешка при изпращане. Опитайте отново.",
        success: false,
      };
    }

    return { error: null, success: true };
  } catch {
    return { error: "Грешка при изпращане. Опитайте отново.", success: false };
  }
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const base = clsx(
    "w-full rounded-xl px-4 text-white",
    "bg-white/12 hover:bg-white/30",
    "border border-white/20 hover:border-white/40",
    "transition-all duration-300 ease-in-out",
    "placeholder:text-white/40 backdrop-blur-md",
    "focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none"
  );

  return (
    <div>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={3}
          placeholder={label}
          className={clsx(base, "py-3 resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          placeholder={label}
          className={clsx(base, "h-11")}
        />
      )}
    </div>
  );
}

export function FinalCta() {
  const { phone, email } = siteContent.contacts;
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(quickContactAction, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <Section tone="brand" className="border-t border-white/10">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — text */}
        <div className="max-w-lg">
          <p className="typo-kicker inline-block border-b border-accent/40 pb-2">
            Контакт
          </p>
          <h2 className="typo-h2 mt-3 text-tx-inverse!">
            Имате нужда от <span className="text-accent">геодезическа услуга?</span>
          </h2>
          <p className="typo-body mt-4 text-tx-inverse/70!">
            Свържете се с нас за консултация. Ще разгледаме вашия случай и ще предложим
            най-подходящото решение за вашия имот или проект.
          </p>

          <a href={`tel:${phone}`} className="mt-8 flex w-fit items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent transition">
              <FaPhone className="h-4 w-4 text-accent/80 group-hover:text-accent-hover" />
            </div>
            <span className="typo-body font-medium text-tx-inverse/75 transition group-hover:text-accent-hover">
              {phone}
            </span>
          </a>
          <a href={`tel:${email}`} className="mt-8 flex w-fit items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent transition">
              <FaEnvelope className="h-4 w-4 group-hover:text-accent-hover" />
            </div>
            <span className="typo-body font-medium text-tx-inverse/75 transition group-hover:text-accent-hover">
              {email}
            </span>
          </a>
        </div>

        {/* Right — form */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md sm:p-8 w-full max-w-[500px] lg:justify-self-end">
          {state.success ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl text-accent">
                ✓
              </div>
              <h3 className="text-lg font-semibold text-white">
                Съобщението е изпратено!
              </h3>
              <p className="text-sm text-white/60">
                Ще се свържем с вас възможно най-скоро.
              </p>
            </div>
          ) : (
            <form ref={formRef} action={formAction} className="space-y-4">
              <Field name="name" label="Вашето име *" />
              <Field name="email" label="Имейл адрес *" type="email" />
              <Field name="message" label="Вашето съобщение *" textarea />

              <CtaButton
                type="submit"
                size="lg"
                className="mt-2 w-full"
                disabled={isPending}
              >
                {isPending ? "Изпращане..." : "Изпрати запитване"}
              </CtaButton>

              <p className="text-center text-sm text-white/45">
                Имате документи за прикачване или по-подробно запитване?{" "}
                <Link
                  href="/contacts"
                  className="text-white/65 underline underline-offset-4 transition hover:text-accent"
                >
                  Използвайте пълната форма
                </Link>
                .
              </p>

              {state.error && <p className="text-sm text-red-400">{state.error}</p>}
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
