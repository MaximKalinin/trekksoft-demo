import { axios } from "@app/axios";
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SHOW_PAGE_START,
  SHOW_PAGE_SUCCESS,
  SHOW_PAGE_FAILURE,
} from "@app/store/const";
import { cache } from "@app/cache";
import {
  ISearchResponse,
  Item,
  IDetailedResponse,
  IStore,
} from "@app/store/model";
import { Dispatch } from "redux";
import { PAGE_SIZE } from "@app/const";

const searchFetch = async (query: string) => {
  const endpoint = `/search/users?per_page=100&page=1&q=${encodeURIComponent(
    query
  )}`;
  const { isValid, value } = cache.get(endpoint);
  if (isValid) {
    const response = JSON.parse(value) as { data: ISearchResponse };
    return response.data.items;
  }
  const response = (await axios.get(endpoint)) as { data: ISearchResponse };
  const {
    data: { items },
  } = response;
  cache.set(endpoint, JSON.stringify(response));
  return items;
};

export const search = (query: string) => async (dispatch: Dispatch) => {
  dispatch(searchStart());
  try {
    const items = await searchFetch(query);
    dispatch(searchSuccess(items));
  } catch (e) {
    dispatch(searchFailure(e));
  }
};

export const searchStart = () => ({ type: SEARCH_START });

export const searchSuccess = (items: Array<Item>) => ({
  type: SEARCH_SUCCESS,
  payload: items,
});

export const searchFailure = (error: Error) => ({
  type: SEARCH_FAILURE,
  payload: error,
});

const fetchPublicRepos = async (type: Item["type"], login: Item["login"]) => {
  if (type === "Organization") {
    const response = (await axios.get(`/orgs/${login}`)) as {
      data: IDetailedResponse;
    };
    return { repos: response.data.public_repos, name: response.data.name };
  }
  const response = (await axios.get(`/users/${login}`)) as {
    data: IDetailedResponse;
  };
  return { repos: response.data.public_repos, name: response.data.name };
};

export const showPage = (page: number) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(showPageStart());
  const search = getState().search.filter(
    (_, index) => index >= (page - 1) * PAGE_SIZE && index < page * PAGE_SIZE
  );
  try {
    const result = await Promise.all(
      search.map(async ({ login, type }) => {
        const { repos, name } = await fetchPublicRepos(type, login);
        return {
          login,
          repos,
          name,
        };
      })
    );
    dispatch(showPageSuccess(result));
  } catch (e) {
    dispatch(showPageFailure(e));
  }
};

export const showPageStart = () => ({ type: SHOW_PAGE_START });

export const showPageSuccess = (
  items: Array<{ login: string; repos: number; name: string }>
) => ({
  type: SHOW_PAGE_SUCCESS,
  payload: items,
});

export const showPageFailure = (error: Error) => ({
  type: SHOW_PAGE_FAILURE,
  payload: error,
});
