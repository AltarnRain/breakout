import { Paddle } from "./State/AppState";

export const Guard = {

    /**
     * Typeguard for determining if a shape is actually the paddle.
     */
    isPaddle: (value: any): value is Paddle => {
        return value && value.isPaddle;
    }
};