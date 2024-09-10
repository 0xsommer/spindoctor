// src/Animatinglogo.tsx
import React, { useEffect, useRef } from 'react';
import styles from './AnimatingLogo.module.css';

const Animatinglogo: React.FC = () => {
  const dot1 = useRef<HTMLDivElement>(null);
  const dot2 = useRef<HTMLDivElement>(null);
  const dot3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function animateDots() {
      setTimeout(() => {
        if (dot1.current && dot2.current && dot3.current) {
          dot1.current.style.zIndex = "2";
          dot2.current.style.zIndex = "1";
          dot3.current.style.zIndex = "3";
        }
      }, 800);

      setTimeout(() => {
        if (dot1.current && dot2.current && dot3.current) {
          dot1.current.style.left = "20px";
          dot2.current.style.left = "40px";
          dot3.current.style.left = "0px";
        }
      }, 1000);

      setTimeout(() => {
        if (dot1.current && dot2.current && dot3.current) {
          dot2.current.style.zIndex = "3";
          dot3.current.style.zIndex = "2";
          dot1.current.style.zIndex = "1";
        }
      }, 2800);

      setTimeout(() => {
        if (dot1.current && dot2.current && dot3.current) {
          dot1.current.style.left = "40px";
          dot2.current.style.left = "0px";
          dot3.current.style.left = "20px";
        }
      }, 3000);

      setTimeout(() => {
        if (dot1.current && dot2.current && dot3.current) {
          dot1.current.style.zIndex = "3";
          dot2.current.style.zIndex = "2";
          dot3.current.style.zIndex = "1";
        }
      }, 4800);

      setTimeout(() => {
        if (dot1.current && dot2.current && dot3.current) {
          dot1.current.style.left = "0px";
          dot2.current.style.left = "20px";
          dot3.current.style.left = "40px";
        }
      }, 5000);
    }

    const interval = setInterval(animateDots, 6000);
    animateDots();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.dot} ${styles.green}`} ref={dot1}></div>
      <div className={`${styles.dot} ${styles.yellow}`} ref={dot2}></div>
      <div className={`${styles.dot} ${styles.red}`} ref={dot3}></div>
    </div>
  );
};

export default Animatinglogo;