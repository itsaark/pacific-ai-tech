"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#top", label: "Index", active: true },
  { href: "#what-we-do", label: "What we do" },
  { href: "#pricing", label: "Pricing" },
];

type SiteHeaderProps = {
  bookingUrl: string;
};

export function SiteHeader({ bookingUrl }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className="pat-site-head">
      <div className="pat-wrap pat-header-inner">
        <a className="pat-brand" href="#top" aria-label="Pacific AI Tech home">
          <span className="pat-brand-mark" aria-hidden="true">
            <Image
              src="/pacific-ai-tech/img/logo-pine.png"
              alt=""
              width={225}
              height={512}
              priority
            />
          </span>
          Pacific&nbsp;AI&nbsp;Tech
        </a>

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

        <nav className="pat-primary" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.active ? "active" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
          >
            Book a call
          </a>
        </nav>
      </div>

      <nav
        id="mobile-navigation"
        className={menuOpen ? "pat-mobile-primary is-open" : "pat-mobile-primary"}
        aria-label="Mobile navigation"
      >
        <div className="pat-wrap pat-mobile-primary-inner">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.active ? "active" : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
            onClick={closeMenu}
          >
            Book a call
          </a>
        </div>
      </nav>
    </header>
  );
}
