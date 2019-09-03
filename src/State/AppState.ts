export interface AppState {
    gameDimensions?: GameDimensions;

    blocks?: Block[];

    paddle: Shape;

    ball: Ball;
}

export interface Block extends Shape {
    x: number;
    y: number;
}

export interface Shape {
    left: number;
    top: number;
    width: number;
    height: number;
    color: string;
}

export interface GameDimensions {
    left: number;
    top: number;
    size: number;
    blockHeight: number;
    blockWidth: number;
}

export interface Ball extends Shape {
    angle: number;
}