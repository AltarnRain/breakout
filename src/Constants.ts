
/**
 * A constants used to convert the angle from degree's to radians.
 */
export const DegreeToRadian = Math.PI / 180;

/**
 * A constants that contains the time in milli second for a frame.
 */
export const GameTick = 1000 / 60;

/**
 * Constants for the initial ball velocity.
 */
export const InitialBallVelocity = 6;

/**
 * Constants used in a calculation to randomize the ball's initial angle.
 */
export const BallAngleStartRandomFactor = 10;

/**
 * Constants used in calculation the width and height of the ball relative to the game field diminsions.
 */
export const BallResizeFactor = 0.02;

/**
 * A Constants used ina calculation to increase or decrease the angle of the ball depending on where it hits the paddle.
 */
export const BounceAngleIncreaseConstant = 40;

/**
 * The number of blocks from top to bottom
 */
export const NumberOfBlockRows = 5;

/**
 * The number of blocks from left to right.
 */
export const NumberOfBlockColumns = 12;

/**
 * Constant to used to calculate the size of the playing field.
 */
export const WindowResizeConstant = 0.9;

/**
 * Used to calculate the paddle with relative to the game field width.
 */
export const PaddleWithFactor = 40;

/**
 * Used to calculate the height of the paddle relative to the game field height.
 */
export const PaddleHeightFactor = 10;

/**
 * Used to calculate the paddle's top coordinate relative to the game field height.
 */
export const PaddlePositionFactor = 0.9;