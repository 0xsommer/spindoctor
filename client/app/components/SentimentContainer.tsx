import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import styles from "./SentimentContainer.module.css";
import Tag from "./Tag";

type SentimentContainerType = {
  sentimentEmoji?: string;
  sentiment?: string;
  sentimentReason?: string;
  sentimentTag?: string;

  /** Style props */
  propBackgroundColor?: Property.BackgroundColor;
  propBorder?: Property.Border;
  propColor?: Property.Color;
  propOpacity?: number;
};

type TagStyles = {
  tagText: string;
  tagBackgroundColor: string;
  tagTextColor: string;
};

type ContainerStyles = {
  backgroundColor: string;
  textColor: string;
};

const SentimentContainer: FunctionComponent<SentimentContainerType> = ({
  sentiment,
  sentimentReason,
  propOpacity,
}) => {

  const outerContainerStyle: CSS.Properties = useMemo(() => {
    return {
      opacity: propOpacity,
    };
  }, [propOpacity]);

  const getTagStyles = (sentiment: string): TagStyles => {
    switch (sentiment) {
      case "Positive":
        return {
          tagText: "Yeah!",
          tagBackgroundColor: "var(--green)",
          tagTextColor: "var(--basics-white)",
        };
      case "Negative":
        return {
          tagText: "Booo!",
          tagBackgroundColor: "var(--red)",
          tagTextColor: "var(--basics-white)",
        };
      case "Neutral":
      default:
        return {
          tagText: "Mhm.",
          tagBackgroundColor: "var(--yellow)",
          tagTextColor: "var(--basics-white)",
        };
    }
  };

  const getContainerStyles = (sentiment: string): ContainerStyles => {
    switch (sentiment) {
      case "Positive":
        return {
          backgroundColor: "var(--green-light)",
          textColor: "var(--green)",
        };
      case "Negative":
        return {
          backgroundColor: "var(--red-light)",
          textColor: "var(--red)",
        };
      case "Neutral":
      default:
        return {
          backgroundColor: "var(--yellow-light)",
          textColor: "var(--yellow)",
        };
    }
  };

  const tagStyles = sentiment ? getTagStyles(sentiment) : { tagText: '', tagBackgroundColor: '', tagTextColor: '' };
  const containerStyles = sentiment ? getContainerStyles(sentiment) : { backgroundColor: '', textColor: '' };

  return (
    <div className={styles.sentimentContainer} style={{ ...outerContainerStyle, backgroundColor: containerStyles.backgroundColor }}>
      <div className={styles.resultInnerWrapper}>
        {sentiment && (
          <Tag
            tagText={tagStyles.tagText}
            tagBackgroundColor={tagStyles.tagBackgroundColor}
            tagTextColor={tagStyles.tagTextColor}
          />
        )}{" "}
        <div className={styles.sentimentString} style={{ color: containerStyles.textColor }}>{sentiment}</div>
      </div>
      <div className={styles.resultInnerWrapper}>
      {sentimentReason}
      </div>
    </div>
  );
};

export default SentimentContainer;