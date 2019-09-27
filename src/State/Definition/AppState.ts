import { BallState } from "./BallState";
import { BlockState } from "./BlockState";
import { GameState } from "./GameState";
import { PaddleState } from "./PaddleState";

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
    paddle: PaddleState;

    /**
     * Stores the state of the ball.
     */
    ball: BallState;

    /**
     * Miscellaneous
     */
    gameState: GameState;

    /**
     * Indexer
     */
    [key: string]: any;
}