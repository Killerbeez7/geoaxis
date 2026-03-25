import clsx from "clsx";
import {
  FaRegClock,
  FaRegFileLines,
  FaRegCircleCheck,
  FaShieldHalved,
} from "react-icons/fa6";

type TrustItem = {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const TRUST: TrustItem[] = [
  { title: "Ясни срокове", subtitle: "без изненади", Icon: FaRegClock },
  { title: "Готови документи", subtitle: "за институции", Icon: FaRegFileLines },
  { title: "Прецизност", subtitle: "всяко измерване", Icon: FaRegCircleCheck },
  { title: "Коректност", subtitle: "в комуникацията", Icon: FaShieldHalved },
];

export default function TrustBar({ className }: { className?: string }) {
  return (
    <section
      className={clsx(
        "bg-bg-section bg-linear-to-r from-accent/5 to-bg-brand-soft py-16",
        className
      )}
    >
      <div className="container-page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <div
              key={i}
              className={clsx(
                "flex items-start gap-4 p-5",
                "rounded-2xl",
                "bg-white/30 border border-br-default",
                "transition-all duration-200"
              )}
            >
              <div
                className={clsx(
                  "flex h-11 w-11 shrink-0 items-center justify-center",
                  "rounded-xl",
                  "bg-accent/10 text-accent",
                  "ring-1 ring-accent/15"
                )}
              >
                <t.Icon className="h-[18px] w-[18px]" />
              </div>

              <div>
                <div className="text-[15px] font-semibold text-tx-primary leading-tight">
                  {t.title}
                </div>

                <div className="mt-1 text-[13px] text-tx-muted leading-snug">
                  {t.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
