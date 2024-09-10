import { FunctionComponent } from "react";
import styles from "./Bubble.module.css";

type BubbleType = {
  text?: string;
};

const Bubble: FunctionComponent<BubbleType> = ({ text }) => {
  return (
    <div className={styles.bubble}>
      <b className={styles.text}>{text}</b>
    </div>
  );
};

export default Bubble;
