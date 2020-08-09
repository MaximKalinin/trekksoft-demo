import { TRequestStatus } from "@app/model";

export interface ISearchResponse {
  incomplete_results: boolean;
  items: Array<Item>;
  total_count: number;
}

export interface Item {
  id: number;
  login: string;
  type: "User" | "Organization";
  avatar_url: string;
}

export interface IPageItem extends Item {
  repos: number;
}

export interface IDetailedResponse {
  public_repos: number;
}

export interface IStore {
  search: Array<Item>;
  page: Array<IPageItem>;
  status: {
    search: TRequestStatus;
    page: TRequestStatus;
  };
  errors: {
    search: Error | null;
    page: Error | null;
  };
}
