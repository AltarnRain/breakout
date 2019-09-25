import { Color } from "csstype";
import { ScreenObject } from "./ScreenObject";

/**
 * Describes a game object.
 */
export interface GameObject extends ScreenObject {
    color: Color;
}