import "jest";
import { NumberOfBlockColumns, NumberOfBlockRows } from "../Constants";
import { Ball } from "../Definitions/Ball";
import { Block } from "../Definitions/Block";
import { ScreenObject } from "../Definitions/ScreenObject";
import { angleRandomizer, getBounceAction, getInitialBlocks, overlaps } from "../Lib";
import { GameActions } from "../State/GameActions";

describe("Lib tests", () => {

    it("returns the initial block array based on defined constants", () => {
        // Act
        const result = getInitialBlocks();

        // Assert
        expect(result).toBeDefined();
        expect(result.length).toBe(NumberOfBlockRows * NumberOfBlockColumns);
    });

    it("returns a number to manipulate an angle", () => {
        // Act
        const result = angleRandomizer();

        // Assert - The result is based on a random number. Check if the output is a number.
        expect(typeof (result)).toBe("number");
    });

    it("returns true when a shape overlaps.", () => {

        // Shape
        const shape: ScreenObject = {
            height: 10,
            left: 10,
            top: 10,
            width: 20,
        };

        // Act. A shape always overlaps with itself.
        const result = overlaps(shape, shape);

        // Assert
        expect(result).toBe(true);
    });

    it("returns true when a smaller shape is insize a larger one.", () => {

        // Shape
        const bigShape: ScreenObject = {
            left: 10,
            top: 10,
            height: 10,
            width: 20,
        };

        const smallShape: ScreenObject = {
            left: 11,
            top: 11,
            height: 5,
            width: 5,
        };

        const result1 = overlaps(smallShape, bigShape);
        const result2 = overlaps(bigShape, smallShape);

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
    });

    it("returns false when two rectangles share the y axis, but not the x asix.", () => {

        // Shape
        const shape1: ScreenObject = {
            left: 10,
            top: 10,
            height: 10,
            width: 20,
        };

        const shape2: ScreenObject = {
            left: 31,
            top: 10,
            height: 10,
            width: 20,
        };

        const result1 = overlaps(shape2, shape1);
        const result2 = overlaps(shape1, shape2);

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
    });

    it("returns false when two rectangles share the x axis, but not the y asix.", () => {

        // Shape
        const shape1: ScreenObject = {
            left: 10,
            top: 10,
            height: 10,
            width: 20,
        };

        const shape2: ScreenObject = {
            left: 10,
            top: 21,
            height: 10,
            width: 20,
        };

        const result1 = overlaps(shape2, shape1);
        const result2 = overlaps(shape1, shape2);

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
    });

    it("return vertical when the ball bounces off the left side of a shape", () => {
        // Arrange
        const ball = {
            previousState: {
                left: 39,
                top: 125,
                width: 10,
                height: 10,
            },
            angle: 360
        } as Ball;

        const shape = {
            left: 50,
            top: 100,
            width: 100,
            height : 50
        } as ScreenObject;

        // Act
        const result = getBounceAction(ball, shape);

        // Assert
        expect(result).toBe(GameActions.ballBounceVertically);
    });

    it("return horizantal when the ball bounces off the top side of a shape", () => {
        // Arrange
        const ball = {
            previousState: {
                left: 80,
                top: 89,
                width: 10,
                height: 10,
            },
            angle: 270
        } as Ball;

        const shape = {
            left: 50,
            top: 100,
            width: 100,
            height : 50
        } as ScreenObject;

        // Act
        const result = getBounceAction(ball, shape);

        // Assert
        expect(result).toBe(GameActions.ballBounceHorizantally);
    });

    it("return vertical when the ball bounces off the right side of a shape", () => {
        // Arrange
        const ball = {
            previousState: {
                left: 51,
                top: 125,
                width: 10,
                height: 10,
            },
            angle: 180
        } as Ball;

        const shape = {
            left: 50,
            top: 100,
            width: 100,
            height : 50
        } as ScreenObject;

        // Act
        const result = getBounceAction(ball, shape);

        // Assert
        expect(result).toBe(GameActions.ballBounceVertically);
    });

    it("return horizantal when the ball bounces off the bottom side of a shape", () => {
        // Arrange
        const ball = {
            previousState: {
                left: 60,
                top: 144,
                width: 10,
                height: 10,
            },
            angle: 90
        } as Ball;

        const shape = {
            left: 50,
            top: 100,
            width: 100,
            height : 50
        } as ScreenObject;

        // Act
        const result = getBounceAction(ball, shape);

        // Assert
        expect(result).toBe(GameActions.ballBounceHorizantally);
    });
});