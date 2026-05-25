"use client";

import { Link, usePathname } from "@/src/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import styles from "./header.module.css";

const links = [
  { href: "/", labelKey: "home" },
  { href: "/cv", labelKey: "cv" },
  { href: "/projects", labelKey: "projects" },
  { href: "/contact", labelKey: "contact" },
] as const;

const languages = [
  { locale: "en", label: "EN", ariaLabelKey: "switchToEnglish" },
  { locale: "fi", label: "FI", ariaLabelKey: "switchToFinnish" },
] as const;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
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

  const languageLinks = (
    <nav
      className={styles.languageSwitcher}
      aria-label={ariaT("languageSelection")}
    >
      {languages.map((language) => (
        <Link
          key={language.locale}
          className={`${styles.languageLink} ${
            locale === language.locale ? styles.languageLinkActive : ""
          }`}
          href={pathname}
          locale={language.locale}
          onClick={() => setIsOpen(false)}
          aria-current={locale === language.locale ? "page" : undefined}
          aria-label={ariaT(language.ariaLabelKey)}
        >
          {language.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#main-content">
        {ariaT("skipToContent")}
      </a>

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

        {languageLinks}
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
