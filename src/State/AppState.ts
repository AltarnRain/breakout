import { Ball } from "./Ball";
import { Block } from "./Block";
import { Paddle } from "./Paddle";

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
}