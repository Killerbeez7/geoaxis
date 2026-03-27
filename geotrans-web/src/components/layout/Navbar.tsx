"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { brand } from "@/config/content/brand";

import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

import { NavSrvList } from "./NavSrvList";
import { NAV_LINKS, NavLink } from "@/config/nav";
import { siteContent } from "@/config/site-content";
import { MobileMenuToggle } from "../parts/mobileMenuToggle";
import { useScrollShrink } from "@/hooks/use-scroll-shrink";

/* ==================== STYLES ==================== */

const navbarGlass = "bg-bg-nav/95 md:bg-bg-nav/85 backdrop-blur-xl border-white/10";
const dropdownGlass = "bg-bg-nav/95 border border-white/10 shadow-xl";

const navLinkCls = (active: boolean) =>
  clsx(
    "nav-link text-tx-inverse",
    "relative group gap-1 px-2 py-1",
    "after:absolute after:left-1/2 after:bottom-0",
    "after:h-[2px] after:w-full after:-translate-x-1/2",
    "after:origin-center after:scale-x-0 after:bg-accent",
    "after:transition-transform after:duration-300",
    "group-hover:after:scale-x-100",
    active && "md:after:scale-x-100"
  );

const dropdownSrvCls = (active: boolean) =>
  clsx(
    "nav-link gap-2 px-4 py-2 whitespace-nowrap transition",
    active ? "text-accent hover:bg-bg-muted/10" : "hover:bg-bg-muted/10"
    // active ? "bg-bg-muted/20" : "hover:bg-bg-muted/10"
  );

const mobileRowCls = (active: boolean) =>
  clsx(
    "flex w-full min-h-[56px] items-center justify-between px-6 text-base leading-none transition-all",
    active ? "font-medium text-tx-inverse" : "text-tx-inverse/75 hover:text-tx-inverse"
  );

/* ==================== COMPONENT ==================== */

export const Navbar = () => {
  const pathname = usePathname();

  const DEFAULT_NAV_H_PX = "72px";
  const SHRUNK_NAV_H_PX = "60px";
  const SHRINK_SCROLL_Y = 16;

  const isShrunk = useScrollShrink(SHRINK_SCROLL_Y);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);

  const closeAll = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
    setDesktopDropdown(null);
  };

  const navHeight = isShrunk ? SHRUNK_NAV_H_PX : DEFAULT_NAV_H_PX;

  const isActivePath = (href?: string): boolean => {
    if (!href || !pathname) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /* ==================== DESKTOP ==================== */

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
                "mt-px text-xs opacity-70 transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          )}
        </Link>

        {item.hasDropdown && (
          <div
            className={clsx(
              "absolute -left-2 top-full min-w-60 rounded-b-xl",
              dropdownGlass,
              "z-50 border border-t-0 text-tx-inverse ",
              "origin-top-left transition-all duration-300 ease-in-out",
              isShrunk ? "mt-[14px]" : "mt-5",
              isOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
              "before:absolute before:-top-5 before:h-5 before:w-full",
              "will-change-[transform,margin-top]"
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

  /* ==================== MOBILE ==================== */

  const renderMobileItem = (item: NavLink) => {
    const isActive = isActivePath(item.href);
    const isOpen = mobileDropdown === item.label;

    if (!item.hasDropdown) {
      return (
        <div key={item.label} className="flex flex-col">
          <div className="relative border-b border-white/10">
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
        <div className="relative border-b border-white/10">
          {isActive && (
            <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
          )}

          <button
            type="button"
            className={clsx(mobileRowCls(isActive))}
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
              // itemClass={(active) =>
              //   clsx(
              //     "relative mx-3 flex items-center rounded-xl py-2 px-9 text-[15px] transition-all duration-300",
              //     "before:absolute before:left-5 before:h-1 before:w-1 before:rounded-full before:bg-accent before:content-['']",
              //     "before:transition-all before:duration-300 before:ease-out",

              //     active
              //       ? "text-accent font-medium before:opacity-100 before:scale-100"
              //       : "text-tx-inverse/75 hover:bg-white/5 before:opacity-0 before:scale-0"
              //   )
              // }
              itemClass={(active) =>
                clsx(
                  "mx-3 flex rounded-xl px-9 py-2 text-[15px] transition-all",
                  active
                    ? "font-medium text-accent"
                    : "text-tx-inverse/75 hover:bg-white/5 hover:text-tx-inverse"
                )
              }
            />
          </ul>
        </div>
      </div>
    );
  };

  const mobilePanelTop = `calc(${navHeight} + var(--top-bar-h))`;

  return (
    <>
      {/* Top Bar */}
      <div
        className={clsx(
          "fixed inset-x-0 top-0 z-60 hidden overflow-hidden border-b border-white/6 text-xs backdrop-blur-xl md:block",
          "transition-[height] duration-300 ease-in-out",
          "bg-bg-top-nav/95",
          isShrunk ? "pointer-events-none h-0 border-b-0" : "h-(--top-bar-h)"
        )}
      >
        <div className="container-page flex h-(--top-bar-h) items-center justify-between px-4">
          <span className="text-tx-inverse/65 tracking-wide">
            Пон - Пет: 08:30 - 17:30
          </span>

          <a
            href={`tel:${siteContent.contacts.phone}`}
            className="flex items-center gap-2 text-accent transition-all hover:brightness-110"
          >
            <FaPhone />
            <span className="font-medium tracking-wider">
              {siteContent.contacts.phone}
            </span>
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header
        id="navbar"
        className={clsx(
          "fixed inset-x-0 z-55",
          navbarGlass,
          "border-b",
          "no-drag transition-[top,height] duration-300 ease-in-out",
          "will-change-[top,height]"
        )}
        style={{
          top: isShrunk ? "0px" : "var(--top-bar-h)",
          height: navHeight,
        }}
      >
        <nav className="container-page h-full">
          <div className="flex h-full items-center justify-between">
            <Link
              href="/"
              draggable={false}
              className="flex items-center gap-2 px-2 py-1 text-lg tracking-wide text-tx-inverse"
            >
              <div
                className={clsx(
                  "text-white transition-all duration-300 ease-in-out",
                  isShrunk
                    ? "text-2xl font-semibold tracking-tight"
                    : "text-3xl font-semibold tracking-tight"
                )}
              >
                {brand.name}
              </div>
            </Link>

            <ul className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map(renderDesktopItem)}
            </ul>

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
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeAll}
                className="fixed inset-x-0 bottom-0 z-40 bg-black/40"
                style={{ top: mobilePanelTop }}
              />

              <div
                className={clsx(
                  "fixed inset-x-0 z-70 transition-all duration-300 ease-in-out",
                  dropdownGlass,
                  mobileOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                )}
                style={{ top: mobilePanelTop }}
              >
                <div
                  className="overflow-y-auto border-b border-white/10"
                  style={{ height: `calc(100dvh - ${mobilePanelTop})` }}
                >
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
