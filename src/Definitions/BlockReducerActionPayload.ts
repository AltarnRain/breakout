import { Block } from "./Block";

export interface BlockReducerActionPayload {
    hitBlock?: Block;

    level?: number;
}