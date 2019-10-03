import produce from "immer";
import { MaxBlue, MaxGreen, MaxRed, MinBlue, MinGreen, MinRed } from "../Constants/Constants";
import Block from "../Definitions/Block";
import getGameDimensions from "../GameDimensions";
import { getBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import BlockState from "../State/Definition/BlockState";
import GameActions from "../State/GameActions";

/**
 * The block reducer.
 * @param {BlockState} state. The current block state.
 * @param {ActionPayload} action. An action, payload optional.
 * @returns {BlockState}. A 'new' block state.
 */
const blockReducer = (state: BlockState = getNewState(), action: ActionPayload<Block>): BlockState => {
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
            return produce(state, (draftObject) => {
                if (action.payload && action.payload) {
                    const hitBlockIndex = state.blocks.indexOf(action.payload);
                    draftObject.blocks[hitBlockIndex].hit = true;

                    draftObject.blocks.forEach((block) => {

                        if (block.red > MaxRed || block.red < MinRed) {
                            block.redAdd *= -1;
                        }

                        if (block.green > MaxGreen || block.green < MinGreen) {
                            block.greenAdd *= -1;
                        }

                        if (block.blue > MaxBlue || block.blue < MinBlue) {
                            block.blueAdd *= -1;
                        }

                        block.red += block.redAdd;
                        block.green += block.greenAdd;
                        block.blue += block.blueAdd;
                    });
                }
            });

        case GameActions.tick:

            return produce(state, (draftObject) => {
                const hitBlocks = draftObject.blocks.filter((b) => b.hit === true);

                if (hitBlocks.length > 0) {

                    // Reduce a hit block by 10% of its original height
                    const widthReductionFactor = calculateBlockWidth(draftObject.columns) * 0.1;
                    const heightReductionFactor = calculateBlockHeight(draftObject.rows) * 0.1;

                    // Redcue size for a hit block
                    hitBlocks.forEach((block) => {
                        block.width -= widthReductionFactor;
                        block.height -= heightReductionFactor;

                        // Add half of the mount of pixels to the top and left to make it appear as the block shrinks to its center.
                        block.top += heightReductionFactor / 2;
                        block.left += widthReductionFactor / 2;

                        if (block.height <= 0 || block.width <= 0) {
                            // Block has reached size '0', time to remove it.
                            draftObject.blocks.splice(draftObject.blocks.indexOf(block), 1);
                        }
                    });
                }
            });
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

export default blockReducer;