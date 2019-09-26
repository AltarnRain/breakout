import "jest";
import { Ball } from "../Definitions/Ball";
import { ScreenObject } from "../Definitions/ScreenObject";
import { angleRandomizer, getBlocks, getDirectionFromAngle, getHitSide, overlaps } from "../Lib";

describe("Lib tests", () => {

    it("returns the initial block array based on defined constants", () => {
        // Act
        const result = getBlocks(5, 12);

        // Assert
        expect(result).toBeDefined();
        expect(result.length).toBe(5 * 12);
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

    it("return left when the ball approaches from left side of a shape", () => {
        // Arrange
        const shape = {
            left: 100,
            top: 100,
            width: 100,
            height: 50
        } as ScreenObject;

        const ball = {
            left: shape.left + shape.width,
            top: shape.top + shape.height / 2,
            width: 1,
            height: 1,
            angle: 360
        } as Ball;

        // Act
        const result = getHitSide(ball, shape);

        // Assert
        expect(result).toBe("left");
    });

    it("return top when the ball approaches the top side of a shape", () => {
        // Arrange
        const shape = {
            left: 100,
            top: 100,
            width: 100,
            height: 50
        } as ScreenObject;

        const ball = {
            left: shape.left + shape.width / 2,
            top: shape.top,
            width: 1,
            height: 1,
            angle: 270
        } as Ball;

        // Act
        const result = getHitSide(ball, shape);

        // Assert
        expect(result).toBe("top");
    });

    it("return right when the ball approaches from right side of a shape", () => {
        // Arrange
        const shape = {
            left: 100,
            top: 100,
            width: 100,
            height: 50
        } as ScreenObject;

        const ball = {
            left: shape.left + shape.width,
            top: shape.top + shape.height / 2,
            width: 1,
            height: 1,
            angle: 180
        } as Ball;

        // Act
        const result = getHitSide(ball, shape);

        // Assert
        expect(result).toBe("right");
    });

    it("return bottom when the ball approaches from the bottom side shape", () => {
        // Arrange
        const shape = {
            left: 100,
            top: 100,
            width: 100,
            height: 50
        } as ScreenObject;

        const ball = {
            left: shape.left + shape.width / 2,
            top: shape.top + shape.height,
            width: 1,
            height: 1,
            angle: 90
        } as Ball;

        // Act
        const result = getHitSide(ball, shape);

        // Assert
        expect(result).toBe("bottom");
    });

    it("gets up and right from an angle of 45", () => {
        // Act
        const result = getDirectionFromAngle(45);

        // Assert
        expect(result.length).toBe(2);
        expect(result.some((r) => r === "up")).toBe(true);
        expect(result.some((r) => r === "right")).toBe(true);
    });

    it("gets down and right from an angle of 315", () => {
        // Act
        const result = getDirectionFromAngle(315);

        // Assert
        expect(result.length).toBe(2);
        expect(result.some((r) => r === "down")).toBe(true);
        expect(result.some((r) => r === "right")).toBe(true);
    });

    it("gets left and down from an angle of 225", () => {
        // Act
        const result = getDirectionFromAngle(225);

        // Assert
        expect(result.length).toBe(2);
        expect(result.some((r) => r === "down")).toBe(true);
        expect(result.some((r) => r === "left")).toBe(true);
    });
});