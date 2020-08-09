import React, { FC, useState, useEffect } from "react";
import { IStore } from "@app/store/model";
import { ThunkDispatch } from "@app/model";
import { search, showPage } from "@app/store/actions";
import { connect } from "react-redux";

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
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button disabled={!query} onClick={() => searchAction(query)}>
        search
      </button>
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
