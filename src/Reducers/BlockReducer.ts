import { Block } from "../Definitions/Block";
import { getGameDimensions } from "../GameDimensions";
import { getBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { GameActions } from "../State/GameActions";
import { BlockState } from "../Definitions/BlockState";

/**
 * The block reducer.
 * @param {BlockState} state. The current block state.
 * @param {ActionPayload} action. An action, payload optional.
 * @returns {BlockState}. A 'new' block state.
 */
export const blockReducer = (state: BlockState = getNewState(), action: ActionPayload<Block>): BlockState => {
    switch (action.type) {
        case GameActions.reset:
            return getNewState();
        case GameActions.nextLevel:

            if (state.rows <= 10) {
                // Increase the number of blocks until we hit 10 rows.
                const nextLevelState = getNewState(state.rows + 1, state.columns + 1);
                return nextLevelState;
            } else {
                return getNewState(state.rows, state.columns);
            }

        case GameActions.hitBlock:
            if (action.payload) {
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

/**
 * Gets a new state for the blocks.
 * @param {number} rows. The number of rows the new state should have.
 * @param {number} columns. The number of columns the new state should have. Also used to calculate the block size.
 * @returns {BlockState}. A new block state.
 */
const getNewState = (rows: number = 5, columns: number = 12): BlockState => {
    const blocks = getBlocks(rows, columns);

    const width = calculateBlockWidth(columns);
    const height = calculateBlockHeight(columns);

    blocks.forEach((b) => {
        b.width = width;
        b.height = height;
        b.left = b.x * width;
        b.top = b.y * height;
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
 * @returns {number}. The height of a block based on the amount of colums.
 */
function calculateBlockHeight(columns: number): number {
    // The simples way to draw rectangles is to half the width.
    return calculateBlockWidth(columns) / 2;
}

/**
 * Calculats the width of a block using the screensize.
 * @param {number} columns. Amount of colums.
 * @returns {number}. The block width based on the amount of colums.
 */
function calculateBlockWidth(columns: number): number {
    const size = getGameDimensions().size;
    return size / columns;
}
