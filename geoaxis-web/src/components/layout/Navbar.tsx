"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { brand } from "@/config/content/brand";

import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";

import { NavSrvList } from "../navigation/NavSrvList";
import { NavHelpList } from "../navigation/NavHelpList";

import { NAV_LINKS, type NavLink } from "@/config/nav";

import { TopBar } from "../navigation/TopBar";
import { MobileMenuToggle } from "../parts/mobileMenuToggle";
import { useScrollShrink } from "@/hooks/use-scroll-shrink";

import {
  glassEffect,
  navLinkCls,
  dropdownLinkCls,
  mobileDropdownCls,
  mobileRowCls,
} from "../navigation/navbar.constants";
import type { DesktopDropdownType, DropdownPosition } from "../navigation/navbar.types";

export const Navbar = () => {
  const pathname = usePathname();

  const NAV_H = { DEFAULT: 72, SHRUNK: 60, DEFAULT_PX: "72px", SHRUNK_PX: "60px" };
  const SHRINK_SCROLL_Y = 16;
  const NAV_TRANSITION_MS = 300;

  const { isShrunk, isTransitioning } = useScrollShrink(
    SHRINK_SCROLL_Y,
    NAV_TRANSITION_MS
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const [desktopDropdown, setDesktopDropdown] = useState<DesktopDropdownType>(null);
  const [desktopDropdownPos, setDesktopDropdownPos] = useState<DropdownPosition | null>(
    null
  );

  const servicesTriggerRef = useRef<HTMLLIElement | null>(null);
  const helpfulTriggerRef = useRef<HTMLLIElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const navHeight = isShrunk ? NAV_H.SHRUNK_PX : NAV_H.DEFAULT_PX;

  const isActivePath = (href?: string): boolean => {
    if (!href || !pathname) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const getTriggerRef = (type: DesktopDropdownType) => {
    if (type === "services") return servicesTriggerRef;
    if (type === "helpful") return helpfulTriggerRef;
    return null;
  };

  const updateDesktopDropdownPosition = (type: Exclude<DesktopDropdownType, null>) => {
    const triggerRef = getTriggerRef(type);
    const headerEl = headerRef.current;

    if (!triggerRef?.current || !headerEl) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const headerRect = headerEl.getBoundingClientRect();
    const currentNavHeight = isShrunk ? NAV_H.SHRUNK : NAV_H.DEFAULT;

    setDesktopDropdownPos({
      top: headerRect.top + currentNavHeight,
      left: triggerRect.left - 8,
    });
  };

  const openDesktopDropdown = (type: Exclude<DesktopDropdownType, null>) => {
    if (isTransitioning) return;

    clearCloseTimeout();
    updateDesktopDropdownPosition(type);
    setDesktopDropdown(type);
  };

  const cancelDesktopClose = () => {
    clearCloseTimeout();
  };

  const scheduleDesktopClose = () => {
    clearCloseTimeout();

    closeTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
      setDesktopDropdownPos(null);
      closeTimeoutRef.current = null;
    }, 120);
  };

  const closeAll = () => {
    clearCloseTimeout();
    setMobileOpen(false);
    setMobileDropdown(null);
    setDesktopDropdown(null);
    setDesktopDropdownPos(null);
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!desktopDropdown) return;

    const handleResize = () => {
      updateDesktopDropdownPosition(desktopDropdown);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [desktopDropdown, isShrunk]);

  useEffect(() => {
    if (!desktopDropdown) return;

    updateDesktopDropdownPosition(desktopDropdown);
  }, [desktopDropdown, isShrunk]);

  useEffect(() => {
    if (!isTransitioning) return;

    const rafId = window.requestAnimationFrame(() => {
      clearCloseTimeout();
      setDesktopDropdown(null);
      setDesktopDropdownPos(null);
      setMobileDropdown(null);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [isTransitioning]);

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  const renderDesktopDropdownContent = () => {
    if (desktopDropdown === "helpful") {
      return <NavHelpList itemClass={dropdownLinkCls} onClick={closeAll} />;
    }

    if (desktopDropdown === "services") {
      return <NavSrvList itemClass={dropdownLinkCls} onClick={closeAll} />;
    }

    return null;
  };

  const renderMobileDropdownContent = (item: NavLink) => {
    if (item.dropdownType === "helpful") {
      return <NavHelpList onClick={closeAll} itemClass={mobileDropdownCls} />;
    }

    return <NavSrvList onClick={closeAll} itemClass={mobileDropdownCls} />;
  };

  /* ==================== DESKTOP ==================== */

  const renderDesktopItem = (item: NavLink) => {
    const isActive = isActivePath(item.href);
    const isOpen = desktopDropdown === item.dropdownType;

    const ref =
      item.dropdownType === "services"
        ? servicesTriggerRef
        : item.dropdownType === "helpful"
          ? helpfulTriggerRef
          : undefined;

    return (
      <li
        key={item.label}
        ref={ref}
        className="relative group"
        onMouseEnter={() => {
          if (!item.dropdownType || isTransitioning) return;
          openDesktopDropdown(item.dropdownType);
        }}
        onMouseLeave={() => {
          if (item.dropdownType) {
            scheduleDesktopClose();
          }
        }}
      >
        <Link
          href={item.href}
          draggable={false}
          className={navLinkCls(isActive)}
          aria-haspopup={item.hasDropdown ? "menu" : undefined}
          aria-expanded={item.hasDropdown ? isOpen : undefined}
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
            onClick={() => {
              if (isTransitioning) return;
              setMobileDropdown(isOpen ? null : item.label);
            }}
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
          <ul className="overflow-hidden pt-1">{renderMobileDropdownContent(item)}</ul>
        </div>
      </div>
    );
  };

  const mobilePanelTop = `calc(${navHeight} + var(--top-bar-h))`;

  return (
    <>
      {/* Top Bar */}
      <TopBar isShrunk={isShrunk} />

      {/* Navbar */}
      <header
        ref={headerRef}
        id="navbar"
        className={clsx(
          "fixed inset-x-0 z-100",
          glassEffect,
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
                    : "text-[28px] font-semibold tracking-tight lg:text-3xl"
                )}
              >
                {brand.name}
              </div>
            </Link>

            <ul
              className={clsx(
                "hidden items-center md:flex md:gap-3 lg:gap-6",
                isTransitioning && "pointer-events-none"
              )}
            >
              {NAV_LINKS.map(renderDesktopItem)}
            </ul>

            <MobileMenuToggle
              isOpen={mobileOpen}
              onToggle={() => {
                if (isTransitioning) return;

                if (mobileOpen) {
                  setMobileDropdown(null);
                }

                setMobileOpen((prev) => !prev);
              }}
            />
          </div>
        </nav>
      </header>

      {/* Mobile Panel*/}
      {mobileOpen && (
        <div className="fixed inset-0 z-70 md:hidden">
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
              glassEffect,
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

      {/* Desktop dropdown*/}
      <div className="pointer-events-none fixed inset-0 z-70 hidden md:block">
        {desktopDropdown && desktopDropdownPos && !isTransitioning && (
          <div
            className="pointer-events-auto absolute"
            style={{
              top: desktopDropdownPos.top,
              left: desktopDropdownPos.left,
            }}
            onMouseEnter={cancelDesktopClose}
            onMouseLeave={scheduleDesktopClose}
          >
            <div
              className={clsx(
                "min-w-60 rounded-b-xl border border-t-0 text-tx-inverse",
                glassEffect,
                "origin-top-left transition-all duration-300 ease-in-out",
                "scale-100 opacity-100",
                "will-change-[transform,opacity]",
                "before:absolute before:-top-5 before:h-5 before:w-full",
                "will-change-[transform,margin-top]"
              )}
            >
              <ul className="py-2">{renderDesktopDropdownContent()}</ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
