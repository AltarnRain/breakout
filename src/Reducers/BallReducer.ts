import { BallResizeFactor, BallSpeedIncreasePerBlock, BallSpeedIncreasePerLevel, InitialBallVelocity } from "../Constants/Constants";
import { ScreenObject } from "../Definitions/ScreenObject";
import { getGameDimensions } from "../GameDimensions";
import { Guard } from "../Guard";
import { angleRandomizer, changeAngle, getNextX, getNextY } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { BallState } from "../State/Definition/BallState";
import { GameActions } from "../State/GameActions";

const gameDimensions = getGameDimensions();

/**
 * Handles ball actions.
 * @param {ball} state. The current ball state.
 * @param {ActionPayLoad}. An action, payload optional.
 * @returns {BallState}. The ball state.
 */
export const ballReducer = (state: BallState = getNewState(), action: ActionPayload<ScreenObject>): BallState => {

    switch (action.type) {
        case GameActions.reset: {
            return getNewState();
        }

        case GameActions.tick: {
            const x = getNextX(state.angle, state.velocity, state.left);
            const y = getNextY(state.angle, state.velocity, state.top);

            return { ...state, left: x, top: y };
        }

        case GameActions.ballBounceHorizantally:
        case GameActions.ballBounceVertically: {
            if (action.payload && action.payload !== state.lastObject) {
                let angle = state.angle;
                let angleChange = 1;

                if (action.type === GameActions.ballBounceHorizantally) {

                    // If the baddle is hit we want the ball's angle to increase if it hit
                    // the edges.
                    if (Guard.isPaddle(action.payload)) {
                        // calculate where the ball hit relative to the shape from the left size.
                        angleChange = changeAngle(state, action.payload);
                    }

                    // When the ball top or bottom makes contact, multiply the current angle by -1 for it to bounce.
                    angle = (angle + angleChange) * -1;
                } else {
                    if (action.payload && action.payload !== state.lastObject) {
                        // If the ball hits a side, the new angle is 180 - current angle.
                        angle = 180 - angle;
                    }
                }

                return { ...state, angle, lastObject: action.payload };
            }

            return state;
        }

        case GameActions.hitBlock:
            // Increase the ball speed for each hit block
            return { ...state, velocity: state.velocity * BallSpeedIncreasePerBlock };
        case GameActions.nextLevel:
            // Increase ball speed for each level.
            return { ...state, velocity: state.velocity + BallSpeedIncreasePerLevel };
        default:
            return state;
    }
};

/**
 * Gets the ball size that fits the screen size.
 * @returns {number}. The size of the ball.
 */
const getBallSize = (): number => {
    return gameDimensions.size * BallResizeFactor;
};

/**
 * Calculate the ball position in the center of the game field.
 * @returns {number}. The ball's X or Y coordinate.
 */
const getBallPositionX = (): number => {
    return gameDimensions.size / 2 - gameDimensions.size * BallResizeFactor / 2;
};

/**
 * Calculate the ball position in the center of the game field.
 * @returns {number}. The ball's X or Y coordinate.
 */
const getBallPositionY = (): number => {
    return gameDimensions.size / 1.5 - gameDimensions.size * BallResizeFactor / 2;
};

/**
 * Used to obtain a new state for the ball.
 * @returns {BallState}. A new ball state.
 */
const getNewState = (): BallState => {
    const angle = 90 + angleRandomizer();
    return {
        angle,
        color: "radial-gradient(yellow, orange, brown)",
        height: getBallSize(),
        width: getBallSize(),
        left: getBallPositionX(),
        top: getBallPositionY(),
        velocity: InitialBallVelocity,
        lastObject: {},
    };
};
