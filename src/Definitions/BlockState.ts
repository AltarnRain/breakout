import { Block } from "./Block";

/**
 * The state of the blocks
 */
export interface BlockState {
    /**
     * An array of block objects currently on screen.
     */
    blocks: Block[];

    /**
     * The amount of block rows currently displayed.
     */
    rows: number;

    /**
     * The amount of block columns currently displayed.
     */
    columns: number;

    /**
     * The width of a block before it is hit.
     */
    width: number;

    /**
     * The height of a block before it is hit.
     */
    height: number;
}