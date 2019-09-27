/**
 * GameState state. Used to keep track of non-game object state.
 */
export interface GameState {
    /**
     * The state of the game.
     */
    gameMode: "running" | "ended" | "paused";

    /**
     * The current score.
     */
    score: number;

    /**
     * The level of the game
     */
    level: number;
}