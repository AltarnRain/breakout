import { Color } from "csstype";
import { ScreenObject } from "./ScreenObject";

export interface GameObject extends ScreenObject {
    color: Color;
}