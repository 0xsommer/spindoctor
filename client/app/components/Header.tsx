import { FunctionComponent } from "react";
import styles from "./Header.module.css";
import AnimatingLogo from "./AnimatingLogo";

const Header: FunctionComponent<{ onAboutClick: () => void, isInOverlay?: boolean }> = ({ onAboutClick, isInOverlay }) => {
  const textColor = isInOverlay ? 'white' : '';
  const borderColor = isInOverlay ? 'white' : 'var(--dark-grey)';
  const buttonText = isInOverlay ? 'Close' : 'About';

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <AnimatingLogo />
      </div>
      <div className={styles.about} onClick={onAboutClick} style={{ color: textColor, borderBottom: `1px solid ${borderColor}` }}>{buttonText}</div>
    </div>
  );
};

export default Header;