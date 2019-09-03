import { ballVelocity, degreeToRadian, ballAngleStartRandomFactor } from "../Constants";
import { getDimentions } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { Ball } from "../State/AppState";
import { GameActions } from "../State/GameActions";

export function ballReducer(state: Ball = {} as Ball, action: ActionPayload<number>): Ball {

    const gameDimensions = getDimentions();

    switch (action.type) {
        case GameActions.initialize:

            const angleManipulator = (Math.random() * ballAngleStartRandomFactor);
            let angle = 90;
            if (Math.random() >= 0.5) {
                angle = angle - angleManipulator;
            } else {
                angle = angle + angleManipulator;
            }

            return {
                angle,
                color: "yellow",
                height: gameDimensions.size * 0.02,
                width: gameDimensions.size * 0.02,
                left: (gameDimensions.size / 2) - (gameDimensions.size * 0.02 / 2),
                top: (gameDimensions.size / 2) - (gameDimensions.size * 0.02 / 2),
            };

        case GameActions.Tick:
            const x = Math.cos(state.angle * degreeToRadian * -1) * ballVelocity + state.left;
            const y = Math.sin(state.angle * degreeToRadian * -1) * ballVelocity + state.top;

            return { ...state, left: x, top: y };
        default:
            return state;
    }
}