"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";
import { HELPFUL_NAV_ITEMS } from "@/config/helpfull/helpful-nav";

type NavHelpListProps = {
  onClick?: () => void;
  itemClass: (active: boolean) => string;
};

export const NavHelpList = ({ onClick, itemClass }: NavHelpListProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {HELPFUL_NAV_ITEMS.map((item) => {
        const active = isActive(item.href);

        return (
          <li key={item.slug}>
            <Link href={item.href} onClick={onClick} className={itemClass(active)}>
              <span className="flex min-w-0 flex-col">
                <span>{item.label}</span>
              </span>
            </Link>
          </li>
        );
      })}

      <li
        aria-hidden="true"
        className={clsx(
          "mx-4 my-2 h-px",
          "bg-linear-to-r from-transparent via-white/10 to-transparent"
        )}
      />

      <li>
        <Link
          href="/polezno"
          onClick={onClick}
          className={clsx(itemClass(pathname === "/polezno"))}
        >
          <span>Всички материали</span>
          <FaAngleRight
            className={clsx(
              "hidden md:block",
              "h-3 w-3 text-accent/80 transition-all duration-300",
              "group-hover:translate-x-1 group-hover:text-accent"
            )}
          />
        </Link>
      </li>
    </>
  );
};
