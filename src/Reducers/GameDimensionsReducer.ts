import { Action } from "redux";
import { AppState } from "../State/AppState";
import { SetGameSize } from "../State/StateConstants";

export function GamedimensionsReducer(state: AppState["gameSize"] = 0, action: Action): AppState["gameSize"] {
    if (action.type === SetGameSize) {
        if (window.screen.availHeight > window.screen.availWidth) {
            state = window.screen.availWidth;
        } else {
            state = window.screen.availWidth;
        }
    }

    return state;
}