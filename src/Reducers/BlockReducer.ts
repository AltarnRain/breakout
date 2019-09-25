import { Block } from "../Definitions/Block";
import { getGameDimensions } from "../GameDimensions";
import { getBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { GameActions } from "../State/GameActions";
import { BlockState } from "./BlockState";

export const blockReducer = (state: BlockState = getNewState(5, 12), action: ActionPayload<Block>): BlockState => {
    switch (action.type) {
        case GameActions.reset:
            return getNewState(12, 5);
        case GameActions.nextLevel:

            if (state.rows <= 10) {
                // Increase the number of blocks until we hit 10 rows.
                const nextLevelState = getNewState(state.rows + 1, state.columns + 1);
                return nextLevelState;
            } else {
                return getNewState(state.rows, state.columns);
            }

        case GameActions.hitBlock:
            if (action.payload && action.payload) {
                const hitBlockState = [...state.blocks];
                const hitBlockIndex = hitBlockState.indexOf(action.payload);

                hitBlockState[hitBlockIndex].hit = true;

                return { ...state, blocks: hitBlockState };
            }

            return state;

        case GameActions.tick:

            const hitBlocks = state.blocks.filter((b) => b.hit === true);

            if (hitBlocks.length > 0) {

                // Reduce a hit block by 10% of its original height
                const widthReductionFactor = calculateBlockWidth(state.columns) * 0.1;
                const heightReductionFactor = calculateBlockHeight(state.rows) * 0.1;

                const tickBlocks = [...state.blocks];

                // Redcue size for a hit block
                hitBlocks.forEach((block) => {

                    block.width -= widthReductionFactor;
                    block.height -= heightReductionFactor;

                    // Add half of the mount of pixels to the top and left to make it appear as the block shrinks to its center.
                    block.top += heightReductionFactor / 2;
                    block.left += widthReductionFactor / 2;

                    const hitBlockIndex = tickBlocks.indexOf(block);

                    if (block.height <= 0 || block.width <= 0) {
                        // Block has reached size '0', time to remove it.
                        tickBlocks.splice(hitBlockIndex, 1);
                    }

                });

                return { ...state, blocks: tickBlocks };
            } else {
                return state;
            }

        default:
            return state;
    }
};

const getNewState = (rows: number, columns: number): BlockState => {
    const blocks = getBlocks(rows, columns);

    const width = calculateBlockWidth(columns);
    const height = calculateBlockHeight(rows);

    blocks.forEach((b) => {
        b.width = width;
        b.height = height;
        b.left = b.x * height;
        b.top = b.y * width;
    });

    return {
        blocks,
        columns,
        rows,
        height,
        width
    };
};

/**
 * Calculates the height of a block using the screen size and the number of rows.
 * @param {number} rows. Amount of rows.
 */
function calculateBlockHeight(rows: number): number {
    // Rows * 2 because we want rectangles, not squares.
    return getGameDimensions().size / (rows * 2);
}

/**
 * Calculats the width of a block using the screensize.
 * @param {number} columns. Amount of colums.
 */
function calculateBlockWidth(columns: number): number {
    return getGameDimensions().size / columns;
}
