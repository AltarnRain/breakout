
import { PaddleHeightFactor, PaddlePositionFactor, PaddleWithFactor } from "../Constants";
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

            if (nextLevelPaddle.width < getPaddleWidth() / 2) {
                // Paddle doesn't get smaller than half its size.
                return state;
            } else {
                return nextLevelPaddle;
            }

        default:
            return state;
    }
};

const getNewState = (): Paddle => {
    return {
        color: "white",
        width: getPaddleWidth(),
        height: getPaddleHeight(),
        top: getPaddleTop(),
        left: getPaddleCenterLeft(),
        isPaddle: true
    };
};

const getPaddleCenterLeft = (): number => {
    return (gameDimensions.size / 2) - (getPaddleWidth() / 2);
};

const getPaddleTop = (): number => {
    return gameDimensions.size * PaddlePositionFactor;
};

const getPaddleWidth = (): number => {
    return gameDimensions.size / PaddleHeightFactor;
};

const getPaddleHeight = (): number => {
    return gameDimensions.size / PaddleWithFactor;
};
