import { Action } from "redux";
import { SetGameSize } from "../State/StateConstants";
import { AppState } from "../State/AppState";

export function GamedimensionsReducer(state: AppState["gameSize"], action: Action): AppState["gameSize"] {
    if (!state) {
        return 0;
    }

    if (action.type === SetGameSize) {
        if (window.screen.availHeight > window.screen.availWidth) {
            state = window.screen.availWidth;
        } else {
            state = window.screen.availWidth;
        }
    }

    return state;
}