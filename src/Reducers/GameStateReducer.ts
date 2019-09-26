import { Action } from "redux";
import { GameState } from "../Definitions/GameState";
import { GameActions } from "../State/GameActions";

/**
 * game state reducer. Keeps track of score, losing a game, etc.
 * @param {GameState} state. The current game state
 * @param {Action}. A reduc action. No payload.
 * @returns {GameState}. The next game state.
 */
export const gameStateReducer = (state: GameState = getNewState(), action: Action<GameActions>): GameState => {
    switch (action.type) {
        case GameActions.reset:
            return getNewState();
        case GameActions.gameLost:
            return { ...state, gameMode: "ended" };
        case GameActions.nextLevel:
            return { ...state, level: state.level + 1 };
        case GameActions.hitBlock:
            return { ...state, score: state.score + 1 };
        case GameActions.resume:
            return { ...state, gameMode: "running" };
        case GameActions.pause:
            return { ...state, gameMode: "paused" };
        default:
            return state;
    }
};

/**
 * Creates a new GameState state
 * @returns {GameState}. A new game state.
 */
const getNewState = (): GameState => {
    return { gameMode: "paused", level: 1, score: 0 };
};
