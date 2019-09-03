import { Action } from "redux";
import { alteredDimensions, getDimentions } from "../Lib";
import { GameDimensions } from "../State/AppState";
import { GameActions } from "../State/GameActions";

export function GamedimensionsReducer(state: GameDimensions = {} as GameDimensions, action: Action): GameDimensions {

    if (action.type === GameActions.initialize) {

        const gameDimensions = getDimentions();

        const changed = alteredDimensions(gameDimensions, state);
        if (changed) {
            return gameDimensions;
        } else {
            return state;
        }
    }

    return state;
}