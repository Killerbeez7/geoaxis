"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { LuArrowRight, LuChevronDown, LuCircleHelp, LuMenu, LuPhone, LuX } from "react-icons/lu";

import { NAV_ITEMS, type NavItem } from "@/config/nav";
import { contactLinks, contacts } from "@/config/content/contacts";
import { getCategoryIcon } from "@/config/services/icons";
import { Button } from "@/components/ui/Button";
import { MOBILE_MENU_EVENT } from "./MobileActionBar";
import { IconBadge } from "@/components/ui/IconBadge";
import { Logo } from "@/components/ui/Logo";

export type NavServiceLink = { slug: string; title: string; description: string };
export type NavHelpfulLink = { href: string; label: string; description: string };

type MenuId = NonNullable<NavItem["menu"]>;

type Props = {
  services: NavServiceLink[];
  helpful: NavHelpfulLink[];
};

const HOVER_CLOSE_DELAY_MS = 160;

export function Navbar({ services, helpful }: Props) {
  const pathname = usePathname();

  // Menus remember the page they were opened on, so navigating closes them without an effect.
  const [openMenu, setOpenMenu] = useState<{ id: MenuId; path: string } | null>(null);
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<MenuId | null>(null);

  const activeMenu = openMenu?.path === pathname ? openMenu.id : null;
  const mobileOpen = mobileFor === pathname;

  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openDesktopMenu = (id: MenuId) => {
    cancelClose();
    setOpenMenu({ id, path: pathname });
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), HOVER_CLOSE_DELAY_MS);
  };

  // Escape and outside clicks close the desktop menus.
  useEffect(() => {
    if (!activeMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      headerRef.current?.querySelector<HTMLElement>(`[data-menu-trigger="${activeMenu}"]`)?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [activeMenu]);

  // Lock page scroll behind the mobile menu; Escape closes it.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(MOBILE_MENU_EVENT, { detail: mobileOpen }));
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileFor(null);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => cancelClose, []);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileFor(null);
  };

  return (
    <header
      ref={headerRef}
      className="on-dark fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-white/10 bg-bg-chrome text-tx-inverse"
      onMouseLeave={scheduleClose}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        <Link href="/" onClick={closeAll} className="rounded-lg text-tx-inverse" aria-label="GeoAxis – начало">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Основна навигация" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              if (!item.menu) {
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      onMouseEnter={scheduleClose}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={clsx(
                        "typo-ui relative inline-flex h-10 items-center rounded-lg px-3.5 font-medium transition-colors",
                        active ? "text-tx-inverse" : "text-tx-inverse-muted hover:text-tx-inverse"
                      )}
                    >
                      {item.label}
                      {active ? (
                        <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-[18px] h-0.5 rounded-full bg-accent" />
                      ) : null}
                    </Link>
                  </li>
                );
              }

              const menuId = item.menu;
              const expanded = activeMenu === menuId;

              return (
                <li
                  key={item.id}
                  className={clsx("flex h-full items-center", menuId === "helpful" && "relative")}
                  onMouseEnter={() => openDesktopMenu(menuId)}
                >
                  <button
                    type="button"
                    data-menu-trigger={menuId}
                    aria-expanded={expanded}
                    aria-controls={`menu-${menuId}`}
                    onClick={() => (expanded ? setOpenMenu(null) : openDesktopMenu(menuId))}
                    className={clsx(
                      "typo-ui relative inline-flex h-10 items-center gap-1.5 rounded-lg px-3.5 font-medium transition-colors",
                      active || expanded ? "text-tx-inverse" : "text-tx-inverse-muted hover:text-tx-inverse"
                    )}
                  >
                    {item.label}
                    <LuChevronDown
                      aria-hidden="true"
                      className={clsx("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")}
                    />
                    {active ? (
                      <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-[18px] h-0.5 rounded-full bg-accent" />
                    ) : null}
                  </button>

                  {menuId === "services" ? (
                    <div
                      id="menu-services"
                      hidden={!expanded}
                      onMouseEnter={cancelClose}
                      className="absolute inset-x-0 top-full border-t border-white/10 bg-bg-chrome shadow-lift"
                    >
                      <div className="container-page grid gap-8 py-8 xl:grid-cols-[minmax(0,1fr)_19rem]">
                        <ul className="grid gap-1 sm:grid-cols-2 xl:grid-cols-3">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/uslugi/${service.slug}`}
                                onClick={closeAll}
                                className="flex gap-3.5 rounded-xl p-3 transition-colors hover:bg-white/6"
                              >
                                <IconBadge icon={getCategoryIcon(service.slug)} dark />
                                <span className="min-w-0">
                                  <span className="typo-h5 block">{service.title}</span>
                                  <span className="typo-small tone-muted mt-0.5 line-clamp-2 block">
                                    {service.description}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-col justify-between rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                          <div>
                            <LuCircleHelp aria-hidden="true" className="h-6 w-6 text-accent-on-dark" />
                            <p className="typo-h5 mt-3">Не знаете коя услуга ви трябва?</p>
                            <p className="typo-small mt-1.5 text-tx-inverse-muted">
                              Изберете ситуацията си и ще ви покажем подходящата услуга.
                            </p>
                          </div>
                          <div className="mt-5 grid gap-2">
                            <Button href="/uslugi#koya-usluga" variant="outline-light" onClick={closeAll} arrow>
                              Помощ при избора
                            </Button>
                            <Link
                              href="/uslugi"
                              onClick={closeAll}
                              className="typo-small inline-flex items-center justify-center gap-1 py-1 font-semibold text-accent-on-dark hover:underline"
                            >
                              Всички услуги
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      id="menu-helpful"
                      hidden={!expanded}
                      onMouseEnter={cancelClose}
                      className="absolute left-0 top-full w-[22rem] rounded-b-2xl border border-t-0 border-white/10 bg-bg-chrome p-2 shadow-lift"
                    >
                      <ul>
                        {helpful.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={closeAll}
                              className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/6"
                            >
                              <span className="typo-h5 block">{link.label}</span>
                              <span className="typo-small tone-muted mt-0.5 line-clamp-1 block">
                                {link.description}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/polezno"
                        onClick={closeAll}
                        className="typo-small mt-1 flex items-center justify-between rounded-xl border-t border-white/10 px-4 py-3 font-semibold text-accent-on-dark hover:bg-white/6"
                      >
                        Всички материали
                        <LuArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contactLinks.tel}
            data-track="call_click"
            className="typo-ui hidden items-center gap-2 rounded-lg px-3 py-2 font-semibold text-tx-inverse tabular-nums transition-colors hover:text-accent-on-dark lg:inline-flex"
          >
            <LuPhone aria-hidden="true" className="h-4 w-4 text-accent-on-dark" />
            {contacts.phone}
          </a>
          <a
            href={contactLinks.tel}
            data-track="call_click"
            aria-label={`Обадете се: ${contacts.phone}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-accent-on-dark transition-colors hover:bg-white/8 lg:hidden"
          >
            <LuPhone aria-hidden="true" className="h-5 w-5" />
          </a>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Затвори менюто" : "Отвори менюто"}
            onClick={() => setMobileFor(mobileOpen ? null : pathname)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-tx-inverse transition-colors hover:bg-white/8 lg:hidden"
          >
            {mobileOpen ? <LuX aria-hidden="true" className="h-6 w-6" /> : <LuMenu aria-hidden="true" className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu. The header's backdrop blur makes it the containing block, so the height is explicit. */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="fixed inset-x-0 top-full h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-white/10 bg-bg-chrome lg:hidden"
      >
        <nav aria-label="Мобилна навигация" className="container-page flex min-h-full flex-col pt-4 pb-[calc(6rem+env(safe-area-inset-bottom))]">
          <ul className="divide-y divide-white/10">
            {NAV_ITEMS.map((item) => {
              if (!item.menu) {
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={clsx(
                        "typo-h4 flex min-h-14 items-center font-medium",
                        isActive(item.href) ? "text-accent-on-dark" : "text-tx-inverse"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const menuId = item.menu;
              const expanded = mobileSection === menuId;
              const links =
                menuId === "services"
                  ? services.map((service) => ({ href: `/uslugi/${service.slug}`, label: service.title }))
                  : helpful.map((link) => ({ href: link.href, label: link.label }));

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`mobile-${menuId}`}
                    onClick={() => setMobileSection(expanded ? null : menuId)}
                    className="typo-h4 flex min-h-14 w-full items-center justify-between font-medium"
                  >
                    {item.label}
                    <LuChevronDown
                      aria-hidden="true"
                      className={clsx("h-5 w-5 transition-transform duration-200", expanded && "rotate-180")}
                    />
                  </button>
                  <ul id={`mobile-${menuId}`} hidden={!expanded} className="pb-3">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className="flex min-h-11 items-center rounded-lg pl-4 text-tx-inverse-muted hover:bg-white/6 hover:text-tx-inverse"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="flex min-h-11 items-center gap-2 rounded-lg pl-4 font-semibold text-accent-on-dark"
                      >
                        {menuId === "services" ? "Всички услуги" : "Всички материали"}
                        <LuArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>

        </nav>
      </div>
    </header>
  );
}
