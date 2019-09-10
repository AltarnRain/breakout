import { Ball } from "../State/AppState";

/**
 * Returns a ball object for units tests
 * @return {Ball}.
 */
export function getBall(): Ball {
    return {
        left: 50,
        top: 50,
        angle: 180,
        velocity: 1,
        color: "blue",
        height: 10,
        lastObject: undefined,
        width: 10
    };
}