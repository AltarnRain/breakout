import { Action, combineReducers, createStore, Reducer, ReducersMapObject, Store } from "redux";
import { GamedimensionsReducer } from "./Reducers/GameDimensionsReducer";
import { AppState } from "./State/AppState";

// Use the AppState interface to to define the reducer object so we have 1 on 1 match with the store and state
// As any is required because the signature of a reducer won't match the expected type in the AppState.
const reducers: ReducersMapObject<Reducer<AppState>, Action<any>> = {
    gameSize: GamedimensionsReducer
};

const store = createStore<AppState, Action, AppState, AppState>(
    combineReducers<any>(reducers)
);

export function getStore(): Store<AppState, Action> {
    return store;
}