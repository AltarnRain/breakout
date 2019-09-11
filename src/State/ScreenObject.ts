/**
 * Base interface for all game objects.
 */
export interface ScreenObject {
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
}