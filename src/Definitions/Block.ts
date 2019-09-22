import { GameObject } from "./GameObject";

/**
 * Describes a block object.
 */
export interface Block extends GameObject {
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
}