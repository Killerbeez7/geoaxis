import Image from "next/image";
import { CtaButton } from "@/components/parts/CtaButton";
import { ServiceItem } from "./config/service-categories";

export default function ServiceDetails({
  categoryTitle,
  service,
}: {
  categoryTitle: string;
  service: ServiceItem;
}) {
  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-[28px] border border-br-light bg-bg-section shadow-sm">
        <div className="relative aspect-[16/7]">
          <Image src={service.image} alt={service.title} fill className="object-cover" />
        </div>

        <div className="p-6 md:p-8 lg:p-10">
          <p className="typo-kicker">{categoryTitle}</p>

          <h2 className="mt-3 typo-h2">{service.title}</h2>

          <p className="mt-4 typo-subtitle text-tx-secondary">{service.excerpt}</p>

          <div className="mt-6 space-y-5">
            {service.content.map((paragraph, index) => (
              <p key={index} className="typo-body text-tx-secondary">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton href="/contacts" size="lg">
              Изпратете запитване
            </CtaButton>

            <CtaButton href="/projects" size="lg">
              Вижте проекти
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}
