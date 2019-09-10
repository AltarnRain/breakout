/**
 * Describes the application state
 */
export interface AppState {

    /**
     * Stores the state of the game blocks
     */
    blocks?: Block[];

    /**
     * Stores the state of the paddle
     */
    paddle: Paddle;

    /**
     * Stores the state of the ball.
     */
    ball: Ball;
}

/**
 * Base interface for all game objects.
 */
export interface Shape {
    /**
     * Left position in pixels.
     */
    left: number;

    /**
     * Top position on pixels.
     */
    top: number;

    /**
     * Width in pixels.
     */
    width: number;

    /**
     * Height in pixels
     */
    height: number;

    /**
     * The shape's color
     */
    color: string;
}

/**
 * Describes a block object.
 */
export interface Block extends Shape {

    /**
     * The x coordinate used internally to idenfify this block
     */
    x: number;

    /**
     * The y coordinate used internally to identify this block.
     */
    y: number;
}

export interface Paddle extends Shape {
    /**
     * Typeguard boolean used to check if a passed shape is actually the paddle.
     */
    isPaddle: true;
}

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

/**
 * Describes the ball object.
 */
export interface Ball extends Shape {

    /**
     * The angle in degrees at where the ball is heading.
     */
    angle: number;

    /**
     * The speed at which the ball travels.
     */

    velocity: number;

    /**
     * Stores a reference to the last object the ball hit. Used to prevent a double bounce on the same object.
     */

    lastObject: any;
}