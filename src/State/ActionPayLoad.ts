import { Action } from "redux";

export default interface ActionPayload<T> extends Action {
    payload: T;
}