import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import styles from "./Tag.module.css";

type TagType = {
  tagText?: string;

  /** Style props */
  tagBackgroundColor?: Property.BackgroundColor;
  tagTextColor?: Property.Color;
};

const Tag: FunctionComponent<TagType> = ({
  tagText,
  tagBackgroundColor,
  tagTextColor,
}) => {
  const tagStyle: CSS.Properties = useMemo(() => {
    return {
      backgroundColor: tagBackgroundColor,
    };
  }, [tagBackgroundColor]);

  const tagTextStyle: CSS.Properties = useMemo(() => {
    return {
      color: tagTextColor,
    };
  }, [tagTextColor]);

  return (
    <div className={styles.tag} style={tagStyle}>
      <b className={styles.tagtext} style={tagTextStyle}>
        {tagText}
      </b>
    </div>
  );
};

export default Tag;
