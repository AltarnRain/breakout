import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import {GameActions } from "./State/GameActions";
import { appStore } from "./Store";

// Dispatch a setDimensions action whenever the resize event fires. This will trigger an update of
// the game field and the block and paddle size.

appStore().dispatch({ type: GameActions.initialize, payload: undefined });

ReactDOM.render(<Main />, document.getElementById("root"));
