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
  repos?: number;
  name?: string;
  ready: boolean;
}

export interface IDetailedResponse {
  public_repos: number;
  name: string;
}

export interface IStore {
  users: Item[];
  orgs: Item[];
  status: {
    search: TRequestStatus;
    user_info: TRequestStatus;
    org_info: TRequestStatus;
  };
  errors: {
    search: Error | null;
    user_info: Error | null;
    org_info: Error | null;
  };
}
