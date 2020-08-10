import React, { FC, useState, useEffect, useMemo } from "react";
import { IStore, Item } from "@app/store/model";
import { ThunkDispatch } from "@app/model";
import { search, fetchInfo } from "@app/store/actions";
import { connect } from "react-redux";
import { Input, Switch, List } from "@app/components";
import SwipeableViews from "react-swipeable-views";

import styles from "@app/containers/app/styles.module.less";

export const AppEl: FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = (props) => {
  const {
    actions: { search: searchAction, fetchInfo },
    users,
    orgs,
    status: { search: searchStatus },
  } = props;
  const [activePane, setActivePane] = useState(0);

  const usersToShow = useMemo(() => users.filter(({ ready }) => ready), [
    users,
  ]);

  const orgsToShow = useMemo(() => orgs.filter(({ ready }) => ready), [orgs]);

  useEffect(() => {
    if (searchStatus === "ready") {
      fetchInfo("User");
      fetchInfo("Organization");
    }
  }, [searchStatus]);
  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Search for GitHub Users</h1>
      <InputHandler searchAction={searchAction} />
      <SwitchHandler
        users={users}
        orgs={orgs}
        activePane={activePane}
        setActivePane={setActivePane}
      />
      <Views
        activePane={activePane}
        usersToShow={usersToShow}
        orgsToShow={orgsToShow}
        fetchInfo={fetchInfo}
      />
    </div>
  );
};

const mapStateToProps = (state: IStore) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  actions: {
    search: (query: string) => dispatch(search(query)),
    fetchInfo: (type: Item["type"]) => dispatch(fetchInfo(type)),
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
  users: Item[];
  orgs: Item[];
}> = ({ setActivePane, activePane, users, orgs }) => {
  const panes = [
    { text: `USERS (${users.length})` },
    { text: `COMPANIES (${orgs.length})` },
  ];
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
  usersToShow: Item[];
  orgsToShow: Item[];
  fetchInfo: (type: Item["type"]) => void;
}> = (props) => {
  const { activePane, usersToShow, orgsToShow, fetchInfo } = props;
  const secondaryFilter = { text: "PUBLIC REPOS", property: "repos" };
  const showMore = (type: Item["type"]) => () => {
    fetchInfo(type);
  };
  return (
    <SwipeableViews index={activePane}>
      <>
        <List
          mainFilter={{ text: "USER", property: "name" }}
          secondaryFilter={secondaryFilter}
          items={usersToShow}
        />
        <button className={styles.more_button} onClick={showMore("User")}>
          SHOW MORE
        </button>
      </>
      <>
        <List
          mainFilter={{ text: "COMPANY", property: "name" }}
          secondaryFilter={secondaryFilter}
          items={orgsToShow}
        />
        <button
          className={styles.more_button}
          onClick={showMore("Organization")}
        >
          SHOW MORE
        </button>
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
