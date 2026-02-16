"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";
import { NAV_LINKS, NavItem } from "@/config/NavConfig";
import { NavSrvList } from "./NavSrvList";

// Styles
const navLinkCls = (active: boolean) =>
    clsx(
        "nav-link",
        "relative group gap-1 px-2 py-1",
        // Underline on hover
        "after:absolute after:left-1/2 after:bottom-0",
        "after:h-[2px] after:w-full after:-translate-x-1/2",
        "after:origin-center after:scale-x-0 after:bg-accent",
        "after:transition-transform after:duration-300",
        "group-hover:after:scale-x-100",
        active && "after:scale-x-100",
    );

const dropdownSrvCls = (active: boolean) =>
    clsx(
        "nav-link gap-2 px-4 py-2 whitespace-nowrap transition",
        active ? "bg-bg-muted/40" : "hover:bg-bg-muted/20",
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
    const renderDesktopItem = (item: NavItem) => {
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
                                isOpen && "rotate-180",
                            )}
                        />
                    )}
                </Link>

                {item.hasDropdown && (
                    <div
                        className={clsx(
                            "absolute left-[-10] mt-5 min-w-60 rounded-b-xl",
                            "bg-bg-nav/95 backdrop-blur-xl text-tx-inverse",
                            "shadow-lg border border-br-strong/40",
                            "transition-all duration-200 origin-top-left",
                            // "border-t-br-light/20",
                            isOpen
                                ? "opacity-100 scale-100 pointer-events-auto"
                                : "opacity-0 scale-95 pointer-events-none",
                            "before:absolute before:-top-5 before:h-5 before:w-full",
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
    const renderMobileItem = (item: NavItem) => {
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
                    <ul className="ml-4 mt-1 flex flex-col gap-1">
                        <NavSrvList
                            onClick={closeAll}
                            itemClass={(active) =>
                                clsx(
                                    "px-4 py-2 rounded-md text-sm transition",
                                    active
                                        ? "bg-bg-muted/40 font-medium"
                                        : "hover:bg-bg-muted/25",
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
        <header
            id="navbar"
            className={clsx(
                "sticky top-0 z-50 w-full h-(--nav-h)",
                "bg-bg-nav/90",
                "backdrop-blur-xl shadow-lg",
                "border-b border-br-light/20",
                "no-drag",
            )}
        >
            <nav className="mx-auto max-w-7xl px-5 h-full">
                <div className="flex h-full items-center justify-between">
                    <Link
                        href="/"
                        draggable={false}
                        className="flex items-center gap-2 px-2 py-1 text-lg tracking-wide text-tx-inverse"
                    >
                        <svg
                            className="w-7 h-7 text-accent"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            aria-hidden
                        >
                            <g clipPath="url(#a)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1"
                                    fill="currentColor"
                                />
                            </g>
                            <defs>
                                <clipPath id="a">
                                    <path fill="currentColor" d="M0 0h16v16H0z" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="nav-link">GeoTrans</span>
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
                    <div className="md:hidden pb-6 mt-2 text-tx-inverse">
                        <div className="p-4 flex flex-col gap-3">
                            {NAV_LINKS.map(renderMobileItem)}

                            <Link
                                href="/contacts"
                                onClick={closeAll}
                                className="mt-3 px-4 py-3 rounded-lg bg-accent text-center text-sm font-semibold"
                            >
                                Запитване
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};
