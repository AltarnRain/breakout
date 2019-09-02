import { getDimentions } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { Shape } from "../State/AppState";
import { GameActions } from "../State/GameActions";

export function paddleReducer(state: Shape = {} as Shape, action: ActionPayload<number>): Shape {
    const gameDimensions = getDimentions();

    switch (action.type) {
        case GameActions.setDimensions:

            const height = gameDimensions.size / 40;
            const width = gameDimensions.size / 10;
            const left = (gameDimensions.size / 2) - (width / 2);
            const top = gameDimensions.size * 0.9;

            return {
                color: "white",
                width,
                top,
                left,
                height,
            };

        case GameActions.paddleMove:

            let x;

            // Prevent the paddle from being drawn outside the playfield.
            if (typeof (action.payload) !== "undefined") {
                if (action.payload <= 0) {
                    x = 0;
                } else if (action.payload >= (gameDimensions.size - state.width)) {
                    x = gameDimensions.size - state.width;
                } else {
                    x = action.payload;
                }

                if (state.left === x) {
                    return state;
                } else {
                    const newState = { ...state, left: x };
                    return newState;
                }
            } else {
                return state;
            }

        default:
            return state;
    }
}