import { Color } from "csstype";
import ScreenObject from "./ScreenObject";

/**
 * Describes a game object.
 */
export default interface GameObject extends ScreenObject {
    /**
     * The color of the game object.
     */
    color: Color;
}