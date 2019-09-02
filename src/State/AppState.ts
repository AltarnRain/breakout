
export interface AppState {

    gameDimensions?: GameDimensions;

    blocks?: Block[];
}

export interface Block {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    color: string;
    x: number;
    y: number;
}

export interface GameDimensions {
    left: number;
    top: number;
    size: number;
    blockHeight: number;
    blockWidth: number;
}