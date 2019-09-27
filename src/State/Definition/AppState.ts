import { BallState } from "./BallState";
import { BlockState } from "./BlockState";
import { GameState } from "./GameState";
import { PaddleState } from "./PaddleState";
import { SoundState } from "./SoundState";

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
     * The sound state.
     */
    soundState: SoundState;

    /**
     * Indexer
     */
    [key: string]: any;
}