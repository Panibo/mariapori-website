import styles from "./footer.module.css";
import { siteConfig } from "@/src/config/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span>
          &copy; {year} {siteConfig.name}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
