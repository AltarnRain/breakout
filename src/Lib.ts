import { BallAngleStartRandomFactor, BounceAngleIncreaseConstant, DegreeToRadian } from "./Constants";
import { Ball } from "./Definitions/Ball";
import { Block } from "./Definitions/Block";
import { ScreenObject } from "./Definitions/ScreenObject";
import { Direction, hitSide as HitSide } from "./Definitions/Types";
import { GameActions } from "./State/GameActions";

/**
 * Returns the initial block setup.
 * @returns {Block[]}.
 */
export const getBlocks = (numberOfBlockRows: number, numberOfBlockColumns: number): Block[] => {

    const blocks: Block[] = [];
    for (let r = 0; r < numberOfBlockRows; r++) {
        for (let c = 0; c < numberOfBlockColumns; c++) {

            const red = Math.ceil(Math.random() * 70);
            const green = Math.ceil(Math.random() * 200);

            let trans = Math.random();
            if (trans < 0.5) {
                trans = 1;
            }
            const block: Block = {
                color: `rgba(${red}, ${green}, 120, ${trans})`,
                x: c,
                y: r,
                left: 0,
                top: 0,
                height: 0,
                width: 0,
                hit: false
            };

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

export const getBounceAction = (ball: Ball, shape: ScreenObject): GameActions.ballBounceHorizantally | GameActions.ballBounceVertically => {
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
 * @param {Ball} ball. Ball object.
 * @param {ScreenObject} shape. A shape object.
 * @returns {GameActions}. The bounce action or undefined if no bounce action could be determined.
 */
export const getHitSide = (ball: Ball, shape: ScreenObject): HitSide => {

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

export const getNextY = (angle: number, distance: number, currentY: number) => {
    return Math.sin(angle * DegreeToRadian * -1) * distance + currentY;
};

export const getNextX = (angle: number, distance: number, currentX: number) => {
    return Math.cos(angle * DegreeToRadian * -1) * distance + currentX;
};

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

/**
 * Compares the key value of the referenceObject to the sourceObject.
 * @param {any} sourceObject. Can be any object.
 * @param {any} referenceObject. Can be any object.
 */
export const getUpdatedOjbect = (sourceObject: any, referenceObject: any): any => {
    const newObject: any = {};
    Object.keys(sourceObject).forEach((key: string) => {

        // Get the objects using the key values from the application state.
        const referenceObjectKeyValue = referenceObject[key];
        const sourceObjectKeyValue = sourceObject[key];

        // Check if the objects have the same reference, if not expand the state object
        if (referenceObjectKeyValue !== sourceObjectKeyValue) {
            newObject[key] = sourceObjectKeyValue;
        }
    });

    if (Object.keys(newObject).length > 0) {
        return newObject;
    } else {
        return undefined;
    }
};