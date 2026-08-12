"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portland-ai-consultant", label: "AI consulting" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type SiteHeaderProps = {
  bookingUrl: string;
};

export function SiteHeader({ bookingUrl }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const setActiveFromHref = (href: string) => {
    const hrefHash = href.split("#")[1];
    setCurrentHash(hrefHash ? `#${hrefHash}` : "");
  };

  const isActive = (href: string) => {
    const [hrefPath, hrefHash = ""] = href.split("#");

    if (href === "/case-studies") {
      return pathname.startsWith("/case-studies");
    }

    if (href === "/services") {
      return pathname === "/services";
    }

    if (href === "/contact") {
      return pathname === "/contact";
    }

    if (hrefHash) {
      return pathname === hrefPath && currentHash === `#${hrefHash}`;
    }

    return pathname === href && currentHash === "";
  };

  return (
    <header className="pat-site-head">
      <div className="pat-wrap pat-header-brand-row">
        <Link className="pat-brand" href="/" aria-label="Pacific AI Tech home">
          <span className="pat-brand-mark" aria-hidden="true">
            <Image
              src="/pacific-ai-tech/img/logo-pine.png"
              alt=""
              width={225}
              height={512}
              sizes="22px"
            />
          </span>
          Pacific&nbsp;AI&nbsp;Tech
        </Link>

        <Link
          href={bookingUrl}
          className="pat-header-action"
        >
          Book a call
        </Link>

        <button
          className="pat-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div className="pat-wrap pat-header-nav-row">
        <nav className="pat-primary" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              onClick={() => setActiveFromHref(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <nav
        id="mobile-navigation"
        className={menuOpen ? "pat-mobile-primary is-open" : "pat-mobile-primary"}
        aria-label="Mobile navigation"
      >
        <div className="pat-wrap pat-mobile-primary-inner">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              onClick={() => {
                setActiveFromHref(item.href);
                closeMenu();
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={bookingUrl}
            className="cta"
            onClick={closeMenu}
          >
            Book a call
          </Link>
        </div>
      </nav>
    </header>
  );
}
