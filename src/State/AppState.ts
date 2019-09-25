import { Ball } from "../Definitions/Ball";
import { BlockState } from "../Definitions/BlockState";
import { GameState } from "../Definitions/GameState";
import { Paddle } from "../Definitions/Paddle";

/**
 * Describes the application state
 */
export interface AppState {

    /**
     * Stores the state of the game blocks
     */
    blockState: BlockState;

    /**
     * Stores the state of the paddle
     */
    paddle: Paddle;

    /**
     * Stores the state of the ball.
     */
    ball: Ball;

    /**
     * Indexer
     */
    [key: string]: any;
}