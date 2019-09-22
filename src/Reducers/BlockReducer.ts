import { Block } from "../Definitions/Block";
import { getGameDimensions } from "../GameDimensions";
import { getInitialBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { GameActions } from "../State/GameActions";

const gameDimensions = getGameDimensions();
export function blockReducer(state: Block[] = [], action: ActionPayload<Block>): Block[] {
    switch (action.type) {
        case GameActions.initialize:
        case GameActions.nextLevel:
            const initialState = getInitialBlocks();

            initialState.forEach((b) => {
                b.height = gameDimensions.blockHeight;
                b.width = gameDimensions.blockWidth;
                b.left = b.x * gameDimensions.blockWidth;
                b.top = b.y * gameDimensions.blockHeight;
            });

            return initialState;

        case GameActions.hitBlock:
            if (action.payload) {
                const hitBlockState = [...state];
                const hitBlockIndex = state.indexOf(action.payload);

                hitBlockState[hitBlockIndex].hit = true;

                return hitBlockState;
            }

            return state;

        case GameActions.tick:

            const hitBlocks = state.map((b, index) => {
                if (b.hit === true) {
                    return { block: b, index };
                } else {
                    return undefined;
                }
            });

            if (hitBlocks.length > 0) {

                const tickBlockState = [...state];

                const factor = gameDimensions.blockHeight * 0.1;
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

                return tickBlockState;
            } else {
                return state;
            }

        default:
            return state;
    }
}