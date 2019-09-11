/**
 * Provides game dimensions.
 */

import { NumberOfBlockColumns, WindowResizeConstant } from "./Constants";
import { GameDimensions } from "./State/GameDimensions";

let gameDimensions: GameDimensions;

export function getGameDimensions(): GameDimensions {
    if (!gameDimensions) {
        let size = 0;

        if (window.innerHeight > window.innerWidth) {
            size = window.innerWidth * WindowResizeConstant;
        } else {
            size = window.innerHeight * WindowResizeConstant;
        }

        const left = (window.innerWidth / 2) - (size / 2);
        const top = (window.innerHeight / 2) - (size / 2);
        const blockHeight = size / (NumberOfBlockColumns * 2);
        const blockWidth = size / NumberOfBlockColumns;

        gameDimensions = { left, top, size, blockHeight, blockWidth, };
    }

    return gameDimensions;
}