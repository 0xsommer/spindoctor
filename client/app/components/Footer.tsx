import { FunctionComponent } from "react";
import styles from "./Footer.module.css";

const Footer: FunctionComponent = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.blog}>Be kind on paper.</div>
      <div className={styles.blog}>Be kind in life.</div>
    </div>
  );
};

export default Footer;
