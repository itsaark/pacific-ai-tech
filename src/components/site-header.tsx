"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Index" },
  { href: "/#what-we-do", label: "What we do" },
  { href: "/portland-ai-consultant", label: "AI consulting" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/#pricing", label: "Pricing" },
];

type SiteHeaderProps = {
  bookingUrl: string;
};

export function SiteHeader({ bookingUrl }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
  const isActive = (href: string) => {
    if (href === "/case-studies") {
      return pathname.startsWith("/case-studies");
    }

    if (href.includes("#")) {
      return false;
    }

    return pathname === href;
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
              priority
            />
          </span>
          Pacific&nbsp;AI&nbsp;Tech
        </Link>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pat-header-action"
        >
          Book a call
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
      </div>

      <div className="pat-wrap pat-header-nav-row">
        <nav className="pat-primary" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
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
              onClick={closeMenu}
            >
              {item.label}
            </Link>
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
