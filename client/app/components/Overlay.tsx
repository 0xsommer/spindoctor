import { FunctionComponent } from "react";
import Header from "../components/Header";
import styles from "./Overlay.module.css";

const Overlay: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayWrapper}>
        <div className={styles.overlayHeaderWrapper}><Header onAboutClick={onClose} isInOverlay={true} /></div>
        <div className={styles.aboutwrapper}>
          <div className={styles.bubble}>
            <b className={styles.bubbletext}>About</b>
          </div>
          <div className={styles.inneraboutwrapper}>
            <div className={styles.h2}>
              spindoctor.ai provides real-time sentiment analysis of short-form
              text using AI. If you want to know in advance how your news article
              headline or blog post title will resonate with readers, you can run
              it through spindoctor.ai. What you get is a simple but effective
              reaction: Yeah! Mhm. Boo!
            </div>
            <div className={styles.text}>
              {`Please note: spindoctor.ai is currently available as a free beta version. Reach out `}
              <span className={styles.here}>here</span> for providing feedback or
              getting further information.
            </div>
          </div>
        </div>
        <div className={styles.aboutwrapper}>
          <div className={styles.bubble}>
            <b className={styles.bubbletext}>Legal notice</b>
          </div>
          <div className={styles.inneraboutwrapper}>
            <div className={styles.h2}>
              spindoctor.ai does not collect any personal information from users.
              However, any text you submit when using spindoctor.ai will be stored
              in a Firebase database–for internal use only.
            </div>
            <div className={styles.text}>
              {`Reach out `}
              <span className={styles.here}>here</span> for getting further
              information or having queries deleted.
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <img className={styles.heartIcon} alt="" src="/heart.svg" />
          <div className={styles.bubbletext}>
            <span>{`Built by `}</span>
            <span className={styles.sostStudio}><a className={styles.sostStudio} href ="https://sost.wtf">sost studio</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
