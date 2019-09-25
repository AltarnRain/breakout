
import { PaddleColor, PaddleHeightFactor, PaddlePositionFactor, PaddleWithFactor } from "../Constants";
import { Paddle } from "../Definitions/Paddle";
import { getGameDimensions } from "../GameDimensions";
import ActionPayload from "../State/ActionPayLoad";
import { GameActions } from "../State/GameActions";

const gameDimensions = getGameDimensions();

/**
 * Handles paddle actions
 * @param {Paddle} state. The paddle state.
 * @param {ActionPayload<number> }action. An action to be performed on the paddle. Number is the 'left' coordinate of the paddle.
 */
export const paddleReducer = (state: Paddle = getNewState(), action: ActionPayload<number>): Paddle => {
    switch (action.type) {
        case GameActions.reset:

            return getNewState();

        case GameActions.paddleMove:

            // Prevent the paddle from being drawn outside the playfield.
            if (typeof (action.payload) !== "undefined") {

                let x;

                if (action.payload - state.width / 2 <= 0) {
                    x = 0;
                } else if (action.payload - state.width / 2 >= (gameDimensions.size - state.width)) {
                    x = gameDimensions.size - state.width;
                } else {
                    x = action.payload - (state.width / 2);
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

        case GameActions.nextLevel:
            const nextLevelPaddle = { ...state };

            // Redude the paddle size each level by 5%
            nextLevelPaddle.width *= 0.95;

            if (nextLevelPaddle.width < gameDimensions.size / PaddleHeightFactor / 2) {
                // Paddle doesn't get smaller than half its size.
                return state;
            } else {
                return nextLevelPaddle;
            }

        default:
            return state;
    }
};

/**
 * Generates a new state for the paddle
 * @returns {Paddle}. A new state for the paddle
 */
const getNewState = (): Paddle => {
    return {
        color: PaddleColor,
        width: gameDimensions.size / PaddleHeightFactor,
        height: gameDimensions.size / PaddleWithFactor,
        top: gameDimensions.size * PaddlePositionFactor,
        left: (gameDimensions.size / 2) - (gameDimensions.size / PaddleHeightFactor / 2),
        isPaddle: true
    };
};