import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Main";
import {GameActions } from "./State/GameActions";
import { appStore } from "./Store";

// Dispatch a setDimensions action whenever the resize event fires. This will trigger an update of
// the game field and the block and paddle size.
window.addEventListener("resize", () => appStore().dispatch({type: GameActions.setDimensions, payload: undefined}));

appStore().dispatch({ type: GameActions.setDimensions, payload: undefined });

ReactDOM.render(<Main />, document.getElementById("root"));
