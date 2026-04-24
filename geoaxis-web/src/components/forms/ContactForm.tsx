"use client";

import { useRef, useState, useTransition } from "react";
import clsx from "clsx";
import { LuUpload, LuX, LuFile, LuImage } from "react-icons/lu";
import { CtaButton } from "@/components/parts/CtaButton";

type FormState = {
  error: string | null;
  success: boolean;
};

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
          "peer w-full rounded-xl border border-br-light bg-bg-page px-4 pt-6 pb-2",
          "text-tx-primary placeholder-transparent",
          "transition-all duration-200",
          "focus:border-br-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        )}
      />
      <label
        className={clsx(
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
          "text-base text-tx-muted transition-all duration-200",
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm",
          "peer-focus:text-accent-strong",
          "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0",
          "peer-not-placeholder-shown:text-sm"
        )}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  label,
  name,
  rows = 4,
}: {
  label: string;
  name: string;
  rows?: number;
}) {
  return (
    <div className="relative">
      <textarea
        name={name}
        required
        rows={rows}
        placeholder=" "
        className={clsx(
          "peer w-full resize-none rounded-xl border border-br-light bg-bg-page px-4 pt-6 pb-2",
          "text-tx-primary placeholder-transparent",
          "transition-all duration-200",
          "focus:border-br-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        )}
      />
      <label
        className={clsx(
          "pointer-events-none absolute left-4 top-5 -translate-y-1/2",
          "text-base text-tx-muted transition-all duration-200",
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm",
          "peer-focus:text-accent-strong",
          "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0",
          "peer-not-placeholder-shown:text-sm"
        )}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({
  label,
  name,
  options,
  defaultValue = "",
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label className="pointer-events-none absolute left-4 top-2 z-10 text-xs text-tx-muted">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        onChange={(event) => onChange?.(event.target.value)}
        className={clsx(
          "w-full rounded-xl border border-br-light bg-bg-page px-4 pt-7 pb-2",
          "appearance-none text-sm text-tx-primary",
          "transition-all duration-200",
          "focus:border-br-accent focus:ring-2 focus:ring-accent/20 focus:outline-none",
          "[&>option]:bg-white [&>option]:text-tx-primary"
        )}
      >
        <option value="" disabled={Boolean(defaultValue)}>
          —
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-tx-muted">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
function FileUpload({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming).filter(
      (f) => !files.find((existing) => existing.name === f.name)
    );
    onChange([...files, ...newFiles]);
  };

  const remove = (name: string) => onChange(files.filter((f) => f.name !== name));

  const isImage = (f: File) => f.type.startsWith("image/");

  return (
    <div>
      <div className="mb-2">
        <p className="text-sm font-medium text-tx-primary">Документи или снимки</p>
        <p className="mt-0.5 text-xs leading-5 text-tx-muted">
          По желание. Ако нямате файл, изпратете само описанието.
        </p>
      </div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className={clsx(
          "flex cursor-pointer items-center gap-3 px-4 py-3",
          "rounded-xl border border-dashed border-br-default bg-bg-section",
          "transition hover:border-accent/60 hover:bg-white"
        )}
      >
        <LuUpload className="h-4 w-4 shrink-0 text-accent-strong" />
        <div>
          <p className="text-sm text-tx-secondary">
            Прикачи файл <span className="text-accent-strong">или го плъзни тук</span>
          </p>
          <p className="text-xs text-tx-muted">JPG, PNG, WebP, PDF · до 10MB</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f) => (
            <li
              key={f.name}
              className="flex items-center gap-3 rounded-lg border border-br-light bg-bg-section px-3 py-2"
            >
              {isImage(f) ? (
                <LuImage className="h-4 w-4 shrink-0 text-accent-strong" />
              ) : (
                <LuFile className="h-4 w-4 shrink-0 text-accent-strong" />
              )}
              <span className="flex-1 truncate text-sm text-tx-primary">{f.name}</span>
              <span className="text-xs text-tx-muted">
                {(f.size / 1024).toFixed(0)}KB
              </span>
              <button
                type="button"
                onClick={() => remove(f.name)}
                className="text-tx-muted transition hover:text-red-600"
              >
                <LuX className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [preferredContact, setPreferredContact] = useState("phone");

  const [state, setState] = useState<FormState>({ error: null, success: false });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const contactValue = String(formData.get("contactValue") || "").trim();

    if (preferredContact === "email") {
      formData.set("email", contactValue);
      formData.delete("phone");
    } else {
      formData.set("phone", contactValue);
      formData.delete("email");
    }

    formData.set("preferredContact", preferredContact);
    formData.delete("contactValue");
    files.forEach((f) => formData.append("files", f));

    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          body: formData,
        });

        let data: { error?: string } | null = null;
        try {
          data = await res.json();
        } catch {
          /* empty */
        }

        if (!res.ok) {
          setState({ error: data?.error || "Грешка при изпращане.", success: false });
          return;
        }

        setState({ error: null, success: true });
        form.reset();
        setFiles([]);
        setPreferredContact("phone");
      } catch {
        setState({ error: "Грешка при изпращане. Опитайте отново.", success: false });
      }
    });
  };

  if (state.success) {
    return (
      <div className="rounded-2xl border border-br-light bg-bg-page p-8 text-center shadow-xl shadow-black/10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-3xl text-accent-strong">
          ✓
        </div>
        <h3 className="text-xl font-semibold text-tx-primary">
          Запитването е изпратено!
        </h3>
        <p className="mt-2 text-sm text-tx-muted">
          Ще се свържем с вас възможно най-скоро.
        </p>
        <button
          onClick={() => setState({ error: null, success: false })}
          className="mt-6 text-sm font-medium text-accent-strong underline-offset-2 hover:underline"
        >
          Изпрати ново запитване
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-br-light bg-bg-page p-5 shadow-xl shadow-black/10 sm:p-6 lg:p-7">
      <div className="absolute inset-x-0 top-0 h-1 bg-accent/70" />
      <div className="mb-5">
        <h3 className="text-2xl font-semibold text-tx-primary">Разкажете ни накратко</h3>
        <p className="mt-2 text-sm leading-6 text-tx-muted">
          Попълнете само основното. Ще се свържем с вас, за да уточним детайлите.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <FloatingInput name="name" label="Вашето име *" />
          <FloatingSelect
            name="contactMethod"
            label="Да отговорим по"
            defaultValue="phone"
            onChange={setPreferredContact}
            options={[
              { value: "phone", label: "Телефон" },
              { value: "email", label: "Имейл" },
            ]}
          />
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <FloatingInput
            key={preferredContact}
            name="contactValue"
            label={preferredContact === "email" ? "Имейл адрес *" : "Телефон *"}
            type={preferredContact === "email" ? "email" : "tel"}
          />
          <FloatingSelect
            name="service"
            label="Тип услуга"
            options={[
              { value: "survey", label: "Геодезическо заснемане" },
              { value: "layout", label: "Трасиране" },
              { value: "cadastre", label: "Кадастър" },
              { value: "regulation", label: "Регулация / ПУП" },
              { value: "consultation", label: "Консултация" },
              { value: "other", label: "Друго" },
            ]}
          />
        </div>

        <FloatingInput name="location" label="Населено място / имот" required={false} />

        <FloatingTextarea name="message" label="Какво ви е необходимо? *" rows={4} />

        <FileUpload files={files} onChange={setFiles} />

        <CtaButton type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? "Изпращане..." : "Изпрати запитване"}
        </CtaButton>

        {state.error && (
          <div className="rounded-xl border border-red-600/20 bg-red-600/10 px-4 py-3">
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
