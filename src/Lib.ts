/**
 * This is a library module that contains functions user throughout the entire game.
 */

import { BallAngleStartRandomFactor, BounceAngleIncreaseConstant, DegreeToRadian, MaxBlue, MaxRed, MinBlue, MinRed } from "./Constants/Constants";
import Block from "./Definitions/Block";
import Direction from "./Definitions/Direction";
import Line from "./Definitions/Line";
import ScreenObject from "./Definitions/ScreenObject";
import BallState from "./State/Definition/BallState";
import GameActions from "./State/GameActions";

/**
 * Returns the initial block setup.
 * @param {number} numberOfBlockRows. The amount of rows to add to the block array.
 * @param {number} numberOfBlockColumns. The mount of columns to add to the block array.
 * @returns {Block[]}. A 1d array that contains block objects.
 */
export const getBlocks = (numberOfBlockRows: number, numberOfBlockColumns: number): Block[] => {
    let red = MinRed;
    let blue = MinBlue;

    let redAdd = 5;
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

/**
 * Gets the bounce action depending on the balls heading an screen object's position.
 * @param {BallState} ball. A ball object.
 * @param {Shape} shape. Any game object that derives from ScreenObject.
 * @returns {GameActions.ballBounceHorizantally | GameActions.ballBounceVertically }. A ball can bounce vertically or horizantally.
 */
export const getBounceAction = (ball: BallState, shape: ScreenObject): GameActions.ballBounceHorizantally | GameActions.ballBounceVertically => {

    const directions = getDirectionFromAngle(ball.angle);

    let horizantalLine: Line = {} as Line;
    let verticalLine: Line = {} as Line;

    const shapeBottom = shape.top + shape.height;
    const shapeRight = shape.left + shape.width;

    if (directions.up) {
        horizantalLine = {
            a: {
                x: shape.left,
                y: shapeBottom,
            },
            b: {
                x: shapeRight,
                y: shapeBottom
            }
        };
    }

    if (directions.right) {
        verticalLine = {
            a: {
                x: shape.left,
                y: shape.top,
            },
            b: {
                x: shape.left,
                y: shapeBottom,
            }
        };
    }

    if (directions.down) {
        horizantalLine = {
            a: {
                x: shape.left,
                y: shape.top,
            },
            b: {
                x: shapeRight,
                y: shape.top,
            }
        };
    }

    if (directions.left) {
        verticalLine = {
            a: {
                x: shapeRight,
                y: shape.top,
            },
            b: {
                x: shapeRight,
                y: shapeBottom
            }
        };
    }

    const hitLine = getHitLine(ball, horizantalLine, verticalLine);

    if (hitLine === horizantalLine) {
        return GameActions.ballBounceHorizantally;
    } else if (hitLine === verticalLine) {
        return GameActions.ballBounceVertically;
    } else {
        // Default to a horizantal bounce because it is the most likely to occur.
        return GameActions.ballBounceHorizantally;
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
export const getDirectionFromAngle = (angle: number): Direction => {

    // A ball can travel at two directions at most so the return
    // Value has to be an array with a size of 1 or two.
    const returnValue: Direction = { up: false, down: false, left: false, right: false };

    const x = getNextX(angle, 10, 0);
    const y = getNextY(angle, 10, 0);

    if (x > 0) {
        // Ball travels to the right
        returnValue.right = true;
    }

    if (x < 0) {
        // Ball travels to the left.
        returnValue.left = true;
    }

    if (y > 0) {
        // Ball travels down.
        returnValue.down = true;
    }

    if (y < 0) {
        // Ball travels up
        returnValue.up = true;
    }

    return returnValue;
};

/**
 * Determines which line was hit.
 * @param {BallState} ball. The ball.
 * @param {Line} horizantalLine. The horizantal line of a shape. Can be the top or bottom.
 * @param {Line} verticalLine. The vertical line of a shape. Can be left or right.
 * @returns {Line}. The hit line. Returns undefined when the hit line could not be found.
 */
export const getHitLine = (ball: BallState, horizantalLine: Line, verticalLine: Line): Line | undefined => {

    const forward = ball.velocity;
    const backward = ball.velocity * -1;

    const topLeftLine: Line = {
        a: {
            x: getNextX(ball.angle, forward, ball.left),
            y: getNextY(ball.angle, forward, ball.top),
        },
        b: {
            x: getNextX(ball.angle, backward, ball.left),
            y: getNextY(ball.angle, backward, ball.top),
        }
    };

    const topRightLine: Line = {
        a: {
            x: getNextX(ball.angle, forward, ball.left + ball.width),
            y: getNextY(ball.angle, forward, ball.top),
        },
        b: {
            x: getNextX(ball.angle, backward, ball.left + ball.width),
            y: getNextY(ball.angle, backward, ball.top),
        }
    };

    const bottomRightLine: Line = {
        a: {
            x: getNextX(ball.angle, forward, ball.left + ball.width),
            y: getNextY(ball.angle, forward, ball.top + ball.height),
        },
        b: {
            x: getNextX(ball.angle, backward, ball.left + ball.width),
            y: getNextY(ball.angle, backward, ball.top + ball.height),
        }
    };

    const bottomLeftLine: Line = {
        a: {
            x: getNextX(ball.angle, forward, ball.left ),
            y: getNextY(ball.angle, forward, ball.top + ball.height),
        },
        b: {
            x: getNextX(ball.angle, backward, ball.left),
            y: getNextY(ball.angle, backward, ball.top + ball.height),
        }
    };

    let horizantolIntersects = 0;
    let verticalIntersects = 0;

    horizantolIntersects += intersects(
        topLeftLine,
        horizantalLine) ? 1 : 0;

    verticalIntersects += intersects(
        topLeftLine,
        verticalLine) ? 1 : 0;

    horizantolIntersects += intersects(
        topRightLine,
        horizantalLine) ? 1 : 0;

    verticalIntersects += intersects(
        topRightLine,
        verticalLine) ? 1 : 0;

    horizantolIntersects += intersects(
        bottomRightLine,
        horizantalLine) ? 1 : 0;

    verticalIntersects += intersects(
        bottomRightLine,
        verticalLine) ? 1 : 0;

    horizantolIntersects += intersects(
        bottomLeftLine,
        horizantalLine) ? 1 : 0;

    verticalIntersects += intersects(
        bottomLeftLine,
        verticalLine) ? 1 : 0;

    if (horizantolIntersects > verticalIntersects) {
        return horizantalLine;
    } else if (verticalIntersects > horizantolIntersects) {
        return verticalLine;
    } else {
        // tslint:disable-next-line: no-console
        console.log("Could not determine the hit");
        return undefined;
    }
};

/**
 * Returns true if the intercet.
 * Source: https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
 */
export function intersects(line1: Line, line2: Line) {

    const x1 = Math.floor(line1.a.x);
    const y1 = Math.floor(line1.a.y);
    const x2 = Math.floor(line1.b.x);
    const y2 = Math.floor(line1.b.y);

    const x3 = Math.floor(line2.a.x);
    const y3 = Math.floor(line2.a.y);
    const x4 = Math.floor(line2.b.x);
    const y4 = Math.floor(line2.b.y);

    const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    if (isNaN(x) || isNaN(y)) {
        return false;
    } else {
        if (x1 >= x2) {
            if (!(x2 <= x && x <= x1)) { return false; }
        } else {
            if (!(x1 <= x && x <= x2)) { return false; }
        }
        if (y1 >= y2) {
            if (!(y2 <= y && y <= y1)) { return false; }
        } else {
            if (!(y1 <= y && y <= y2)) { return false; }
        }
        if (x3 >= x4) {
            if (!(x4 <= x && x <= x3)) { return false; }
        } else {
            if (!(x3 <= x && x <= x4)) { return false; }
        }
        if (y3 >= y4) {
            if (!(y4 <= y && y <= y3)) { return false; }
        } else {
            if (!(y3 <= y && y <= y4)) { return false; }
        }
    }
    return true;
}