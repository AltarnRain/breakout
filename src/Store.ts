import { combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { blockReducer } from "./Reducers/BlockReducer";
import { GamedimensionsReducer } from "./Reducers/GameDimensionsReducer";
import ActionPayload from "./State/ActionPayLoad";
import { AppState } from "./State/AppState";

const reducers: ReducersMapObject<AppState, ActionPayload<any>> = {
    gameDimensions: GamedimensionsReducer,
    blocks: blockReducer,
};

const allReducers = combineReducers(reducers);

const store = createStore<AppState, ActionPayload<any>, AppState, AppState>(allReducers);

export function appStore(): Store<AppState, ActionPayload<any>> {
    return store;
}

export function appState(): AppState {
    return appStore().getState();
}