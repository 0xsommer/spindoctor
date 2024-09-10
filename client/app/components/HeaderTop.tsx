import { FunctionComponent } from "react";
import styles from "./HeaderTop.module.css";

const HeaderTop: FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <div className={styles.contentwrapper}>
        <div className={styles.text}>
          <b>spindoctor.ai</b>
          <span>{` is an AI-powered live audience at your fingertips. You can use it to rate text such as news article headlines or blog post titles. Within seconds, you’ll get a positive, neutral, or negative reaction: `}</span><span className={styles.green}>Yeah!</span><span className={styles.yellow}>Mhm.</span><span className={styles.red}>Booo!</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
