import { Ball } from "../Definitions/Ball";
import { Block } from "../Definitions/Block";
import { GameState } from "../Definitions/GameState";
import { Paddle } from "../Definitions/Paddle";
import { GameDimensions } from "./GameDimensions";

/**
 * Describes the application state
 */
export interface AppState {

    /**
     * Stores the state of the game blocks
     */
    blocks: Block[];

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
     * The game dimensions.
     */
    gameDimensions: GameDimensions;

    /**
     * Indexer
     */
    [key: string]: any;
}