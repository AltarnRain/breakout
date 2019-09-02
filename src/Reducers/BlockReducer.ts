import { getDimentions, getInitialBlocks } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { Shape } from "../State/AppState";
import { GameActions } from "../State/GameActions";

export function blockReducer(state: Shape[] = [], action: ActionPayload<Shape>): Shape[] {
    if (!state) {
        state = [];
    }

    switch (action.type) {
        case GameActions.hit:
            if (action && action.payload) {
                const payload = action.payload;
                return state.filter((b) => b.x !== payload.x && b.y !== payload.y);
            } else {
                return state;
            }

        case GameActions.setDimensions:
            // The setDimension action is called once during bootup, then, it dispached via a resize event.
            const gameDimensions = getDimentions();

            let newState: Shape[];
            if (state.length === 0) {
                newState = getInitialBlocks();
            } else {
                newState = [...state];
            }

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