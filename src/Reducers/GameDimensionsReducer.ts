import { Action } from "redux";
import { getGameDimensions } from "../GameDimensions";
import { GameActions } from "../State/GameActions";
import { GameDimensions } from "../State/GameDimensions";

export const gameDimensionReducer = (state: GameDimensions = getGameDimensions(), type: Action): GameDimensions => {

    if (GameActions.resize) {
        return getGameDimensions();
    } else {
        return state;
    }
};