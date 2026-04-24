import { FaStar } from "react-icons/fa";
import { Section } from "@/components/layout/Section";
import { TestimonialsContent } from "@/config/content/testimonials";

const testimonials = [
  {
    name: "Иван Петров",
    role: "Частен клиент",
    text: "Работихме с GeoAxis за геодезическо заснемане на парцел преди започване на строеж. Работата беше свършена бързо и много професионално, а комуникацията беше ясна през целия процес.",
  },
  {
    name: "Мария Георгиева",
    role: "Архитект",
    text: "Отлично съдействие при изготвяне на необходимите геодезически данни за проект. Получихме точни материали и бърза реакция при всякакви въпроси.",
  },
  {
    name: "Николай Стоянов",
    role: "Инвеститор",
    text: "Работили сме с различни геодезисти, но при GeoAxis останахме най-доволни. Точност, коректност и много добро отношение към клиента.",
  },
];

export function TestimonialsSection({
  id,
  kicker,
  title,
  subtitle,
}: TestimonialsContent) {
  return (
    <Section id={id} tone="muted">
      <div className="max-w-4xl mb-12 sm:mb-14">
        <span className="typo-kicker inline-block border-b border-accent/40 pb-2">
          {kicker}
        </span>
        <h2 className="typo-h2 mt-2">{title}</h2>
        <p className="typo-subtitle mt-3">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl bg-bg-page border border-br-light/80 p-7"
          >
            <div className="flex gap-0.5 text-accent mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="h-3.5 w-3.5" />
              ))}
            </div>

            <p className="text-[15px] leading-relaxed text-tx-secondary mb-6">
              &ldquo;{item.text}&rdquo;
            </p>

            <div>
              <p className="text-[15px] font-semibold text-tx-primary">{item.name}</p>
              <p className="text-[13px] text-tx-muted">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
