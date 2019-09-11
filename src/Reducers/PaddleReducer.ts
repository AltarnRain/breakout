
import { PaddleHeightFactor, PaddlePositionFactor, PaddleWithFactor } from "../Constants";
import { getGameDimensions } from "../GameDimensions";
import ActionPayload from "../State/ActionPayLoad";
import { GameActions } from "../State/GameActions";
import { Paddle } from "../State/Paddle";

const gameDimensions = getGameDimensions();

/**
 * Handles paddle actions
 * @param {Paddle} state. The paddle state.
 * @param {ActionPayload<number> }action. An action to be performed on the paddle. Number is the 'left' coordinate of the paddle.
 */
export function paddleReducer(state: Paddle = { isPaddle: true } as Paddle, action: ActionPayload<number>): Paddle {
    switch (action.type) {
        case GameActions.initialize:

            const height = gameDimensions.size / PaddleWithFactor;
            const width = gameDimensions.size / PaddleHeightFactor;
            const left = (gameDimensions.size / 2) - (width / 2);
            const top = gameDimensions.size * PaddlePositionFactor;

            return {
                color: "white",
                width,
                top,
                left,
                height,
                isPaddle: true
            };

        case GameActions.paddleMove:

            // Prevent the paddle from being drawn outside the playfield.
            if (typeof (action.payload) !== "undefined") {
                let x;
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