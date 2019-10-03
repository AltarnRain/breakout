/**
 * Represents an object that contains the directions of another object.
 */
export default interface Direction {
    /**
     * True when an object is moving up.
     */
    up: boolean;

    /**
     * True when an object is moving down.
     */

    down: boolean;

    /**
     * True when an object is moving left.
     */
    left: boolean;

    /**
     * True when an object is movign right.
     */
    right: boolean;
}