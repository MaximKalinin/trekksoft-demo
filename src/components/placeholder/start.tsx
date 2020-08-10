import React, { FC } from "react";
import search from "@app/assets/search.svg";

import styles from "@app/components/placeholder/styles.module.less";

export const StartPlaceholder: FC = () => {
  return (
    <div className={styles.start}>
      <img src={search} />
      <span>Enter a login, name or a company you are looking for.</span>
    </div>
  );
};
