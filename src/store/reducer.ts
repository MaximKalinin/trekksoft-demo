import { Reducer } from "redux";
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SHOW_PAGE_START,
  SHOW_PAGE_SUCCESS,
  SHOW_PAGE_FAILURE,
} from "@app/store/const";
import { IStore } from "@app/store/model";
import {
  searchSuccess,
  searchFailure,
  showPageSuccess,
  showPageFailure,
} from "@app/store/actions";

const initialState: IStore = {
  search: [],
  page: [],
  status: {
    search: "not_ready",
    page: "not_ready",
  },
  errors: {
    search: null,
    page: null,
  },
};

export const reducer: Reducer<IStore> = (state = initialState, action) => {
  return (
    searchReducer(state, action) || showPageReducer(state, action) || state
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
      return {
        ...state,
        search: payload,
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

const showPageReducer = (state = initialState, action): IStore | null => {
  const { status, errors } = state;
  switch (action.type) {
    case SHOW_PAGE_START:
      return {
        ...state,
        status: {
          ...status,
          page: "loading",
        },
        errors: {
          ...errors,
          page: null,
        },
      };
    case SHOW_PAGE_SUCCESS: {
      const { payload } = action as ReturnType<typeof showPageSuccess>;
      const page = [];
      for (const item of payload) {
        const element = state.search.find(({ login }) => login === item.login);
        page.push({ ...element, repos: item.repos });
      }
      return {
        ...state,
        page,
        status: {
          ...status,
          page: "ready",
        },
      };
    }
    case SHOW_PAGE_FAILURE: {
      const { payload } = action as ReturnType<typeof showPageFailure>;
      return {
        ...state,
        status: {
          ...status,
          page: "error",
        },
        errors: {
          ...errors,
          page: payload,
        },
      };
    }
    default:
      return null;
  }
};
