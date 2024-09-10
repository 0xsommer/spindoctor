"use client"

import { FunctionComponent, useState, useEffect, useRef, RefObject } from 'react';
import Header from '../components/Header';
import SentimentContainer from '../components/SentimentContainer';
import Footer from '../components/Footer';
import styles from './SpindoctorDesktop.module.css';
import { BounceLoader } from 'react-spinners';
import HeaderTop from '../components/HeaderTop';
import Bubble from '../components/Bubble';
import Overlay from '../components/Overlay';

const useAppHeight = (inputRef: RefObject<HTMLInputElement>) => {
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    const handleInputFocus = () => {
      setTimeout(appHeight, 100);
    };

    const handleInputBlur = () => {
      setTimeout(appHeight, 100);
    };

    window.addEventListener('resize', appHeight);
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', handleInputFocus);
      inputRef.current.addEventListener('blur', handleInputBlur);
    }
    appHeight();

    // Clean up the listeners when the component unmounts
    return () => {
      window.removeEventListener('resize', appHeight);
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', handleInputFocus);
        inputRef.current.removeEventListener('blur', handleInputBlur);
      }
    };
  }, [inputRef]);
};

const SpindoctorDesktop: FunctionComponent = () => {
  const [selectedSentiment, setSelectedSentiment] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [positiveReason, setPositiveReason] = useState('');
  const [neutralReason, setNeutralReason] = useState('');
  const [hasInputBeenFocused, setHasInputBeenFocused] = useState(false);
  const [negativeReason, setNegativeReason] = useState('');
  const [headlineInput, setHeadlineInput] = useState('');
  const [userName, setUserName] = useState('spindoctor');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sentimentContainerColor, setSentimentContainerColor] = useState('');
  const [bottomBackgroundColor, setBottomBackgroundColor] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const inputRef = useRef(null); // Add this line to create a ref for the input element

  useAppHeight(inputRef); // Pass the inputRef to the custom hook

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    handleAnalyzeClick(); // Trigger the API call
  };


  useEffect(() => {
    setIsMobile(window.innerWidth < 1000);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeadlineInput(event.target.value);
  };

  const getRandomColor = () => {
    const colors = ['var(--green-light)', 'var(--yellow-light)', 'var(--red-light)'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleAnalyzeClick = async () => {
    setSelectedSentiment('');
    setPositiveReason('');
    setNeutralReason('');
    setNegativeReason('');
    setIsLoading(true);

    const colorShufflingInterval = setInterval(() => {
      setBottomBackgroundColor(getRandomColor());
    }, 150);

    try {
      const response = await fetch('/api/sentiment-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: headlineInput })
      });

      const data = await response.json();

      const sentiment = data.sentiment;
      const reason = data.reason;

      if (sentiment === 'positive') {
        setPositiveReason(reason);
        setSelectedSentiment('Positive');
      } else if (sentiment === 'neutral') {
        setNeutralReason(reason);
        setSelectedSentiment('Neutral');
      } else if (sentiment === 'negative') {
        setNegativeReason(reason);
        setSelectedSentiment('Negative');
      } else {
        console.error('Unexpected sentiment value:', sentiment);
      }
    } catch (error) {
      console.error('Error fetching sentiment analysis:', error);
    } finally {
      setIsLoading(false);
      clearInterval(colorShufflingInterval);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setHasInputBeenFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className={styles.spindoctor}>
      {isOverlayVisible && <Overlay onClose={() => setIsOverlayVisible(!isOverlayVisible)} />}
      {!isMobile && (<div className={styles.footerWrapper}><Footer /></div>)}
      <div className={styles.mainwrapper} ref={inputRef}>
        <div className={styles.top}>
          <Header onAboutClick={() => setIsOverlayVisible(!isOverlayVisible)} isInOverlay={false} />
          <div className={styles.topInner}>
            <div className={styles.applicationwrapper}>
              <div className={styles.header}>
                <Bubble text="We’re only human, after all." />
                <div className={styles.h1}>How will your headline make people feel?</div></div>
              {(!isMobile || !hasInputBeenFocused) && <HeaderTop />}
              {isMobile && (
                <div className={styles.mobileContainer}>
                  <SentimentContainer
                    sentiment={selectedSentiment}
                    sentimentReason={
                      selectedSentiment === 'Positive'
                        ? positiveReason
                        : selectedSentiment === 'Neutral'
                          ? neutralReason
                          : negativeReason
                    }
                    propOpacity={1}
                  />
                </div>
              )}
            </div>
            <form onSubmit={handleFormSubmit} className={styles.inputForm}>
              <input
                ref={inputRef}
                className={styles.input}
                type="search"
                placeholder="Enter text to evaluate its sentiment"
                value={headlineInput}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <button
                className={styles.button}
                type="submit" // Change the button type to "submit"
                onClick={handleAnalyzeClick}
                disabled={isLoading || !headlineInput.trim()}
              >
                {isLoading ? (
                  <BounceLoader
                    color="#FFF"
                    size={20}
                    className={styles.spinner}
                  />
                ) : (
                  <div className={styles.analyze}>Get reaction</div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={styles.bottom}
        style={{
          backgroundColor: isLoading ? bottomBackgroundColor : '',
          background: isLoading ? bottomBackgroundColor : '',
        }}
      >
        {!isMobile && (
          <SentimentContainer
            sentiment={selectedSentiment}
            sentimentReason={
              selectedSentiment === 'Positive'
                ? positiveReason
                : selectedSentiment === 'Neutral'
                  ? neutralReason
                  : negativeReason
            }
            propOpacity={1}
          />
        )}
      </div>
    </div>
  );
};

export default SpindoctorDesktop;