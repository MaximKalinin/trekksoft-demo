import React, { FC } from "react";
import zero from "@app/assets/zero.svg";

import styles from "@app/components/placeholder/styles.module.less";
import appStyles from "@app/containers/app/styles.module.less";

export const NothingPlaceholder: FC<{ onReset: () => void }> = ({
  onReset,
}) => {
  return (
    <div className={styles.start}>
      <img src={zero} />
      <span>{"Hmm... We didn't find any users"}</span>
      <button className={appStyles.more_button} onClick={onReset}>
        RESET
      </button>
    </div>
  );
};
