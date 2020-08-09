import React, { FC, useEffect, useState } from "react";

import styles from "@app/components/switch/styles.module.less";

interface IProps {
  options: Array<{ text: string }>;
  activeOptionId: number;
  onActiveChange: (active: number) => void;
}

export const Switch: FC<IProps> = (props) => {
  const { options, activeOptionId, onActiveChange } = props;
  const [position, setPosition] = useState({ left: 0, width: 0 });
  const setActivePosition = (id: number) => {
    const element = document.querySelector(`[data-option-id="${id}"]`);
    const trackElement = document
      .getElementsByClassName(styles.bottom__track)
      .item(0);
    if (!element || !trackElement) return;
    const { left, width } = element.getBoundingClientRect();
    const { left: trackLeft } = trackElement.getBoundingClientRect();
    setPosition({ left: left - trackLeft, width });
  };
  useEffect(() => {
    setActivePosition(activeOptionId);
  }, [activeOptionId]);
  return (
    <div className={styles.switch}>
      <div className={styles.switch__options}>
        {options.map(({ text }, index) => (
          <div
            className={`${styles.switch__option}${
              index === activeOptionId
                ? ` ${styles["switch__option--active"]}`
                : ""
            }`}
            key={index}
            data-option-id={index}
            onClick={() => onActiveChange(index)}
          >
            <span className={styles.option__text}>{text}</span>
          </div>
        ))}
      </div>
      <div className={styles.bottom__track}>
        <span className={styles.bottom__active} style={{ ...position }}></span>
      </div>
    </div>
  );
};
