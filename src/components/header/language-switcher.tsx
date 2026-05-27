import { Link, usePathname } from "@/src/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import styles from "./language-switcher.module.css";

const languages = [
  { locale: "en", label: "EN", ariaLabelKey: "switchToEnglish" },
  { locale: "fi", label: "FI", ariaLabelKey: "switchToFinnish" },
] as const;

type LanguageSwitcherProps = {
  onNavigate?: () => void;
};

const LanguageSwitcher = ({ onNavigate }: LanguageSwitcherProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  const ariaT = useTranslations("Layout.aria");

  return (
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
          onClick={onNavigate}
          aria-current={locale === language.locale ? "page" : undefined}
          aria-label={ariaT(language.ariaLabelKey)}
        >
          {language.label}
        </Link>
      ))}
    </nav>
  );
};

export default LanguageSwitcher;
