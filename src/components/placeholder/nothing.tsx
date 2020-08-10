import React, { FC } from "react";
import zero from "@app/assets/zero.svg";

import styles from "@app/components/placeholder/styles.module.less";

export const NothingPlaceholder: FC = () => {
  return (
    <div className={styles.start}>
      <img src={zero} />
      <span>{"Hmm... We didn't find any users"}</span>
    </div>
  );
};
