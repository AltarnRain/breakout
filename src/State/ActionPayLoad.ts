import { Action } from "redux";
import { GameActions } from "./GameActions";

export default interface ActionPayload<T> extends Action<GameActions> {
    payload: T;
}