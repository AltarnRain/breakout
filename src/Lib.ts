/**
 * This is a library module that contains functions user throughout the entire game.
 */

import { BallAngleStartRandomFactor, BounceAngleIncreaseConstant, DegreeToRadian, MaxBlue, MaxRed, MinBlue, MinRed } from "./Constants/Constants";
import { Block } from "./Definitions/Block";
import { ScreenObject } from "./Definitions/ScreenObject";
import { Direction, hitSide as HitSide } from "./Definitions/Types";
import { BallState } from "./State/Definition/BallState";
import { GameActions } from "./State/GameActions";

/**
 * Returns the initial block setup.
 * @param {number} numberOfBlockRows. The amount of rows to add to the block array.
 * @param {number} numberOfBlockColumns. The mount of columns to add to the block array.
 * @returns {Block[]}. A 1d array that contains block objects.
 */
export const getBlocks = (numberOfBlockRows: number, numberOfBlockColumns: number): Block[] => {
    let red = MinRed;
    let blue = MinBlue;

    let redAdd =  5;
    let blueAdd = 5;

    const blocks: Block[] = [];
    for (let r = 0; r < numberOfBlockRows; r++) {
        for (let c = 0; c < numberOfBlockColumns; c++) {

            const block: Block = {
                color: `rgba(${red}, 0, ${blue}, 1`,
                x: c,
                y: r,
                left: 0,
                top: 0,
                height: 0,
                width: 0,
                hit: false,
                red,
                blue,
                green: 0,
                redAdd: 1,
                blueAdd: 1,
                greenAdd: 1
            };

            red += redAdd;
            blue += blueAdd;

            blocks.push(block);

            if (red > MaxRed || red < MinRed) {
                redAdd *= -1;
            }

            if (blue > MaxBlue || blue < MinBlue) {
                blueAdd *= -1;
            }
        }
    }

    return blocks;
};

/**
 * Checks if two shapes overlap
 * @param {ScreenObject} shape1. A Shape.
 * @param {ScreenObject} shape2. A Shape
 * @returns {boolean}. True if the shapes overlap, false otherwise.
 */
export const overlaps = (shape1: ScreenObject, shape2: ScreenObject): boolean => {

    const left1 = shape1.left;
    const right1 = shape1.left + shape1.width;
    const top1 =  shape1.top;
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

/**
 * Gets the bounce action depending on the balls heading an screen object's position.
 * @param {BallState} ball. A ball object.
 * @param {Shape} shape. Any game object that derives from ScreenObject.
 * @returns {GameActions.ballBounceHorizantally | GameActions.ballBounceVertically }. A ball can bounce vertically or horizantally.
 */
export const getBounceAction = (ball: BallState, shape: ScreenObject): GameActions.ballBounceHorizantally | GameActions.ballBounceVertically => {
    const hitSide = getHitSide(ball, shape);

    if (hitSide === "left" || hitSide === "right") {
        return GameActions.ballBounceVertically;
    } else if (hitSide === "top" || hitSide === "bottom") {
        return GameActions.ballBounceHorizantally;
    } else {
        // tslint:disable-next-line: no-console
        console.log("Failed hit detection");
        return GameActions.ballBounceHorizantally;
    }
};

/**
 * Determine the right action to dispatch when the ball bounces off an object.
 * @param {BallState} ball. Ball object.
 * @param {ScreenObject} shape. A shape object.
 * @returns {HitSide}. The side where the ball would bounce based on its current position and the shape's position.
 */
export const getHitSide = (ball: BallState, shape: ScreenObject): HitSide => {

    const shapeLeft = shape.left;
    const shapeRight = shape.left + shape.width;
    const shapeTop = shape.top;
    const shapeBottom = shape.top + shape.height;

    const ballLeft = ball.left;
    const ballRight = ball.left + ball.width;

    const ballTop = ball.top;
    const ballBottom = ball.top + ball.height;

    const withinVerticalBounds = (ballBottom > shapeTop && ballTop < shapeBottom);
    const withinHorizantalBounds = (ballRight > shapeLeft && ballLeft < shapeRight);

    const directions = getDirectionFromAngle(ball.angle);

    const goingLeft = directions.some((d) => d === "left");
    const goingRight = directions.some((d) => d === "right");
    const goingUp = directions.some((d) => d === "up");
    const goingDown = directions.some((d) => d === "down");

    // Most times the top or bottom of a ScreenObject will be hit so check those first.
    if (goingUp && withinHorizantalBounds) {
        return "bottom";
        // bottom
    } else if (goingDown && withinHorizantalBounds) {
        // Top
        return "top";
    } else if (goingLeft && withinVerticalBounds) {
        // Right
        return "right";
    } else if (goingRight && withinVerticalBounds) {
        // Left
        return "left";
    } else {
        return undefined;
    }
};

/**
 * Changes the angle based on the position of impact.
 * @param {BallState} ball. A ball object
 * @param {Paddle} paddle. A paddle object
 * @returns {number}. An angle that is slightly altered.
 */
export const changeAngle = (ball: ScreenObject, paddle: ScreenObject): number => {
    const p = Math.abs(ball.left - paddle.left);

    // calculate a factor based on the shape's width. Since this is a horizantol hit, this results in a
    // number between 0 and 1.
    const v = p / paddle.width;
    const returnValue = BounceAngleIncreaseConstant * (0.5 - v) * -1;
    return returnValue;
};

/**
 * Get next Y (position)
 * @param {number} angle. The angle of an object.
 * @param {number} distance. The distance the object will travel.
 * @param {number} currentY. The current Y coordinate of the object.
 * @returns {number}. The next Y position based on the object's angle and 'speed'.
 */
export const getNextY = (angle: number, distance: number, currentY: number) => {
    return Math.sin(angle * DegreeToRadian * -1) * distance + currentY;
};

/**
 * Get next X (position)
 * @param {number} angle. The angle of an object.
 * @param {number} distance. The distance the object will travel.
 * @param {number} currentY. The current X coordinate of the object.
 * @returns {number}. The next X position based on the object's angle and 'speed'.
 */
export const getNextX = (angle: number, distance: number, currentX: number) => {
    return Math.cos(angle * DegreeToRadian * -1) * distance + currentX;
};

/**
 * Get the directions from an angle
 * @param {number} angle. The angle of an object.
 * @returns {Direction[]}. The directions the object is traveling in. e.g. Down-left, or Up-right.
 */
export const getDirectionFromAngle = (angle: number): Direction[] => {

    // A ball can travel at two directions at most so the return
    // Value has to be an array with a size of 1 or two.
    const returnValue: Direction[] = [];

    const x = getNextX(angle, 10, 0);
    const y = getNextY(angle, 10, 0);

    if (x > 0) {
        // Ball travels to the right
        returnValue.push("right");
    }

    if (x < 0) {
        // Ball travels to the left.
        returnValue.push("left");
    }

    if (y > 0) {
        // Ball travels down.
        returnValue.push("down");
    }

    if (y < 0) {
        returnValue.push("up");
    }

    return returnValue;
};