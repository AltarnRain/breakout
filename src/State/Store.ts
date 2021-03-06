import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import ballReducer from "../Reducers/BallReducer";
import blockReducer from "../Reducers/BlockReducer";
import gameStateReducer from "../Reducers/GameStateReducer";
import paddleReducer from "../Reducers/PaddleReducer";
import soundReducer from "../Reducers/SoundReducer";
import ActionPayload from "./ActionPayLoad";
import AppState from "./Definition/AppState";

/**
 * All reducer that build the application state.
 */
const reducers: ReducersMapObject<AppState, ActionPayload<any>> = {
    blockState: blockReducer,
    paddle: paddleReducer,
    ball: ballReducer,
    gameState: gameStateReducer,
    soundState: soundReducer,
};

const allReducers = combineReducers(reducers);

const store = createStore<AppState, ActionPayload<any>, AppState, AppState>(allReducers);

/**
 * Returns the store
 * @returns {Store}. The redux store.
 */
export const appStore = (): Store<AppState, ActionPayload<any>> => {
    return store;
};

/**
 * Returns the State
 * @returns {AppState}. The application state.
 */
export const appState = (): AppState => {
    return appStore().getState();
};