import GameObject from "./GameObject";

/**
 * Describes a block object.
 */
export default interface Block extends GameObject {
    /**
     * The x coordinate used internally to idenfify this block
     */
    x: number;

    /**
     * The y coordinate used internally to identify this block.
     */
    y: number;

    /**
     * True if the block is hit.
     */
    hit: boolean;

    /**
     * Red color.
     */
    red: number;

    /**
     * Blue color
     */
    blue: number;

    /**
     * Green color
     */
    green: number;

    /**
     * The value to be added to red
     */
    redAdd: number;

    /**
     * The value to be added to blue.
     */
    blueAdd: number;

    /**
     * The value to be added to green.
     */
    greenAdd: number;
}