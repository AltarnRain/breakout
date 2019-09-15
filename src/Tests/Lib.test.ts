import "jest";
import { NumberOfBlockColumns, NumberOfBlockRows } from "../Constants";
import { Ball } from "../Definitions/Ball";
import { ScreenObject } from "../Definitions/ScreenObject";
import { angleRandomizer, getBounceAction, getDirectionFromAngle, getInitialBlocks, overlaps } from "../Lib";
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
            left: 39,
            top: 125,
            width: 10,
            height: 10,
            angle: 360
        } as Ball;

        const shape = {
            left: 50,
            top: 100,
            width: 100,
            height: 50
        } as ScreenObject;

        // Act
        const result = getBounceAction(ball, shape);

        // Assert
        expect(result).toBe(GameActions.ballBounceVertically);
    });

    it("return horizantal when the ball bounces off the top side of a shape", () => {
        // Arrange
        const ball = {
            left: 80,
            top: 89,
            width: 10,
            height: 10,
            angle: 270
        } as Ball;

        const shape = {
            left: 50,
            top: 100,
            width: 100,
            height: 50
        } as ScreenObject;

        // Act
        const result = getBounceAction(ball, shape);

        // Assert
        expect(result).toBe(GameActions.ballBounceHorizantally);
    });

    it("return vertical when the ball bounces off the right side of a shape", () => {
        // Arrange
        const ball = {
            left: 149,
            top: 125,
            width: 10,
            height: 10,
            angle: 180
        } as Ball;

        const shape = {
            left: 50,
            top: 100,
            width: 100,
            height: 50
        } as ScreenObject;

        // Act
        const result = getBounceAction(ball, shape);

        // Assert
        expect(result).toBe(GameActions.ballBounceVertically);
    });

    it("return horizantal when the ball bounces off the bottom side of a shape", () => {
        // Arrange
        const ball = {
            left: 60,
            top: 149,
            width: 10,
            height: 10,
            angle: 90
        } as Ball;

        const shape = {
            left: 50,
            top: 100,
            width: 100,
            height: 50
        } as ScreenObject;

        // Act
        const result = getBounceAction(ball, shape);

        // Assert
        expect(result).toBe(GameActions.ballBounceHorizantally);
    });

    it ("gets up from an angle of 90", () => {
        // Act
        const result = getDirectionFromAngle(90);

        // Assert
        expect(result.length).toBe(1);
        expect(result[0]).toBe("up");
    });

    it ("gets up and right from an angle of 45", () => {
        // Act
        const result = getDirectionFromAngle(45);

        // Assert
        expect(result.length).toBe(2);
        expect(result.some((r) => r === "up")).toBe(true);
        expect(result.some((r) => r === "right")).toBe(true);
    });

    it ("gets right from an angle of 0 and 360", () => {
        // Act
        const result1 = getDirectionFromAngle(0);
        const result2 = getDirectionFromAngle(360);

        // Assert
        expect(result1.length).toBe(1);
        expect(result1[0]).toBe("right");

        expect(result2.length).toBe(1);
        expect(result2[0]).toBe("right");
    });

    it ("gets down and right from an angle of 315", () => {
        // Act
        const result = getDirectionFromAngle(315);

        // Assert
        expect(result.length).toBe(2);
        expect(result.some((r) => r === "down")).toBe(true);
        expect(result.some((r) => r === "right")).toBe(true);
    });

    it ("gets down from an angle of 270", () => {
        // Act
        const result = getDirectionFromAngle(270);

        // Assert
        expect(result.length).toBe(1);
        expect(result[0]).toBe("down");
    });

    it ("gets left and down from an angle of 225", () => {
        // Act
        const result = getDirectionFromAngle(225);

        // Assert
        expect(result.length).toBe(2);
        expect(result.some((r) => r === "down")).toBe(true);
        expect(result.some((r) => r === "left")).toBe(true);
    });

    it ("gets left from an angle of 180", () => {
        // Act
        const result = getDirectionFromAngle(180);

        // Assert
        expect(result.length).toBe(1);
        expect(result[0]).toBe("left");
    });
});