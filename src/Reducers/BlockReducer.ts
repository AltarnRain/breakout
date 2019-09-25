import { NumberOfBlockColumns, NumberOfBlockRows } from "../Constants";
import { Block } from "../Definitions/Block";
import { BlockReducerActionPayload } from "../Definitions/BlockReducerActionPayload";
import { getGameDimensions } from "../GameDimensions";
import { getBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { GameActions } from "../State/GameActions";

export const blockReducer = (state: Block[] = getNewState(NumberOfBlockRows, NumberOfBlockColumns), action: ActionPayload<BlockReducerActionPayload>): Block[] => {
    switch (action.type) {
        case GameActions.reset:
            return getNewState(NumberOfBlockRows, NumberOfBlockColumns);
        case GameActions.nextLevel:

            if (action.payload && typeof action.payload.level === "number") {
                if (action.payload.level < 5) {
                    const nextLevelState = getNewState(NumberOfBlockRows + action.payload.level, NumberOfBlockColumns + action.payload.level);
                    return nextLevelState;
                } else {
                    return getNewState(NumberOfBlockRows + 5, NumberOfBlockColumns + 5);
                }
            }

        case GameActions.hitBlock:
            if (action.payload && action.payload.hitBlock) {
                const hitBlockState = [...state];
                const hitBlockIndex = state.indexOf(action.payload.hitBlock);

                hitBlockState[hitBlockIndex].hit = true;

                return hitBlockState;
            }

            return state;

        case GameActions.tick:

            const hitBlocks = state.filter((b) => b.hit === true);

            if (hitBlocks.length > 0) {

                const tickGameDimensions = getGameDimensions();

                // Reduce a hit block by 10% of its original height
                const heightReductionFactor = tickGameDimensions.blockHeight * 0.1;
                const widthReductionFactor = tickGameDimensions.blockWidth * 0.1;

                const tickBlockState = [...state];

                // Redcue size for a hit block
                hitBlocks.forEach((block) => {

                    block.width -= widthReductionFactor;
                    block.height -= heightReductionFactor;

                    // Add half of the mount of pixels to the top and left to make it appear as the block shrinks to its center.
                    block.top += heightReductionFactor / 2;
                    block.left += widthReductionFactor / 2;

                    const hitBlockIndex = state.indexOf(block);

                    if (block.height <= 0 || block.width <= 0) {
                        // Block has reached size '0', time to remove it.

                        tickBlockState.splice(hitBlockIndex, 1);
                    }

                    return tickBlockState;
                });
            } else {
                return state;
            }

        default:
            return state;
    }
};

const getNewState = (numberOfBlockRows: number, numberOfBlockColumns: number): Block[] => {
    const gameDimensions = getGameDimensions();

    const blocks = getBlocks(numberOfBlockRows, numberOfBlockColumns);

    blocks.forEach((b) => {
        b.width = gameDimensions.blockWidth;
        b.height = gameDimensions.blockHeight;
        b.left = b.x * gameDimensions.blockWidth;
        b.top = b.y * gameDimensions.blockHeight;
    });

    return blocks;
};