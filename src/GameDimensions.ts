/**
 * Provides game dimensions.
 */

import { WindowResizeConstant } from "./Constants/Constants";
import { GameDimensions } from "./State/GameDimensions";

let gameDimensions: GameDimensions;

export const getGameDimensions = (): GameDimensions => {
    if (!gameDimensions) {
        let size = 0;

        if (window.innerHeight > window.innerWidth) {
            size = window.innerWidth * WindowResizeConstant;
        } else {
            size = window.innerHeight * WindowResizeConstant;
        }

        const left = (window.innerWidth / 2) - (size / 2);
        const top = (window.innerHeight / 2) - (size / 2);

        gameDimensions = { left, top, size };
    }

    return gameDimensions;
};