import GameObject from "../../Definitions/GameObject";

/**
 * Describes the ball object.
 */
export default interface BallState extends GameObject {

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