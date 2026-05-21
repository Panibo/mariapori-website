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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Layout.navigation");

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
    <div className={styles.languageLinks}>
      <Link
        href={pathname}
        locale="en"
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </Link>

      <span aria-hidden="true">/</span>

      <Link
        href={pathname}
        locale="fi"
        aria-current={locale === "fi" ? "page" : undefined}
      >
        FI
      </Link>
    </div>
  );

  return (
    <header className={styles.header}>
      <nav className={styles.desktopNav}>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {t(link.labelKey)}
          </Link>
        ))}

        {languageLinks}
      </nav>

      <button
        className={styles.menuButton}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <nav className={styles.mobileNav}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}

          <div className={styles.languageLinks}>
            <Link
              href={pathname}
              locale="en"
              onClick={() => setIsOpen(false)}
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href={pathname}
              locale="fi"
              onClick={() => setIsOpen(false)}
              aria-current={locale === "fi" ? "page" : undefined}
            >
              FI
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
