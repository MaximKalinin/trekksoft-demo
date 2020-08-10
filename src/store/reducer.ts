import { Reducer } from "redux";
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  FETCH_INFO_START,
  FETCH_INFO_SUCCESS,
  FETCH_INFO_FAILURE,
} from "@app/store/const";
import { IStore } from "@app/store/model";
import {
  searchSuccess,
  searchFailure,
  fetchInfoSuccess,
  fetchInfoFailure,
} from "@app/store/actions";

const initialState: IStore = {
  users: [],
  orgs: [],
  status: {
    search: "not_ready",
    info: "not_ready",
  },
  errors: {
    search: null,
    info: null,
  },
};

export const reducer: Reducer<IStore> = (state = initialState, action) => {
  return (
    searchReducer(state, action) || fetchInfoReducer(state, action) || state
  );
};

const searchReducer = (state = initialState, action): IStore | null => {
  const { status, errors } = state;
  switch (action.type) {
    case SEARCH_START:
      return {
        ...state,
        status: {
          ...status,
          search: "loading",
        },
        errors: {
          ...errors,
          search: null,
        },
      };
    case SEARCH_SUCCESS: {
      const { payload } = action as ReturnType<typeof searchSuccess>;
      const users = payload.filter(({ type }) => type === "User");
      const orgs = payload.filter(({ type }) => type === "Organization");
      return {
        ...state,
        users,
        orgs,
        status: {
          ...status,
          search: "ready",
        },
      };
    }
    case SEARCH_FAILURE: {
      const { payload } = action as ReturnType<typeof searchFailure>;
      return {
        ...state,
        status: {
          ...status,
          search: "error",
        },
        errors: {
          ...errors,
          search: payload,
        },
      };
    }
    default:
      return null;
  }
};

const fetchInfoReducer = (state = initialState, action): IStore | null => {
  const { status, errors } = state;
  switch (action.type) {
    case FETCH_INFO_START:
      return {
        ...state,
        status: {
          ...status,
          info: "loading",
        },
        errors: {
          ...errors,
          info: null,
        },
      };
    case FETCH_INFO_SUCCESS: {
      const {
        payload: { items, type },
      } = action as ReturnType<typeof fetchInfoSuccess>;
      const key = type === "User" ? "users" : "orgs";
      return {
        ...state,
        [key]: state[key].map((item) => {
          const info = items.find((infoItem) => infoItem.login === item.login);
          if (!info) return item;
          return {
            ...item,
            name: info.name,
            repos: info.repos,
            ready: true,
          };
        }),
        status: {
          ...status,
          info: "ready",
        },
      };
    }
    case FETCH_INFO_FAILURE: {
      const { payload } = action as ReturnType<typeof fetchInfoFailure>;
      return {
        ...state,
        status: {
          ...status,
          info: "error",
        },
        errors: {
          ...errors,
          info: payload,
        },
      };
    }
    default:
      return null;
  }
};
