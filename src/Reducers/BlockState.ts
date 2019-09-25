import { Block } from "../Definitions/Block";

export interface BlockState {
    blocks: Block[];

    rows: number;

    columns: number;

    width: number;

    height: number;
}