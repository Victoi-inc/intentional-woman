"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
  /** Outlined CTA style (e.g. Contact) */
  cta?: boolean;
};

const LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/model", label: "The Model" },
  { href: "/programmes", label: "Programmes" },
  { href: "/community-impact", label: "Community Impact" },
  { href: "/resources", label: "Resources" },
  { href: "/support-access", label: "Support Access" },
  { href: "/contact", label: "Contact", cta: true },
];

type HomeNavSection = "" | "#support";

/**
 * `/#support` can stick in the URL; derive Support Access active state from scroll on `/`
 * instead of `location.hash`. Community Impact lives at `/community-impact`.
 */
function useHomeNavSection(pathname: string) {
  const [section, setSection] = useState<HomeNavSection>("");

  const compute = useCallback(() => {
    if (pathname !== "/") {
      setSection("");
      return;
    }
    const support = document.getElementById("support");
    if (!support) {
      setSection("");
      return;
    }
    const line =
      window.scrollY +
      Math.min(180, Math.max(96, Math.round(window.innerHeight * 0.22)));
    const supportTop = support.getBoundingClientRect().top + window.scrollY;

    const next: HomeNavSection = line >= supportTop ? "#support" : "";
    setSection((prev) => (prev === next ? prev : next));
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setSection("");
      return;
    }
    const schedule = () => {
      requestAnimationFrame(() => compute());
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, compute]);

  return section;
}

function linkIsActive(
  pathname: string,
  homeSection: HomeNavSection,
  href: string,
) {
  if (href === "/") {
    return pathname === "/" && homeSection === "";
  }
  if (href.startsWith("/#")) {
    if (pathname !== "/") return false;
    return homeSection === href.slice(1);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const linkBaseClass =
  "font-accent text-xs font-semibold uppercase tracking-widest decoration-iw-gold decoration-2 underline-offset-[0.42rem] transition-colors sm:text-sm";

function linkClassName(active: boolean) {
  return active
    ? `${linkBaseClass} text-iw-gold underline`
    : `${linkBaseClass} text-iw-white/95 no-underline hover:text-iw-gold hover:underline`;
}

const ctaLinkBase =
  "font-accent inline-flex items-center justify-center rounded-sm border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-[color,background-color,border-color,box-shadow] sm:text-sm";

function ctaLinkClassName(active: boolean) {
  return active
    ? `${ctaLinkBase} border-iw-gold bg-iw-gold/15 text-iw-gold shadow-[0_0_0_1px_rgb(253_195_0/0.35)]`
    : `${ctaLinkBase} border-iw-white/75 text-iw-white/95 hover:border-iw-gold hover:bg-iw-gold/10 hover:text-iw-gold`;
}

/** On `/`, nav stays clear until scroll passes this (homepage only). */
const HOME_NAV_SOLID_AFTER_PX = 56;
/** On other routes, deeper frosted bar after this scroll (previous behavior). */
const SUBPAGE_FROST_STRONG_AFTER_PX = 20;

export function SiteNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const homeSection = useHomeNavSection(pathname);
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () => setScrollY(window.scrollY);
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const homeAtHeroTop =
    isHome && scrollY <= HOME_NAV_SOLID_AFTER_PX && !open;

  const frostedStrong =
    "border-b border-white/10 bg-iw-purple/85 backdrop-blur-md backdrop-saturate-150";
  const frostedLight =
    "border-b border-white/10 bg-iw-purple/55 backdrop-blur-md backdrop-saturate-150";
  const heroClear =
    "border-b border-transparent bg-transparent backdrop-blur-none backdrop-saturate-100";

  const headerSurface = homeAtHeroTop
    ? heroClear
    : !isHome
      ? scrollY > SUBPAGE_FROST_STRONG_AFTER_PX
        ? frostedStrong
        : frostedLight
      : frostedStrong;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top,0px)] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${headerSurface}`}
      >
        <nav
          className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 py-2 sm:min-h-[4.5rem] sm:px-6 sm:py-2.5 lg:px-8"
          aria-label="Primary"
        >
          <div className="flex flex-1 justify-start md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-iw-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-iw-gold"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden flex-1 justify-center md:flex">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:gap-x-8">
              {LINKS.map(({ href, label, cta }) => {
                const active = linkIsActive(pathname, homeSection, href);
                return (
                  <li key={href + label}>
                    <Link
                      href={href}
                      className={cta ? ctaLinkClassName(active) : linkClassName(active)}
                      aria-current={active ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-1 justify-end md:hidden" aria-hidden />
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-iw-purple/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-lg md:hidden"
          >
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col items-center justify-center gap-8 px-6 pt-20"
            >
              {LINKS.map(({ href, label, cta }) => {
                const active = linkIsActive(pathname, homeSection, href);
                return (
                  <li key={href + label + "m"}>
                    <Link
                      href={href}
                      className={
                        cta
                          ? `${ctaLinkClassName(active)} min-h-11 px-5 text-base`
                          : `${linkClassName(active)} text-base`
                      }
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
