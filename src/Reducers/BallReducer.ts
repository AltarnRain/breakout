import { degreeToRadian } from "../Constants";
import { getDimentions } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { Ball } from "../State/AppState";
import { GameActions } from "../State/GameActions";

export function ballReducer(state: Ball = {} as Ball, action: ActionPayload<number>): Ball {

    const gameDimensions = getDimentions();

    switch (action.type) {
        case GameActions.initialize:
            return {
                angle: 90,
                color: "yellow",
                height: gameDimensions.size * 0.02,
                width: gameDimensions.size * 0.02,
                left: (gameDimensions.size / 2) - (gameDimensions.size * 0.02 / 2),
                top: (gameDimensions.size / 2) - (gameDimensions.size * 0.02 / 2),
            };

        case GameActions.Tick:
            const v = 6;
            const x = Math.cos(state.angle * degreeToRadian * -1) * v + state.left;
            const y = Math.sin(state.angle * degreeToRadian * -1) * v + state.top;

            return {... state, left: x, top: y};
        default:
            return state;
    }
}