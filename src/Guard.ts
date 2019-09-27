import { PaddleState } from "./State/Definition/PaddleState";

/**
 * A constant that contains type guards.
 */
export const Guard = {

    /**
     * Typeguard for determining if a shape is actually the paddle.
     * @returns {boolean}. True if the object is a paddle, false otherwise.
     */
    isPaddle: (value: any): value is PaddleState => {
        return value && value.isPaddle;
    }
};