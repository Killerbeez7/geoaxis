"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

import { NavSrvList } from "./NavSrvList";
import { NAV_LINKS, NavLink } from "@/config/nav";
import { siteContent } from "@/config/site-content";
import { MobileMenuToggle } from "../parts/mobileMenuToggle";

// Desktop styles
const navLinkCls = (active: boolean) =>
  clsx(
    "nav-link text-tx-inverse",
    "relative group gap-1 px-2 py-1",
    "after:absolute after:left-1/2 after:bottom-0",
    "after:h-[2px] after:w-full after:-translate-x-1/2",
    "after:origin-center after:scale-x-0 after:bg-accent",
    "after:transition-transform after:duration-300",
    "group-hover:after:scale-x-100",
    active && "bg-bg-muted/10 rounded-xl md:after:scale-x-100 md:bg-transparent"
  );

const dropdownSrvCls = (active: boolean) =>
  clsx(
    "nav-link gap-2 px-4 py-2 whitespace-nowrap transition",
    active ? "bg-bg-muted/30" : "hover:bg-bg-muted/20"
  );

// Mobile styles
const mobileRowCls = (active: boolean) =>
  clsx(
    "flex w-full min-h-[56px] items-center justify-between px-6 text-base leading-none transition-all",
    active ? "font-medium text-tx-inverse" : "text-tx-inverse/75 hover:text-tx-inverse"
  );

export const Navbar = () => {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);

  const closeAll = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
    setDesktopDropdown(null);
  };

  const isActivePath = (href?: string): boolean => {
    if (!href || !pathname) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderDesktopItem = (item: NavLink) => {
    const isActive = isActivePath(item.href);
    const isOpen = desktopDropdown === item.label;

    return (
      <li
        key={item.label}
        className="relative group"
        onMouseEnter={() => setDesktopDropdown(item.label)}
        onMouseLeave={() => setDesktopDropdown(null)}
      >
        <Link
          href={item.href}
          draggable={false}
          className={navLinkCls(isActive)}
          aria-haspopup={item.hasDropdown ? "menu" : undefined}
        >
          {item.label}

          {item.hasDropdown && (
            <IoIosArrowDown
              className={clsx(
                "mt-px text-xs opacity-70 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          )}
        </Link>

        {item.hasDropdown && (
          <div
            className={clsx(
              "absolute -left-2 mt-5 min-w-60 rounded-b-xl",
              "bg-bg-nav/95 backdrop-blur-xl text-tx-inverse",
              "shadow-lg border border-br-light/20 border-t-0",
              "origin-top-left transition-all duration-200",
              isOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
              "before:absolute before:-top-5 before:h-5 before:w-full"
            )}
          >
            <ul className="py-2">
              <NavSrvList itemClass={dropdownSrvCls} onClick={closeAll} />
            </ul>
          </div>
        )}
      </li>
    );
  };

  const renderMobileItem = (item: NavLink) => {
    const isActive = isActivePath(item.href);
    const isOpen = mobileDropdown === item.label;

    if (!item.hasDropdown) {
      return (
        <div key={item.label} className="flex flex-col">
          <div className="relative border-b border-white/5">
            {isActive && (
              <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
            )}

            <Link href={item.href} onClick={closeAll} className={mobileRowCls(isActive)}>
              <span className="leading-none">{item.label}</span>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div key={item.label} className="flex flex-col">
        <div className="relative border-b border-white/5">
          {isActive && (
            <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
          )}

          <button
            type="button"
            className={clsx(mobileRowCls(isActive), isOpen && "bg-white/5")}
            onClick={() => setMobileDropdown(isOpen ? null : item.label)}
            aria-expanded={isOpen}
            aria-label={`Toggle ${item.label}`}
          >
            <span className="leading-none">{item.label}</span>

            <IoIosArrowDown
              className={clsx(
                "shrink-0 text-[18px] transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        <div
          className={clsx(
            "grid transition-all duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <ul className="overflow-hidden pt-1">
            <NavSrvList
              onClick={closeAll}
              itemClass={(active) =>
                clsx(
                  "mx-3 flex rounded-xl px-5 py-2 text-[15px] transition-all",
                  active
                    ? "bg-white/8 font-medium text-accent"
                    : "text-tx-inverse/75 hover:bg-white/5 hover:text-tx-inverse"
                )
              }
            />
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden border-b border-white/5 bg-bg-top-nav content-center h-(--top-bar-h) text-xs text-tx-inverse/70 md:block">
        <div className="container-page flex items-center justify-between px-4">
          <span className="font-medium tracking-wide">Пон - Пет: 08:30 - 17:30</span>
          <a
            href={`tel:${siteContent.contacts.phone}`}
            className="flex items-center gap-2 text-accent transition-all hover:brightness-110"
          >
            <FaPhone />
            <span className="font-semibold tracking-wider">
              {siteContent.contacts.phone}
            </span>
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header
        id="navbar"
        className={clsx(
          "sticky top-0 z-50 h-(--nav-h) w-full",
          "bg-bg-nav/95 backdrop-blur-xl shadow-lg",
          "border-b border-br-light/20",
          "no-drag"
        )}
      >
        <nav className="container-page h-full">
          <div className="flex h-full items-center justify-between">
            <Link
              href="/"
              draggable={false}
              className="flex items-center gap-2 px-2 py-1 text-lg tracking-wide text-tx-inverse"
            >
              <div className="text-3xl font-semibold tracking-tight text-white drop-shadow-md">
                GeoMetric
              </div>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map(renderDesktopItem)}
            </ul>

            {/* Mobile toggle */}
            <MobileMenuToggle
              isOpen={mobileOpen}
              onToggle={() => {
                if (mobileOpen) {
                  setMobileDropdown(null);
                }
                setMobileOpen((prev) => !prev);
              }}
            />
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden">
              {/* Backdrop */}
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeAll}
                className="fixed inset-0 top-(--nav-h) z-40 bg-black/40"
              />

              {/* Mobile panel */}
              <div
                className={clsx(
                  "fixed inset-x-0 top-(--nav-h) z-50 transition-all duration-300 ease-in-out",
                  mobileOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                )}
              >
                <div className="h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-b border-br-light/10 bg-bg-nav/98 shadow-2xl backdrop-blur-xl">
                  <div className="container-page flex flex-col pb-8 pt-2">
                    {NAV_LINKS.map(renderMobileItem)}

                    <Link
                      href="/contacts"
                      onClick={closeAll}
                      className="mt-3 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-tx-inverse"
                    >
                      Запитване
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};
