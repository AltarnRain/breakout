import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { gameStateReducer } from "./Reducers/GameStateReducer";
import { ballReducer } from "./Reducers/BallReducer";
import { blockReducer } from "./Reducers/BlockReducer";
import { paddleReducer } from "./Reducers/PaddleReducer";
import ActionPayload from "./State/ActionPayLoad";
import { AppState } from "./State/AppState";

const reducers: ReducersMapObject<AppState, ActionPayload<any>> = {
    blocks: blockReducer,
    paddle: paddleReducer,
    ball: ballReducer,
    gameState: gameStateReducer
};

const allReducers = combineReducers(reducers);

const store = createStore<AppState, ActionPayload<any>, AppState, AppState>(allReducers);

/**
 * Returns the store
 * @returns {Store}. The redux store.
 */
export function appStore(): Store<AppState, ActionPayload<any>> {
    return store;
}

/**
 * Returns the State
 * @returns {AppState}. The application state.
 */
export function appState(): AppState {
    return appStore().getState();
}