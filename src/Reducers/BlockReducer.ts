import { NumberOfBlockColumns, NumberOfBlockRows } from "../Constants";
import { Block } from "../Definitions/Block";
import { Blocks } from "../Definitions/Blocks";
import { getGameDimensions } from "../GameDimensions";
import { getBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { GameActions } from "../State/GameActions";

export const blockReducer = (state: Blocks = getNewState(NumberOfBlockRows, NumberOfBlockColumns), action: ActionPayload<Block>): Blocks => {
    switch (action.type) {
        case GameActions.reset:
            return getNewState(NumberOfBlockRows, NumberOfBlockColumns);
        case GameActions.nextLevel:

            const nextLevel = state.level++;

            if (nextLevel <= 5) {

                const nextLevelState = { ...state };
                nextLevelState.level++;

                nextLevelState.remainingBlocks = { ...getBlocks(NumberOfBlockRows + nextLevelState.level, NumberOfBlockColumns + nextLevelState.level) };

                return nextLevelState;
            } else {
                return getNewState(NumberOfBlockRows + 5, NumberOfBlockColumns + 5);
            }

        case GameActions.hitBlock:
            if (action.payload) {
                const hitBlockState = [...state.remainingBlocks];
                const hitBlockIndex = state.remainingBlocks.indexOf(action.payload);

                hitBlockState[hitBlockIndex].hit = true;

                return { ...state, remainingBlocks: hitBlockState };
            }

            return state;

        case GameActions.tick:

            const hitBlocks = state.remainingBlocks.map((b, index) => {
                if (b.hit === true) {
                    return { block: b, index };
                } else {
                    return undefined;
                }
            });

            if (hitBlocks.length > 0) {

                const tickGameDimensions = getGameDimensions();

                const tickBlockState = [...state.remainingBlocks];

                const factor = tickGameDimensions.blockHeight * 0.1;
                const halfFactor = factor / 2;
                hitBlocks.forEach((b) => {
                    if (b) {
                        const block = { ...b.block };

                        block.height -= factor;
                        block.width -= factor;
                        block.left += halfFactor;
                        block.top += halfFactor;

                        if (block.height <= 0 || block.width <= 0) {
                            // Block has reached size '0', time to remove it.
                            tickBlockState.splice(b.index, 1);
                        } else {
                            tickBlockState[b.index] = block;
                        }
                    }
                });

                return { ...state, remainingBlocks: tickBlockState };

            } else {
                return state;
            }

        default:
            return state;
    }
};

const getNewState = (numberOfBlockRows: number, numberOfBlockColumns: number): Blocks => {
    const gameDimensions = getGameDimensions();

    const initialState = getBlocks(numberOfBlockRows, numberOfBlockColumns);

    initialState.forEach((b) => {
        b.width = gameDimensions.blockWidth;
        b.height = gameDimensions.blockHeight;
        b.left = b.x * gameDimensions.blockWidth;
        b.top = b.y * gameDimensions.blockHeight;
    });

    return { remainingBlocks: initialState, level: 1 };
};