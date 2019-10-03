import Coordinates from "./Coordinates";

/**
 * An object definition for a line.
 */
export default interface Line {

    /**
     * The first point of the line.
     */
    a: Coordinates;

    /**
     * The second point of the line.
     */
    b: Coordinates;
}