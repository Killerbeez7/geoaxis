"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { track } from "@vercel/analytics";
import {
  LuArrowLeft,
  LuCircleHelp,
  LuEllipsis,
  LuFile,
  LuImage,
  LuLoaderCircle,
  LuPencil,
  LuShieldCheck,
  LuUpload,
  LuX,
} from "react-icons/lu";

import {
  CONTACT_SERVICE_OPTIONS,
  HONEYPOT_FIELD,
  MAX_FILES,
  MAX_TOTAL_UPLOAD_SIZE,
  MESSAGE_MIN_LENGTH,
  STARTED_AT_FIELD,
  formatMb,
  getServiceOption,
  isAllowedFileName,
  isValidEmail,
  isValidPhone,
} from "@/lib/contact";
import { getPrepareList } from "@/config/services/guide";
import { getCategoryIcon } from "@/config/services/icons";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";

type Step = 1 | 2 | 3;
type ContactMethod = "phone" | "email";
type Errors = Partial<Record<"service" | "message" | "name" | "contact" | "consent" | "files", string>>;

const STEPS: { id: Step; label: string }[] = [
  { id: 1, label: "Услуга" },
  { id: 2, label: "Детайли" },
  { id: 3, label: "Контакт" },
];

const inputCls = (invalid?: boolean) =>
  clsx(
    "w-full rounded-xl border bg-bg-page px-4 py-3 text-tx-primary placeholder:text-tx-muted/80 transition-colors",
    "focus:outline-none focus:ring-4",
    invalid
      ? "border-danger focus:border-danger focus:ring-danger/15"
      : "border-br-default focus:border-accent focus:ring-accent/20"
  );

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="typo-small mt-2 font-medium text-danger">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("service") ?? "";
  const preselected = getServiceOption(requested) ? requested : "";

  const [step, setStep] = useState<Step>(preselected ? 2 : 1);
  const [service, setService] = useState(preselected);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [method, setMethod] = useState<ContactMethod>("phone");
  const [contactValue, setContactValue] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  // Address the confirmation email went to, when the server sent one
  const [confirmationTo, setConfirmationTo] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef(0);
  const movedRef = useRef(false);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // After the visitor moves between steps, put focus on the new step's heading.
  useEffect(() => {
    if (movedRef.current) headingRef.current?.focus();
  }, [step, done]);

  const selectedOption = getServiceOption(service);

  const clearError = (field: keyof Errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const goTo = (next: Step) => {
    movedRef.current = true;
    setErrors({});
    setStep(next);
  };

  const validateStep = (current: Step): Errors => {
    const found: Errors = {};
    if (current === 1 && !service) found.service = "Изберете вид услуга.";
    if (current === 2 && message.trim().length < MESSAGE_MIN_LENGTH) {
      found.message = "Опишете накратко какво ви е необходимо (поне няколко думи).";
    }
    if (current === 3) {
      if (!name.trim()) found.name = "Въведете име.";
      if (method === "phone" && !isValidPhone(contactValue.trim())) found.contact = "Въведете валиден телефонен номер.";
      if (method === "email" && !isValidEmail(contactValue.trim())) found.contact = "Въведете валиден имейл адрес.";
      if (!consent) found.consent = "Потвърдете, че сте запознати с Политиката за поверителност.";
    }
    return found;
  };

  const next = () => {
    const found = validateStep(step);
    setErrors(found);
    if (Object.keys(found).length) return;
    track("quote_step", { step: step + 1 });
    goTo((step + 1) as Step);
  };

  const chooseService = (value: string) => {
    setService(value);
    track("quote_service", { service: value });
    goTo(2);
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming).filter((file) => !files.some((f) => fileKey(f) === fileKey(file)));

    if (files.length + newFiles.length > MAX_FILES) {
      setErrors((prev) => ({ ...prev, files: `Можете да прикачите до ${MAX_FILES} файла.` }));
      return;
    }
    const invalid = newFiles.find((file) => !isAllowedFileName(file.name));
    if (invalid) {
      setErrors((prev) => ({ ...prev, files: `„${invalid.name}“ не е JPG, PNG, WebP или PDF.` }));
      return;
    }
    const total = [...files, ...newFiles].reduce((sum, file) => sum + file.size, 0);
    if (total > MAX_TOTAL_UPLOAD_SIZE) {
      setErrors((prev) => ({
        ...prev,
        files: `Общият размер не трябва да надвишава ${formatMb(MAX_TOTAL_UPLOAD_SIZE)}. По-големи файлове можете да изпратите по имейл, след като се свържем.`,
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, files: undefined }));
    setFiles([...files, ...newFiles]);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== 3) {
      next();
      return;
    }

    const found = validateStep(3);
    setErrors(found);
    if (Object.keys(found).length) return;

    const honeypot = (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null)?.value ?? "";
    const data = new FormData();
    data.set("name", name.trim());
    data.set(method === "phone" ? "phone" : "email", contactValue.trim());
    data.set("preferredContact", method);
    data.set("service", service);
    data.set("location", location.trim());
    data.set("message", message.trim());
    data.set("privacyConsent", "on");
    data.set(HONEYPOT_FIELD, honeypot);
    data.set(STARTED_AT_FIELD, String(startedAtRef.current));
    files.forEach((file) => data.append("files", file));

    setSubmitError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", { method: "POST", body: data });
        const body = (await res.json().catch(() => null)) as { error?: string; confirmationSent?: boolean } | null;

        if (!res.ok) {
          setSubmitError(
            res.status === 413
              ? `Файловете са твърде големи. Общият размер трябва да е до ${formatMb(MAX_TOTAL_UPLOAD_SIZE)}.`
              : body?.error || "Не успяхме да изпратим запитването. Опитайте отново или се обадете."
          );
          return;
        }

        track("inquiry_sent", { service });
        movedRef.current = true;
        if (body?.confirmationSent) setConfirmationTo(contactValue.trim());
        setDone(true);
      } catch {
        setSubmitError("Няма връзка със сървъра. Опитайте отново или се обадете.");
      }
    });
  };

  if (done) {
    return (
      <div role="status" className="rounded-3xl border border-br-light bg-bg-page p-6 shadow-card sm:p-10">
        <h2 ref={headingRef} tabIndex={-1} className="typo-h2 outline-none">
          Запитването е изпратено
        </h2>
        <p className="typo-lead mt-3">Благодарим, {name.trim().split(" ")[0]}! Ето какво следва:</p>
        {confirmationTo ? (
          <p className="typo-small tone-muted mt-2">
            Изпратихме потвърждение на {confirmationTo}. Ако не го виждате, проверете папка „Спам“.
          </p>
        ) : null}

        <ol className="mt-8 grid gap-5">
          {[
            files.length ? "Преглеждаме описанието и прикачените файлове." : "Преглеждаме описанието на задачата.",
            `Свързваме се с вас ${method === "phone" ? "по телефона" : "по имейл"} възможно най-скоро.`,
            "Уточняваме детайлите и получавате оферта и срок преди започване на работа.",
          ].map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="typo-small inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-accent font-semibold text-accent-text tabular-nums">
                {index + 1}
              </span>
              <span className="pt-1">{item}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl bg-accent-soft p-5">
          <p className="typo-small tone-strong font-semibold">Докато чакате, подгответе, ако имате:</p>
          <CheckList items={getPrepareList(service)} className="typo-small mt-3" />
        </div>

      </div>
    );
  }

  const stepTitle =
    step === 1 ? "Изберете услуга" : step === 2 ? "Разкажете ни накратко" : "Как да се свържем с вас?";

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      aria-labelledby="quote-step-title"
      className="rounded-3xl border border-br-light bg-bg-page p-4 shadow-card sm:p-8"
    >
      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="quote-website">Не попълвайте това поле</label>
        <input id="quote-website" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Progress */}
      <div>
        <p className="typo-label tone-muted">
          Стъпка {step} от {STEPS.length}
        </p>
        <ol className="mt-3 grid grid-cols-3 gap-2" aria-hidden="true">
          {STEPS.map((item) => (
            <li key={item.id}>
              <span
                className={clsx(
                  "block h-1.5 rounded-full transition-colors",
                  item.id <= step ? "bg-accent" : "bg-br-light"
                )}
              />
              <span
                className={clsx(
                  "typo-small mt-2 block font-semibold",
                  item.id === step ? "text-tx-primary" : "text-tx-muted"
                )}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <h2 id="quote-step-title" ref={headingRef} tabIndex={-1} className="typo-h3 mt-8 outline-none">
        {stepTitle}
      </h2>

      {/* Selected service summary on steps 2 and 3 */}
      {step > 1 && selectedOption ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-bg-subtle px-4 py-3">
          <p className="typo-small">
            <span className="text-tx-muted">Услуга: </span>
            <span className="tone-strong font-semibold">{selectedOption.label}</span>
          </p>
          <button
            type="button"
            onClick={() => goTo(1)}
            className="typo-small inline-flex items-center gap-1.5 font-semibold text-accent-text hover:underline"
          >
            <LuPencil aria-hidden="true" className="h-3.5 w-3.5" />
            Промени
          </button>
        </div>
      ) : null}

      {step === 1 ? (
        <fieldset className="mt-6">
          <legend className="sr-only">Вид услуга</legend>
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {CONTACT_SERVICE_OPTIONS.map((option) => {
              const Icon =
                option.value === "other" ? LuEllipsis : option.value === "nesigurno" ? LuCircleHelp : getCategoryIcon(option.value);
              const isSelected = service === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => chooseService(option.value)}
                  className={clsx(
                    "flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors",
                    isSelected
                      ? "border-accent bg-accent-soft"
                      : "border-br-default bg-bg-page hover:border-br-accent hover:bg-bg-subtle"
                  )}
                >
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-text" />
                  <span className="typo-small tone-strong font-semibold leading-tight hyphens-auto">{option.short}</span>
                </button>
              );
            })}
          </div>
          <FieldError id="quote-service-error" message={errors.service} />
        </fieldset>
      ) : null}

      {step === 2 ? (
        <div className="mt-6 grid gap-6">
          <div>
            <label htmlFor="quote-message" className="typo-h5">
              Какво ви е необходимо? <span className="text-danger">*</span>
            </label>
            <textarea
              id="quote-message"
              rows={5}
              maxLength={5000}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                clearError("message");
              }}
              placeholder={selectedOption?.placeholder}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "quote-message-error" : undefined}
              className={clsx(inputCls(Boolean(errors.message)), "mt-2 resize-y")}
            />
            <FieldError id="quote-message-error" message={errors.message} />
          </div>

          <div>
            <label htmlFor="quote-location" className="typo-h5">
              Къде се намира имотът?
            </label>
            <p id="quote-location-hint" className="typo-small text-tx-muted">
              Населено място, адрес или кадастрален идентификатор – по желание
            </p>
            <input
              id="quote-location"
              type="text"
              maxLength={200}
              autoComplete="street-address"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              aria-describedby="quote-location-hint"
              className={clsx(inputCls(), "mt-2")}
            />
          </div>

          <div>
            <p className="typo-h5">Документи или снимки</p>
            <p className="typo-small text-tx-muted">
              По желание · JPG, PNG, WebP или PDF · до {MAX_FILES} файла, общо до {formatMb(MAX_TOTAL_UPLOAD_SIZE)}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                addFiles(event.dataTransfer.files);
              }}
              className="mt-3 flex w-full items-center gap-3 rounded-xl border border-dashed border-br-strong bg-bg-subtle px-4 py-4 text-left transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <LuUpload aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-text" />
              <span className="typo-small text-tx-secondary">
                <span className="tone-strong font-semibold">Прикачете файл</span> или го плъзнете тук
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              className="hidden"
              aria-label="Прикачване на документи или снимки"
              onChange={(event) => {
                addFiles(event.target.files);
                event.target.value = "";
              }}
            />
            {files.length ? (
              <ul className="mt-3 grid gap-2">
                {files.map((file) => (
                  <li key={fileKey(file)} className="flex items-center gap-3 rounded-lg border border-br-light px-3 py-2">
                    {file.type.startsWith("image/") ? (
                      <LuImage aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-text" />
                    ) : (
                      <LuFile aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-text" />
                    )}
                    <span className="typo-small min-w-0 flex-1 truncate text-tx-primary">{file.name}</span>
                    <span className="typo-small tone-muted tabular-nums">{Math.max(1, Math.round(file.size / 1024))} KB</span>
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((f) => fileKey(f) !== fileKey(file)))}
                      aria-label={`Премахни ${file.name}`}
                      className="rounded-lg p-1 text-tx-muted hover:text-danger"
                    >
                      <LuX aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            <FieldError id="quote-files-error" message={errors.files} />
          </div>

        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-6 grid gap-6">
          <div>
            <label htmlFor="quote-name" className="typo-h5">
              Вашето име <span className="text-danger">*</span>
            </label>
            <input
              id="quote-name"
              type="text"
              autoComplete="name"
              maxLength={100}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearError("name");
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "quote-name-error" : undefined}
              className={clsx(inputCls(Boolean(errors.name)), "mt-2")}
            />
            <FieldError id="quote-name-error" message={errors.name} />
          </div>

          <fieldset>
            <legend className="typo-h5">Как предпочитате да ви отговорим?</legend>
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-bg-subtle p-1">
              {(["phone", "email"] as const).map((value) => (
                <label
                  key={value}
                  className={clsx(
                    "flex h-11 cursor-pointer items-center justify-center rounded-lg font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-accent",
                    method === value ? "bg-bg-page text-tx-primary shadow-card" : "text-tx-muted hover:text-tx-primary"
                  )}
                >
                  <input
                    type="radio"
                    name="contact-method"
                    value={value}
                    checked={method === value}
                    onChange={() => {
                      setMethod(value);
                      setContactValue("");
                      setErrors((prev) => ({ ...prev, contact: undefined }));
                    }}
                    className="sr-only"
                  />
                  {value === "phone" ? "По телефон" : "По имейл"}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="quote-contact" className="typo-h5">
              {method === "phone" ? "Телефон" : "Имейл адрес"} <span className="text-danger">*</span>
            </label>
            <input
              id="quote-contact"
              type={method === "phone" ? "tel" : "email"}
              autoComplete={method === "phone" ? "tel" : "email"}
              inputMode={method === "phone" ? "tel" : "email"}
              maxLength={method === "phone" ? 30 : 254}
              value={contactValue}
              onChange={(event) => {
                setContactValue(event.target.value);
                clearError("contact");
              }}
              aria-invalid={Boolean(errors.contact)}
              aria-describedby={errors.contact ? "quote-contact-error" : undefined}
              className={clsx(inputCls(Boolean(errors.contact)), "mt-2")}
            />
            <FieldError id="quote-contact-error" message={errors.contact} />
          </div>

          <div>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked);
                  clearError("consent");
                }}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "quote-consent-error" : undefined}
                className="mt-1 h-5 w-5 shrink-0 accent-accent"
              />
              <span className="typo-small text-tx-secondary">
                Запознах се с{" "}
                <Link href="/politika-za-poveritelnost" className="font-semibold text-accent-text underline underline-offset-2">
                  Политиката за поверителност
                </Link>
                . Данните се използват само за отговор и оферта.
              </span>
            </label>
            <FieldError id="quote-consent-error" message={errors.consent} />
          </div>
        </div>
      ) : null}

      <div aria-live="assertive">
        {submitError ? (
          <p className="typo-small mt-6 rounded-xl border border-danger/25 bg-danger/8 px-4 py-3 font-medium text-danger">
            {submitError}
          </p>
        ) : null}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-2 border-t border-br-light pt-6 sm:justify-between sm:gap-3">
        {step > 1 ? (
          <Button
            variant="outline"
            size="lg"
            onClick={() => goTo((step - 1) as Step)}
            icon={<LuArrowLeft className="h-4 w-4" />}
            className="shrink-0 max-[359px]:px-4"
          >
            <span className="max-[359px]:sr-only">Назад</span>
          </Button>
        ) : (
          <p className="typo-small inline-flex items-center gap-2 text-tx-muted">
            <LuShieldCheck aria-hidden="true" className="h-4 w-4 text-accent-text" />
            Отнема около минута
          </p>
        )}

        {step === 3 ? (
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            icon={isPending ? <LuLoaderCircle className="h-5 w-5 animate-spin" /> : undefined}
            arrow={!isPending}
            className="flex-1 sm:min-w-52 sm:flex-none"
          >
            {isPending ? "Изпращане…" : "Изпрати"}
          </Button>
        ) : step === 2 ? (
          <Button type="submit" size="lg" arrow className="flex-1 sm:min-w-44 sm:flex-none">
            Напред
          </Button>
        ) : null}
      </div>
    </form>
  );
}
