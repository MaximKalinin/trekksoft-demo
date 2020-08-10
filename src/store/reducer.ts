import { Reducer } from "redux";
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
  RESET,
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
    user_info: "not_ready",
    org_info: "not_ready",
  },
  errors: {
    search: null,
    user_info: null,
    org_info: null,
  },
};

export const reducer: Reducer<IStore> = (state = initialState, action) => {
  return (
    searchReducer(state, action) ||
    fetchInfoReducer(state, action) ||
    resetReducer(state, action) ||
    state
  );
};

const searchReducer = (state, action): IStore | null => {
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

const fetchInfoReducer = (state, action): IStore | null => {
  const { status, errors } = state;
  switch (action.type) {
    case FETCH_INFO_USER_START:
      return {
        ...state,
        status: {
          ...status,
          user_info: "loading",
        },
        errors: {
          ...errors,
          user_info: null,
        },
      };
    case FETCH_INFO_USER_SUCCESS: {
      const { payload } = action as ReturnType<typeof fetchInfoSuccess>;
      return {
        ...state,
        users: state.users.map((item) => {
          const info = payload.find(
            (infoItem) => infoItem.login === item.login
          );
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
          user_info: "ready",
        },
      };
    }
    case FETCH_INFO_USER_FAILURE: {
      const { payload } = action as ReturnType<typeof fetchInfoFailure>;
      return {
        ...state,
        status: {
          ...status,
          user_info: "error",
        },
        errors: {
          ...errors,
          user_info: payload,
        },
      };
    }
    case FETCH_INFO_ORG_START:
      return {
        ...state,
        status: {
          ...status,
          org_info: "loading",
        },
        errors: {
          ...errors,
          org_info: null,
        },
      };
    case FETCH_INFO_ORG_SUCCESS: {
      const { payload } = action as ReturnType<typeof fetchInfoSuccess>;
      return {
        ...state,
        orgs: state.orgs.map((item) => {
          const info = payload.find(
            (infoItem) => infoItem.login === item.login
          );
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
          org_info: "ready",
        },
      };
    }
    case FETCH_INFO_ORG_FAILURE: {
      const { payload } = action as ReturnType<typeof fetchInfoFailure>;
      return {
        ...state,
        status: {
          ...status,
          org_info: "error",
        },
        errors: {
          ...errors,
          org_info: payload,
        },
      };
    }
    default:
      return null;
  }
};

const resetReducer = (_, action): IStore | null => {
  switch (action.type) {
    case RESET:
      return initialState;
    default:
      return null;
  }
};
