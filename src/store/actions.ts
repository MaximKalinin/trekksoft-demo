import { axios } from "@app/axios";
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  FETCH_INFO_USER_START,
  FETCH_INFO_USER_SUCCESS,
  FETCH_INFO_USER_FAILURE,
  FETCH_INFO_ORG_START,
  FETCH_INFO_ORG_SUCCESS,
  FETCH_INFO_ORG_FAILURE,
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

export const fetchInfo = (type: Item["type"]) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(fetchInfoStart(type));
  const key = type === "User" ? "users" : "orgs";
  const items = [];
  getState()[key].forEach((item) => {
    if (!item.ready && items.length < PAGE_SIZE) {
      items.push(item);
    }
  });
  try {
    const result = await Promise.all(
      items.map(async ({ login }) => {
        const { repos, name } = await fetchPublicRepos(type, login);
        return {
          login,
          repos,
          name,
        };
      })
    );
    dispatch(fetchInfoSuccess(type, result));
  } catch (e) {
    dispatch(fetchInfoFailure(type, e));
  }
};

export const fetchInfoStart = (type: Item["type"]) => ({
  type: type === "User" ? FETCH_INFO_USER_START : FETCH_INFO_ORG_START,
});

export const fetchInfoSuccess = (
  type: Item["type"],
  items: Array<{ login: string; repos: number; name: string }>
) => ({
  type: type === "User" ? FETCH_INFO_USER_SUCCESS : FETCH_INFO_ORG_SUCCESS,
  payload: items,
});

export const fetchInfoFailure = (type: Item["type"], error: Error) => ({
  type: type === "User" ? FETCH_INFO_USER_FAILURE : FETCH_INFO_ORG_FAILURE,
  payload: error,
});
