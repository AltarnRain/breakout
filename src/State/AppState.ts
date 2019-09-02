
export interface AppState {

    gameDimensions?: GameDimensions;

    blocks?: Shape[];

    paddle: Shape;
}

export interface Shape {
    left: number;
    top: number;
    width: number;
    height: number;
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