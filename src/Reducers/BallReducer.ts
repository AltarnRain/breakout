import { getDimentions } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { Ball } from "../State/AppState";
import { GameActions } from "../State/GameActions";

export function ballReducer(state: Ball = {} as Ball, action: ActionPayload<number>): Ball {

    const gameDimensions = getDimentions();

    switch (action.type) {
        case GameActions.setDimensions:

            const height = gameDimensions.size * 0.02;
            const width = height;
            const left = (gameDimensions.size / 2) - (width / 2);
            const top = (gameDimensions.size / 2) - (height / 2);

            return {
                angle: 90,
                color: "yellow",
                height,
                width,
                left,
                top
            };
        case GameActions.Tick:
            // const angle = state.angle;
            // const time = action.payload;

            return state;
        default:
            return state;

    }
}