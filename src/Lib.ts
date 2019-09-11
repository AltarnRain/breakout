import { BallAngleStartRandomFactor, BounceAngleIncreaseConstant, NumberOfBlockColumns, NumberOfBlockRows } from "./Constants";
import { Block } from "./State/Block";
import { GameActions } from "./State/GameActions";
import { ScreenObject } from "./State/ScreenObject";

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

const SubShapeHeight = 2;
/**
 * Determine the right action to dispatch when the ball bounces off an object.
 * @param {Ball} ball. Ball object.
 * @param {ScreenObject} shape. A shape object.
 * @returns {GameActions}. The bounce action or undefined if no bounce action could be determined.
 */
export const getBounceAction = (ball: ScreenObject, shape: ScreenObject): GameActions.ballBounceHorizantally | GameActions.ballBounceVertically | undefined => {

    // Create a ScreenObject object for the top, bottom, left and right sides of the shape. We can use the overlap function
    // to determine where the ball hit the shape.

    const top: ScreenObject = {
        left: shape.left,
        height: SubShapeHeight,
        width: shape.width,
        top: shape.top
    };

    const bottom: ScreenObject = {
        left: shape.left,
        height: 2,
        width: shape.width,
        top: shape.top + shape.width
    };

    const left: ScreenObject = {
        left: shape.left,
        height: shape.height,
        width: 2,
        top: shape.top
    };

    const right: ScreenObject = {
        left: shape.left + shape.width,
        height: shape.height,
        width: 2,
        top: shape.top
    };

    const overlapsTop = overlaps(ball, top);
    const overlapsBottom = overlaps(ball, bottom);
    const overlapsLeft = overlaps(ball, left);
    const overlapsRight = overlaps(ball, right);

    // At the corners there's some overlap since the ball us much more likely to hit a bottom
    // We'll give the bottom preference.

    if (overlapsBottom) {
        return GameActions.ballBounceHorizantally;
    } else if (overlapsLeft || overlapsRight) {
        // Next are the sides.
        return GameActions.ballBounceVertically;
    } else if (overlapsTop) {
        // Last we'll check if the top of a screen object was hit.
        return GameActions.ballBounceHorizantally;
    } else {
        return undefined;
    }
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