import { Ball } from "../Definitions/Ball";
import { Block } from "../Definitions/Block";
import { Miscellaneous } from "../Definitions/Miscellaneous";
import { Paddle } from "../Definitions/Paddle";

/**
 * Describes the application state
 */
export interface AppState {

    /**
     * Stores the state of the game blocks
     */
    blocks?: Block[];

    /**
     * Stores the state of the paddle
     */
    paddle: Paddle;

    /**
     * Stores the state of the ball.
     */
    ball: Ball;

    /**
     * Miscellaneous
     */
    miscellaneous: Miscellaneous;
}