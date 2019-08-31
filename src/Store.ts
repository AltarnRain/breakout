import { Action, combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { GamedimensionsReducer } from "./Reducers/GameDimensionsReducer";
import { AppState } from "./State/AppState";

const reducers: ReducersMapObject<AppState, Action<any>> = {
    gameSize: GamedimensionsReducer
};

const allReducers = combineReducers(reducers);

const store = createStore<AppState, Action, AppState, AppState>(allReducers);

export function getStore(): Store<AppState, Action> {
    return store;
}