"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteContent } from "@/config/site-content";

type NavSrvListProps = {
  onClick?: () => void;
  itemClass: (active: boolean) => string;
};

export const NavSrvList = ({ onClick, itemClass }: NavSrvListProps) => {
  const pathname = usePathname();

  const SERVICE_LINKS = siteContent.services.items;

  const isExact = (href: string) => pathname === href;

  return (
    <>
      {SERVICE_LINKS.map((service) => {
        const href = `/services/${service.slug}`;
        const active = isExact(href);

        return (
          <li key={service.id}>
            <Link href={href} onClick={onClick} className={itemClass(active)}>
              {service.title}
            </Link>
          </li>
        );
      })}
      <li
        aria-hidden
        className={clsx(
          "mt-3 mx-3 h-px",
          "bg-linear-to-r",
          "from-transparent",
          "via-br-light/20",
          "to-transparent"
        )}
      />
      <li>
        <Link
          href="/services"
          onClick={onClick}
          className={itemClass(isExact("/services"))}
        >
          Виж всички
        </Link>
      </li>
    </>
  );
};
