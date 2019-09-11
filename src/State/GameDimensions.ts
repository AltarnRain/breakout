/**
 * Used to store the dimensions of the game.
 */
export interface GameDimensions {
    /**
     * The number of pixels from the screen's left where the game is positioned.
     */
    left: number;
    /**
     * The number of pixels from the screen's top where the game is positioned.
     */
    top: number;
    /**
     * The game field is a square. Size stores the height and width of the play field.
     */
    size: number;
    /**
     * Calculated height of a block based on the game field dimensions.
     */
    blockHeight: number;
    /**
     * Calculated width of a block based on the game field dimensions.
     */
    blockWidth: number;
}