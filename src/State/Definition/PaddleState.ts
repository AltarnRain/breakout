import GameObject from "../../Definitions/GameObject";

/**
 * Defines the paddle
 */
export default interface PaddleState extends GameObject {
    /**
     * Typeguard boolean used to check if a passed shape is actually the paddle.
     */
    isPaddle: true;
}