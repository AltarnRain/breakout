import { BallAngleStartRandomFactor, BounceAngleIncreaseConstant, DegreeToRadian, NumberOfBlockColumns, NumberOfBlockRows } from "./Constants";
import { Ball } from "./Definitions/Ball";
import { Block } from "./Definitions/Block";
import { ScreenObject } from "./Definitions/ScreenObject";
import { GameActions } from "./State/GameActions";

/**
 * Returns the initial block setup.
 * @returns {Block[]}.
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

/**
 * Checks if two shapes overlap
 * @param {ScreenObject} shape1. A Shape.
 * @param {ScreenObject} shape2. A Shape
 */
export const overlaps = (shape1: ScreenObject, shape2: ScreenObject) => {

    const left1 = Math.ceil(shape1.left);
    const right1 = Math.floor(shape1.left + shape1.width);
    const top1 = Math.ceil(shape1.top);
    const bottom1 = Math.floor(shape1.top + shape1.height);

    const left2 = Math.ceil(shape2.left);
    const right2 = Math.floor(shape2.left + shape2.width);
    const top2 = Math.ceil(shape2.top);
    const bottom2 = Math.floor(shape2.top + shape2.height);

    if (bottom1 < top2 || top1 > bottom2) {
        return false;
    }

    if (right2 < left1 || left2 > right1) {
        return false;
    }

    // Rectangles overlap
    return true;
};

/**
 * Randomizes an angle.
 * @returns {number}. A number that can be added to an angle to slightly change it.
 */
export const angleRandomizer = (): number => {
    const angleManipulator = (Math.random() * BallAngleStartRandomFactor);
    if (Math.random() >= 0.5) {
        return angleManipulator;
    } else {
        return angleManipulator * -1;
    }
};

/**
 * Determine the right action to dispatch when the ball bounces off an object.
 * @param {Ball} ball. Ball object.
 * @param {ScreenObject} shape. A shape object.
 * @returns {GameActions}. The bounce action or undefined if no bounce action could be determined.
 */
export const getBounceAction = (ball: Ball, shape: ScreenObject): GameActions.ballBounceHorizantally | GameActions.ballBounceVertically | undefined => {

    const left = shape.left;
    const right = shape.left + shape.width;
    const top = shape.top;
    const bottom = shape.top + shape.height;

    const cx = ball.left + (ball.width / 2);
    const cy = ball.top + (ball.height / 2);

    const x1 = ball.left;
    const x2 = ball.left + ball.width;

    const y1 = ball.top;
    const y2 = ball.top + ball.height;

    const withinVerticalBounds = (x1 > left || x2 < right);
    const withinHorizantalBounds = (y1 > top || y2 < bottom);

    if (cx < left && withinVerticalBounds) {
        // Left
        return GameActions.ballBounceVertically;
    } else if (cx > right && withinVerticalBounds) {
        // Top
        return GameActions.ballBounceVertically;
    } else if (cy < top && withinHorizantalBounds) {
        // right
        return GameActions.ballBounceHorizantally;
    } else if (cy > bottom && withinHorizantalBounds) {
        return GameActions.ballBounceHorizantally;
        // bottom
    }

    // tslint:disable-next-line: no-console
    console.log("Hit detection failed.");

    return undefined;
};

/**
 * Changes the angle based on the position of impact.
 * @param {Ball} ball. A ball object
 * @param {Paddle} paddle. A paddle object
 */
export const changeAngle = (ball: ScreenObject, paddle: ScreenObject): number => {
    const p = Math.abs(ball.left - paddle.left);

    // calculate a factor based on the shape's width. Since this is a horizantol hit, this results in a
    // number between 0 and 1.
    const v = p / paddle.width;
    const returnValue = BounceAngleIncreaseConstant * (0.5 - v) * -1;
    return returnValue;
};

export function getNextY(angle: number, distance: number, currentY: number) {
    return Math.sin(angle * DegreeToRadian * -1) * distance + currentY;
}

export function getNextX(angle: number, distance: number, currentX: number) {
    return Math.cos(angle * DegreeToRadian * -1) * distance + currentX;
}