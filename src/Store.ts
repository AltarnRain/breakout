import { Action, combineReducers, createStore, Store } from "redux";
import { AppState } from "./AppStore";
import HelloWorldReducer from "./Reducers/HelloWorldReducer";

const store = createStore<AppState, Action, AppState, AppState>(
    combineReducers<any>({
        message: HelloWorldReducer
    })
);

export function getStore(): Store<AppState, Action> {
    return store;
}