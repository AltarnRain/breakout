import { Ball } from "../Definitions/Ball";
import { Blocks } from "../Definitions/Blocks";
import { GameState } from "../Definitions/GameState";
import { Paddle } from "../Definitions/Paddle";

/**
 * Describes the application state
 */
export interface AppState {

    /**
     * Stores the state of the game blocks
     */
    blocks: Blocks;

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