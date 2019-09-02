import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { ballReducer } from "./Reducers/BallReducer";
import { blockReducer } from "./Reducers/BlockReducer";
import { GamedimensionsReducer } from "./Reducers/GameDimensionsReducer";
import { paddleReducer } from "./Reducers/PaddleReducer";
import ActionPayload from "./State/ActionPayLoad";
import { AppState } from "./State/AppState";

const reducers: ReducersMapObject<AppState, ActionPayload<any>> = {
    gameDimensions: GamedimensionsReducer,
    blocks: blockReducer,
    paddle: paddleReducer,
    ball: ballReducer,
};

const allReducers = combineReducers(reducers);

const store = createStore<AppState, ActionPayload<any>, AppState, AppState>(allReducers);

export function appStore(): Store<AppState, ActionPayload<any>> {
    return store;
}

export function appState(): AppState {
    return appStore().getState();
}