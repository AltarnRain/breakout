import produce from "immer";
import { Action } from "redux";
import GameState from "../State/Definition/GameState";
import GameActions from "../State/GameActions";

/**
 * game state reducer. Keeps track of score, losing a game, etc.
 * @param {GameState} state. The current game state
 * @param {Action}. A reduc action. No payload.
 * @returns {GameState}. The next game state.
 */
const gameStateReducer = (state: GameState = getNewState(), action: Action<GameActions>): GameState => {
    switch (action.type) {
        case GameActions.reset:
            return getNewState();
        case GameActions.gameLost:
            return produce(state, (draftObject) => {
                draftObject.gameMode = "ended";
            });
        case GameActions.nextLevel:
            return produce(state, (draftObject) => {
                draftObject.level += 1;
            });
        case GameActions.hitBlock:
            return produce(state, (draftObject) => {
                draftObject.score += 1;
            });
        case GameActions.resume:
            return produce(state, (draftObject) => {
                draftObject.gameMode = "running";
            });
        case GameActions.pause:
            return produce(state, (draftObject) => {
                draftObject.gameMode = "paused";
            });
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

export default gameStateReducer;