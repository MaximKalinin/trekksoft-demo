import React, { FC } from "react";

import styles from "@app/components/placeholder/styles.module.less";

export const ErrorPlaceholder: FC = ({}) => {
  return (
    <div className={styles.start}>
      <span>Seems like you reached the limit :,( Try again later</span>
    </div>
  );
};
