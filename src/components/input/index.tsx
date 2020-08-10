import React, { forwardRef } from "react";
import styles from "@app/components/input/styles.module.less";
import { Spinner } from "@app/components";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onSearch?: () => void;
  searchDisabled?: boolean;
  loading?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, onSearch, searchDisabled, loading, ...other } = props;
  const internalClassName = [className, styles.label].join(" ");
  return (
    <label className={internalClassName}>
      <input {...other} ref={ref} className={styles.label__input} />
      <button
        className={styles.label__button}
        disabled={searchDisabled || loading}
        onClick={onSearch}
      >
        {loading ? <Spinner /> : <span className={styles.button__image} />}
      </button>
    </label>
  );
});
