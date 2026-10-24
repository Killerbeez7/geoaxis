import clsx from "clsx";
import { FaViber } from "react-icons/fa6";
import { LuClock, LuPhone } from "react-icons/lu";
import { contactLinks, contacts } from "@/config/content/contacts";
import { Button } from "./Button";
import { Eyebrow, Heading, Text } from "./Text";

type Props = {
  service?: string;
  title?: string;
  text?: string;
  className?: string;
};

const channel = "typo-h5 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-bg-subtle";

// Sticky sidebar card on service and article pages: one clear next step plus the fastest channels.
export function InquiryCard({
  service,
  title = "Имате конкретен имот?",
  text = "Изпратете адрес или идентификатор и ще ви кажем срока, цената и какво е нужно.",
  className,
}: Props) {
  return (
    <div className={clsx("on-light rounded-2xl border border-br-light bg-bg-page p-6 shadow-card", className)}>
      <Eyebrow>Запитване</Eyebrow>
      <Heading as="p" size="h4" className="mt-3">
        {title}
      </Heading>
      <Text size="small" className="mt-2">
        {text}
      </Text>

      <Button
        href={service ? `/contacts?service=${service}` : "/contacts"}
        arrow
        track="quote_click"
        className="mt-5 w-full"
      >
        Поискайте оферта
      </Button>

      <div className="mt-5 grid gap-0.5 border-t border-br-light pt-4">
        <a href={contactLinks.tel} data-track="call_click" className={clsx(channel, "tabular-nums")}>
          <LuPhone aria-hidden="true" className="h-4 w-4 text-accent-text" />
          {contacts.phone}
        </a>
        <a href={contactLinks.viber} data-track="viber_click" className={channel}>
          <FaViber aria-hidden="true" className="h-4 w-4 text-accent-text" />
          Пишете ни във Viber
        </a>
        <Text size="small" tone="muted" className="flex items-center gap-3 px-2 py-2">
          <LuClock aria-hidden="true" className="h-4 w-4 shrink-0" />
          {contacts.responseTime}
        </Text>
      </div>
    </div>
  );
}
