
/**
 * Miscenalious state. Used to keep track of non-game object state.
 */
export interface Miscellaneous {
    /**
     * The state of the game.
     */
    gameState: "running" | "paused" | "ended";

    /**
     * The current score.
     */
    score: number;

    /**
     * The level of the game
     */
    level: number;
}