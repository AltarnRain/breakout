import { Ball } from "../Definitions/Ball";
import { GameState } from "../Definitions/GameState";
import { Paddle } from "../Definitions/Paddle";
import { BlockState } from "../Reducers/BlockState";

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
     * Miscellaneous
     */
    gameState: GameState;

    /**
     * Indexer
     */
    [key: string]: any;
}