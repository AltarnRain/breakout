import { getDimentions, getInitialBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { Block } from "../State/AppState";
import { GameActions } from "../State/GameActions";

export function blockReducer(state: Block[] = [], action: ActionPayload<Block>): Block[] {
    if (!state) {
        state = [];
    }

    switch (action.type) {
        case GameActions.hitBlock:
            return state.filter((b) => b !== action.payload);

        case GameActions.initialize:
            // The setDimension action is called once during bootup, then, it dispached via a resize event.
            const gameDimensions = getDimentions();
            const newState = getInitialBlocks();
            
            newState.forEach((b) => {
                b.height = gameDimensions.blockHeight;
                b.width = gameDimensions.blockWidth;
                b.left = b.x * gameDimensions.blockWidth;
                b.top = b.y * gameDimensions.blockHeight;
            });

            return newState;
        default:
            return state;
    }
}