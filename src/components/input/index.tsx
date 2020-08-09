import React, { forwardRef } from "react";
import styles from "@app/components/input/styles.module.less";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onSearch?: () => void;
  searchDisabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, onSearch, searchDisabled, ...other } = props;
  const internalClassName = [className, styles.label].join(" ");
  return (
    <label className={internalClassName}>
      <input {...other} ref={ref} className={styles.label__input} />
      <button
        className={styles.label__button}
        disabled={searchDisabled}
        onClick={onSearch}
      >
        <span className={styles.button__image} />
      </button>
    </label>
  );
});
