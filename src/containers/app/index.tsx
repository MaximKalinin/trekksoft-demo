import React, { FC, useState, useEffect } from "react";
import { IStore } from "@app/store/model";
import { ThunkDispatch } from "@app/model";
import { search, showPage } from "@app/store/actions";
import { connect } from "react-redux";
import { Input } from "@app/components";

import styles from "@app/containers/app/styles.module.less";

export const AppEl: FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = (props) => {
  const {
    actions: { search: searchAction, showPage },
    page,
    status: { search: searchStatus, page: pageStatus },
  } = props;
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (searchStatus === "ready") {
      showPage(1);
    }
  }, [searchStatus]);
  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Search for GitHub Users</h1>
      <Input
        placeholder="Type a user name here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
        searchDisabled={!query}
        onSearch={() => searchAction(query)}
      />
      {pageStatus === "ready" && (
        <div>
          {page.map(({ id, avatar_url }) => (
            <img src={avatar_url} key={id} />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: IStore) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  actions: {
    search: (query: string) => dispatch(search(query)),
    showPage: (page: number) => dispatch(showPage(page)),
  },
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppEl);
