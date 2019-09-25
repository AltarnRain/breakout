import { GameObject } from "./GameObject";

/**
 * Defines the paddle
 */
export interface Paddle extends GameObject {
    /**
     * Typeguard boolean used to check if a passed shape is actually the paddle.
     */
    isPaddle: true;
}