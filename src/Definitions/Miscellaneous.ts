
/**
 * Miscenalious state. Used to keep track of non-game object state.
 */
export interface Miscellaneous {
    /**
     * The state of the game.
     */
    gameState: "running" | "ended";

    /**
     * The current score.
     */
    score: number;

    /**
     * The level of the game
     */
    level: number;
}