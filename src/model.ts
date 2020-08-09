import { ThunkDispatch as OriginalThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { IStore } from "@app/store/model";

export type TRequestStatus = "not_ready" | "ready" | "error" | "loading";

export type ThunkDispatch = OriginalThunkDispatch<IStore, undefined, Action>;
