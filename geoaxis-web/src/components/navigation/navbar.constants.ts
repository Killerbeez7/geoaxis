import clsx from "clsx";

export const glassEffect =
  "bg-bg-nav/85 md:bg-bg-nav/80 backdrop-blur-xl border-white/10";

export const navLinkCls = (active: boolean) =>
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

export const dropdownLinkCls = (active: boolean) =>
  clsx(
    "nav-link group gap-2 px-4 py-2 whitespace-nowrap transition",
    active ? "text-accent hover:bg-bg-muted/10" : "hover:bg-bg-muted/10"
  );

export const mobileDropdownCls = (active: boolean) =>
  clsx(
    "mx-3 flex rounded-xl px-9 py-2 text-[15px] transition-all",
    active
      ? "font-medium text-accent"
      : "text-tx-inverse/75 hover:bg-white/5 hover:text-tx-inverse"
  );

export const mobileRowCls = (active: boolean) =>
  clsx(
    "flex w-full min-h-[56px] items-center justify-between px-6 text-base leading-none transition-all",
    active ? "font-medium text-tx-inverse" : "text-tx-inverse/75 hover:text-tx-inverse"
  );
