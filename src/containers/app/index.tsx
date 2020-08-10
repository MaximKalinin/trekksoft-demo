import React, { FC, useState, useEffect, useMemo } from "react";
import { IStore, IPageItem } from "@app/store/model";
import { ThunkDispatch } from "@app/model";
import { search, showPage } from "@app/store/actions";
import { connect } from "react-redux";
import { Input, Switch, List } from "@app/components";
import SwipeableViews from "react-swipeable-views";
import { PAGE_SIZE } from "@app/const";

import styles from "@app/containers/app/styles.module.less";

export const AppEl: FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = (props) => {
  const {
    actions: { search: searchAction, showPage },
    page,
    status: { search: searchStatus, page: pageStatus },
  } = props;
  const [activePane, setActivePane] = useState(0);

  const users = useMemo(() => page.filter(({ type }) => type === "User"), [
    page,
  ]);

  const orgs = useMemo(
    () => page.filter(({ type }) => type === "Organization"),
    [page]
  );

  useEffect(() => {
    if (searchStatus === "ready") {
      showPage(1);
    }
  }, [searchStatus]);
  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Search for GitHub Users</h1>
      <InputHandler searchAction={searchAction} />
      <SwitchHandler activePane={activePane} setActivePane={setActivePane} />
      <Views
        activePane={activePane}
        users={users}
        orgs={orgs}
        showPage={showPage}
      />
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

const InputHandler: FC<{
  searchAction: (query: string) => void;
}> = ({ searchAction }) => {
  const [query, setQuery] = useState("");
  return (
    <Input
      placeholder="Type a user name here"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className={styles.input}
      searchDisabled={!query}
      onSearch={() => searchAction(query)}
    />
  );
};

const SwitchHandler: FC<{
  activePane: number;
  setActivePane: (pane: number) => void;
}> = ({ setActivePane, activePane }) => {
  const panes = [{ text: "USERS (504)" }, { text: "COMPANIES (2)" }];
  return (
    <Switch
      options={panes}
      activeOptionId={activePane}
      onActiveChange={setActivePane}
    />
  );
};

const Views: FC<{
  activePane: number;
  users: IPageItem[];
  orgs: IPageItem[];
  showPage: (page: number) => void;
}> = (props) => {
  const { activePane, users, orgs, showPage } = props;
  const secondaryFilter = { text: "PUBLIC REPOS", property: "repos" };
  const showMore = () => {
    showPage((users.length + orgs.length) / PAGE_SIZE + 1);
  };
  return (
    <SwipeableViews index={activePane}>
      <>
        <List
          mainFilter={{ text: "USER", property: "name" }}
          secondaryFilter={secondaryFilter}
          items={users}
        />
        <button onClick={showMore}>show more</button>
      </>
      <>
        <List
          mainFilter={{ text: "COMPANY", property: "name" }}
          secondaryFilter={secondaryFilter}
          items={orgs}
        />
        <button onClick={showMore}>show more</button>
      </>
      {/* <List /> */}
    </SwipeableViews>
  );
};

[
  {
    login: "johndoe20000",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    repos: 6,
    name: "fred",
  },
  {
    login: "johndoe20000",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    repos: 2,
    name: "barney",
  },
  {
    login: "johndoe20000",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    repos: 3,
    name: "barney",
  },
  {
    login: "johndoe20000",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    repos: 1,
    name: "fred",
  },
];
