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
          "peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-2",
          "text-white placeholder-transparent backdrop-blur-md",
          "transition-all duration-200",
          "focus:border-white/40 focus:ring-2 focus:ring-white/15 focus:outline-none"
        )}
      />
      <label
        className={clsx(
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
          "text-base text-white/50 transition-all duration-200",
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm",
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
          "peer w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-2",
          "text-white placeholder-transparent backdrop-blur-md",
          "transition-all duration-200",
          "focus:border-white/40 focus:ring-2 focus:ring-white/15 focus:outline-none"
        )}
      />
      <label
        className={clsx(
          "pointer-events-none absolute left-4 top-5 -translate-y-1/2",
          "text-base text-white/50 transition-all duration-200",
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm",
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
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <div className="relative">
      <label className="pointer-events-none absolute left-4 top-2 z-10 text-xs text-white/50">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className={clsx(
          "w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-7 pb-2",
          "text-sm text-white backdrop-blur-md appearance-none",
          "transition-all duration-200",
          "focus:border-white/40 focus:ring-2 focus:ring-white/15 focus:outline-none",
          "[&>option]:bg-[#1c2823] [&>option]:text-white"
        )}
      >
        <option value="" disabled={Boolean(defaultValue)} className="text-white/30">
          —
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
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
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className={clsx(
          "flex cursor-pointer items-center gap-3 px-4 py-3",
          "rounded-xl border border-dashed border-white/20 bg-white/4",
          "transition hover:border-white/40 hover:bg-white/8"
        )}
      >
        <LuUpload className="h-4 w-4 shrink-0 text-white/40" />
        <div>
          <p className="text-sm text-white/50">
            Прикачи файлове — <span className="text-accent">избери или плъзни</span>
          </p>
          <p className="text-xs text-white/30">JPG, PNG, WebP, PDF · до 10MB</p>
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
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            >
              {isImage(f) ? (
                <LuImage className="h-4 w-4 shrink-0 text-accent" />
              ) : (
                <LuFile className="h-4 w-4 shrink-0 text-accent" />
              )}
              <span className="flex-1 truncate text-sm text-white/70">{f.name}</span>
              <span className="text-xs text-white/30">
                {(f.size / 1024).toFixed(0)}KB
              </span>
              <button
                type="button"
                onClick={() => remove(f.name)}
                className="text-white/30 transition hover:text-red-400"
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

  const [state, setState] = useState<FormState>({ error: null, success: false });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
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
        // setWantsAttachments(false);
      } catch {
        setState({ error: "Грешка при изпращане. Опитайте отново.", success: false });
      }
    });
  };

  if (state.success) {
    return (
      <div className="rounded-3xl border border-white/8 bg-white/4 p-8 text-center backdrop-blur-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent text-3xl">
          ✓
        </div>
        <h3 className="text-xl font-semibold text-white">Запитването е изпратено!</h3>
        <p className="mt-2 text-sm text-white/60">
          Ще се свържем с вас възможно най-скоро.
        </p>
        <button
          onClick={() => setState({ error: null, success: false })}
          className="mt-6 text-sm text-accent underline-offset-2 hover:underline"
        >
          Изпрати ново запитване
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/8 bg-white/4 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      <h3 className="typo-h3 text-tx-inverse mb-6">Изпратете запитване</h3>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FloatingInput name="name" label="Вашето име *" />
          <FloatingInput name="phone" label="Телефон" type="tel" required={false} />
          <FloatingInput name="email" label="Имейл адрес" type="email" required={false} />
          <FloatingInput name="location" label="Населено място" required={false} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
          <FloatingSelect
            name="preferredContact"
            label="Предпочитан контакт"
            defaultValue="phone"
            options={[
              { value: "phone", label: "По телефон" },
              { value: "email", label: "По имейл" },
            ]}
          />
        </div>

        <FloatingTextarea name="message" label="Опишете случая или услугата *" rows={3} />

        <FileUpload files={files} onChange={setFiles} />

        <CtaButton type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? "Изпращане..." : "Изпрати запитване"}
        </CtaButton>

        {state.error && (
          <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3">
            <p className="text-sm text-red-300">{state.error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
