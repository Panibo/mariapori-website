"use client";

import { Link, usePathname } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./language-switcher";
import styles from "./header.module.css";

const links = [
  { href: "/", labelKey: "home" },
  { href: "/cv", labelKey: "cv" },
  { href: "/projects", labelKey: "projects" },
  { href: "/contact", labelKey: "contact" },
] as const;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Layout.navigation");
  const ariaT = useTranslations("Layout.aria");

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={
            isOpen ? ariaT("closeNavigation") : ariaT("openNavigation")
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <nav
          className={styles.desktopNav}
          aria-label={ariaT("mainNavigation")}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        <LanguageSwitcher onNavigate={() => setIsOpen(false)} />
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          className={styles.mobileNav}
          aria-label={ariaT("mainNavigation")}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
