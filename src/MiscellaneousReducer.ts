import { Action } from "redux";
import { Miscellaneous } from "./Definitions/Miscellaneous";
import { GameActions } from "./State/GameActions";

/**
 * Miscellaneous reducer.
 */
export function miscellaneousReducer(state: Miscellaneous = {} as Miscellaneous, action: Action<GameActions>): Miscellaneous {
    switch (action.type) {
        case GameActions.initialize:
            return { gameState: "running", level: 1, score: 0 };
        case GameActions.pressSpace:
            if (state.gameState !== "ended") {
                if (state.gameState === "running") {
                    return { ...state, gameState: "paused" };
                } else {
                    return { ...state, gameState: "running" };
                }
            }

            break;

        case GameActions.nextLevel:
            return { ...state, level: state.level + 1 };
        case GameActions.hitBlock:
            return { ...state, score: state.score + 1 };
        default:
            return state;
    }

    return state;
}