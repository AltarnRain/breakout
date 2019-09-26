export enum GameActions {
    /**
     * An action that instructs the reducers to return an initial objects to play the game.
     */
    reset,
    /**
     * Dispatched when a block is hit.
     */
    hitBlock,
    /**
     * Dispatched when the user moves the mouse causing th paddle to move.
     */
    paddleMove,
    /**
     * Dispatch for a game tick.
     */
    tick,
    /**
     * Dispatchen when the ball bounces of top or bottom of an object.
     */
    ballBounceHorizantally,
    /**
     * Dispatched when the ball bounces of the side of an object.
     */
    ballBounceVertically,
    /**
     * Dispatched when the ball hits the bottom of the play field.
     */
    gameLost,
    /**
     * Dispatched when all the blocks are cleared.
     */
    nextLevel,

    /**
     * Resume the game.
     */
    resume
}