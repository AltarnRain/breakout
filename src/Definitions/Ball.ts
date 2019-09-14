import { GameObject } from "./GameObject";

/**
 * Describes the ball object.
 */
export interface Ball extends GameObject {
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

    previousState?: Ball;
}