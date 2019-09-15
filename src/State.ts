import { Ball } from "./Definitions/Ball";
import { Block } from "./Definitions/Block";
import { Paddle } from "./Definitions/Paddle";

/**
 * State of the main application.
 */
export interface State {
    /**
     * Component paddle state.
     */
    paddle?: Paddle;

    /**
     * Component block state.
     */
    blocks?: Block[];

    /**
     * Component ball state.
     */
    ball?: Ball;

    gameLost: boolean;
}