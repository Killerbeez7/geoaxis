"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { NavSrvList } from "./NavSrvList";
import { NAV_LINKS, NavLink } from "@/config/NavConfig";
import { siteContent } from "@/config/site-content";

const brandName = siteContent.brand.name;

// Styles
const navLinkCls = (active: boolean) =>
  clsx(
    "nav-link text-tx-inverse",
    "relative group gap-1 px-2 py-1",
    // Underline on hover
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

// Component
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

  // Desktop render
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
              "transition-all duration-200 origin-top-left",
              isOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none",
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

  // Mobile render
  const renderMobileItem = (item: NavLink) => {
    const isActive = isActivePath(item.href);
    const isOpen = mobileDropdown === item.label;

    if (!item.hasDropdown) {
      return (
        <Link
          key={item.label}
          href={item.href}
          onClick={closeAll}
          className={navLinkCls(isActive)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div key={item.label} className="flex flex-col">
        <button
          className={clsx(navLinkCls(isActive), "flex w-full justify-between")}
          onClick={() => setMobileDropdown(isOpen ? null : item.label)}
          aria-expanded={isOpen}
        >
          {item.label}
          <IoIosArrowDown
            className={clsx("transition-transform", isOpen && "rotate-180")}
          />
        </button>

        {isOpen && (
          <ul className="mt-1 flex flex-col gap-1">
            <NavSrvList
              onClick={closeAll}
              itemClass={(active) =>
                clsx(
                  "px-4 py-2 rounded-md text-tx-inverse/95 text-sm transition",
                  active ? " flex bg-bg-muted/10 font-medium" : "hover:bg-bg-muted/25"
                )
              }
            />
          </ul>
        )}
      </div>
    );
  };
  // Render
  return (
    <>
      <div className="bg-gray-300/20 backdrop-blur-md text-white/90 text-xs md:text-sm tracking-wider">
        <div
          className={clsx(
            "container-page h-(--top-bar-h) flex justify-center md:justify-between items-center",
            "px-6 sm:px-8 lg:px-12 xl:px-8 2xl:px-4"
          )}
        >
          <span className="hidden md:block">Пон-Пет 8:30-17:30</span>
          <a
            href="tel:+359888123456"
            className="flex items-center gap-2.5 hover:text-[#d4af37]"
          >
            <FaPhone />
            {siteContent.contacts.phone}
          </a>
        </div>
      </div>
      <header
        id="navbar"
        className={clsx(
          "sticky top-0 z-50 w-full h-(--nav-h)",
          "bg-bg-nav/95",
          "backdrop-blur-xl shadow-lg",
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
              <div className="text-3xl font-semibold text-white tracking-tight drop-shadow-md">
                GeoMetric
              </div>
            </Link>

            {/* Desktop Links*/}
            <ul className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map(renderDesktopItem)}
            </ul>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-2xl text-tx-inverse"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden">
              {/* Backdrop */}
              <button
                aria-label="Close menu"
                onClick={closeAll}
                className="fixed inset-0 top-(--nav-h) z-40 bg-black/40"
              />

              {/* Panel */}
              <div
                className={clsx(
                  "fixed left-0 right-0 top-(--nav-h) z-50",
                  "bg-bg-nav/98 backdrop-blur-xl shadow-xl"
                )}
              >
                <div className="container-page py-4">
                  <div className="flex flex-col gap-3">
                    {NAV_LINKS.map(renderMobileItem)}

                    <Link
                      href="/contacts"
                      onClick={closeAll}
                      className="mt-3 px-4 py-3 rounded-lg bg-accent text-center text-sm font-semibold text-tx-inverse"
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
