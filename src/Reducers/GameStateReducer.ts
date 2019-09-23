import { Action } from "redux";
import { GameState } from "../Definitions/GameState";
import { GameActions } from "../State/GameActions";

/**
 * Miscellaneous reducer.
 */
export const gameStateReducer = (state: GameState = getNewState(), action: Action<GameActions>): GameState  => {
    switch (action.type) {
        case GameActions.reset:
            return getNewState();
        case GameActions.gameLost:
            return { ...state, gameMode: "ended" };
        case GameActions.nextLevel:
            return { ...state, level: state.level + 1 };
        case GameActions.hitBlock:
            return { ...state, score: state.score + 1 };
        default:
            return state;
    }
};

const getNewState = (): GameState => {
    return { gameMode: "running", level: 1, score: 0 };
};
