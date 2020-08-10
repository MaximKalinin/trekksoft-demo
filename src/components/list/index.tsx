import React, { FC, useState, useMemo } from "react";
import styles from "@app/components/list/styles.module.less";
import orderBy from "lodash.orderby";

interface IListProps {
  mainFilter?: {
    text: string;
    property: string;
  };
  secondaryFilter?: {
    text: string;
    property: string;
  };
  items: any[];
  imageProperty?: string;
  loginProperty?: string;
  nameProperty?: string;
  secondaryInfoProperty?: string;
}

type TFilter = "main" | "secondary";

export const List: FC<IListProps> = (props) => {
  const {
    mainFilter,
    secondaryFilter,
    items,
    imageProperty,
    loginProperty,
    nameProperty,
    secondaryInfoProperty,
  } = props;
  const [activeFilter, setActiveFilter] = useState<TFilter>(
    mainFilter ? "main" : "secondary"
  );
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const handleClick = (filter: TFilter) => () => {
    if (activeFilter === filter) {
      setOrder(order === "asc" ? "desc" : "asc");
      return;
    }
    setActiveFilter(filter);
    setOrder("asc");
  };
  const sortedItems = useMemo(() => {
    const sortProperty =
      activeFilter === "main"
        ? mainFilter?.property
        : secondaryFilter?.property;
    if (!sortProperty) return items;
    return orderBy(items, [sortProperty], [order]);
  }, [activeFilter, order, items]);
  const orderClassName = (filter: TFilter) =>
    `${styles.option__order}${
      (activeFilter === filter && order === "asc") || activeFilter !== filter
        ? ` ${styles["option__order--asc"]}`
        : ""
    }`;
  const optionClassName = (filter: TFilter) =>
    `${styles.filter__option}${
      activeFilter === filter ? ` ${styles["filter__option--active"]}` : ""
    }`;
  console.log(sortedItems, items);
  return (
    <div className={styles.list}>
      <div className={styles.filter}>
        <div className={optionClassName("main")} onClick={handleClick("main")}>
          {mainFilter && (
            <>
              <span>{mainFilter.text}</span>
              <span className={orderClassName("main")} />
            </>
          )}
        </div>
        <div
          className={optionClassName("secondary")}
          onClick={handleClick("secondary")}
        >
          {secondaryFilter && (
            <>
              <span>{secondaryFilter.text}</span>
              <span className={orderClassName("secondary")} />
            </>
          )}
        </div>
      </div>
      <div>
        {sortedItems.map((item, index) => (
          <div className={styles.item} key={index}>
            <img src={item[imageProperty]} />
            <div className={styles.item__main}>
              <span className={styles.main__login}>{item[loginProperty]}</span>
              <span className={styles.main__name}>{item[nameProperty]}</span>
            </div>
            <div className={styles.item__secondary}>
              {item[secondaryInfoProperty]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

List.defaultProps = {
  imageProperty: "avatar_url",
  loginProperty: "login",
  nameProperty: "name",
  secondaryInfoProperty: "repos",
};
