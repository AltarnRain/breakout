import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import {GameActions } from "./State/GameActions";
import { appStore } from "./Store";

appStore().dispatch({ type: GameActions.initialize });

ReactDOM.render(<Main />, document.getElementById("root"));
