import { Block } from "../Definitions/Block";
import { getGameDimensions } from "../GameDimensions";
import { getInitialBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { GameActions } from "../State/GameActions";

const gameDimensions = getGameDimensions();
export function blockReducer(state: Block[] = [], action: ActionPayload<Block>): Block[] {
    switch (action.type) {
        case GameActions.initialize:

            const newState = getInitialBlocks();

            newState.forEach((b) => {
                b.height = gameDimensions.blockHeight;
                b.width = gameDimensions.blockWidth;
                b.left = b.x * gameDimensions.blockWidth;
                b.top = b.y * gameDimensions.blockHeight;
            });

            return newState;
        case GameActions.hitBlock:
            return state.filter((b) => b !== action.payload);
        default:
            return state;
    }
}