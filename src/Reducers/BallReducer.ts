import { BallResizeFactor, BallVelocity, DegreeToRadian } from "../Constants";
import { Guard } from "../Guard";
import { angleRandomizer, getDimentions } from "../Lib";
import ActionPayload from "../State/ActionPayLoad";
import { Ball, Shape } from "../State/AppState";
import { GameActions } from "../State/GameActions";


export function ballReducer(state: Ball = {} as Ball, action: ActionPayload<Shape>): Ball {

    const gameDimensions = getDimentions();

    switch (action.type) {
        case GameActions.initialize: {
            const angle = 90 + angleRandomizer();
            return {
                angle,
                color: "yellow",
                height: gameDimensions.size * BallResizeFactor,
                width: gameDimensions.size * BallResizeFactor,
                left: (gameDimensions.size / 2) - (gameDimensions.size * BallResizeFactor / 2),
                top: (gameDimensions.size / 2) - (gameDimensions.size * BallResizeFactor / 2),
            };
        }

        case GameActions.Tick: {
            const x = Math.cos(state.angle * DegreeToRadian * -1) * BallVelocity + state.left;
            const y = Math.sin(state.angle * DegreeToRadian * -1) * BallVelocity + state.top;

            return { ...state, left: x, top: y };
        }

        case GameActions.ballBounceHorizantally: {
            if (action.payload) {

                let angle = state.angle;
                let angleChange = 1;
                if (Guard.isPaddle(action.payload)) {

                    // calculate where the ball hit relative to the shape from the left size.
                    const p = action.payload.left - state.left;

                    // calculate a factor based on the shape's width. Since this is a horizantol hit, this results in a
                    // number between 0 and 1.
                    const v = p / action.payload.width;

                    if (v <= 0.5) {
                        // ball hit the left side.
                        angleChange = 30 * (0.5 - v) * -1;
                    } else {
                        angleChange = 30 * (v - 0.5);
                    }
                }

                angle = (angle + angleChange) * -1;
                // When the ball top or bottom makes contact, multiply the current angle by -1 for it to bounce.
                return { ...state, angle };
            }

            return state;
        }

        case GameActions.ballBounceVertically:
            const verticalBounceAngle = 180 - state.angle;

            return { ...state, angle: verticalBounceAngle };
        default:
            return state;
    }
}