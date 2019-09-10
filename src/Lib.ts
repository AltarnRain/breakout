import { BallAngleStartRandomFactor, NumberOfBlockColumns, NumberOfBlockRows } from "./Constants";
import { Ball, Block, GameDimensions, Shape } from "./State/AppState";
import { GameActions } from "./State/GameActions";

/**
 * Returns the initial block setup.
 */
export const getInitialBlocks = (): Block[] => {

    const blocks: Block[] = [];

    let index = 0;
    for (let r = 0; r < NumberOfBlockRows; r++) {
        index++;
        for (let c = 0; c < NumberOfBlockColumns; c++) {
            const block: Block = {
                color: index % 2 === 0 ? "red" : "blue",
                x: c,
                y: r,
                left: 0,
                top: 0,
                height: 0,
                width: 0
            };

            index++;
            blocks.push(block);
        }
    }

    return blocks;
};

export const alteredDimensions = (valueA: GameDimensions, valueB: GameDimensions) => {

    return valueA.left !== valueB.left ||
        valueA.top !== valueB.top ||
        valueA.size !== valueB.size ||
        valueA.blockHeight !== valueB.blockHeight ||
        valueA.blockWidth !== valueB.blockWidth;
};

export const setStateWhenChanged = <T>(f: (value: T) => void, oldValue: T, newValue: T): void => {
    if (oldValue !== newValue) {
        f(newValue);
    }
};

export function overlaps(shape1: Shape, shape2: Shape) {

    const left1 = shape1.left;
    const right1 = shape1.left + shape1.width;
    const top1 = shape1.top;
    const bottom1 = shape1.top + shape1.height;

    const left2 = shape2.left;
    const right2 = shape2.left + shape2.width;
    const top2 = shape2.top;
    const bottom2 = shape2.top + shape2.height;

    if (bottom1 < top2 || top1 > bottom2) {
        return false;
    }

    if (right2 < left1 || left2 > right1) {
        return false;
    }

    // Rectangles overlap
    return true;
}

export function angleRandomizer(): number {
    const angleManipulator = (Math.random() * BallAngleStartRandomFactor);
    if (Math.random() >= 0.5) {
        return angleManipulator;
    } else {
        return angleManipulator * -1;
    }
}

/**
 * Determine the right action to dispatch when the ball bounces off an object.
 * @param {Ball} ball. Ball object.
 * @param {Shape} shape. A shape object.
 * @returns
 */
export function getBounceAction(ball: Ball, shape: Shape): GameActions.ballBounceHorizantally | GameActions.ballBounceVertically | undefined {
    const hitTop = ball.top >= shape.top + shape.height;
    const hitBottom = ball.top + ball.height >= shape.top;
    const hitLeft = ball.left + ball.width >= shape.left;
    const hitRight = ball.left >= shape.left + shape.width;

    if (hitTop || hitBottom) {
        return GameActions.ballBounceHorizantally;
    } else if (hitLeft || hitRight) {
        return GameActions.ballBounceVertically;
    } else {
        return undefined;
    }
}