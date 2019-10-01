import "jest";
import { Line } from "../Definitions/Line";
import { ScreenObject } from "../Definitions/ScreenObject";
import { angleRandomizer, getBlocks, intersects, overlaps, getHitLine } from "../Lib";
import { BallState } from "../State/Definition/BallState";

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

    it("returns true when two lines intersect", () => {
        // Arrange
        const horizantalLine: Line = {
            a: {
                x: 100,
                y: 100,
            },
            b: {
                x: 150,
                y: 100,
            }
        };

        const verticalLine: Line = {
            a: {
                x: 125,
                y: 90,
            },
            b: {
                x: 125,
                y: 120
            }
        };

        // Act
        // const intersect1 = intersects(verticalLine, horizantalLine);

        const intersect2 = intersects(verticalLine, horizantalLine);

        // Assert
        // expect(intersect1).toBe(true);
        expect(intersect2).toBe(true);
    });

    it("returns the line that was hit when the object approaches from the top.", () => {
        // Arrange
        const horizantalLine: Line = {
            a: {
                x: 100,
                y: 100,
            },
            b: {
                x: 150,
                y: 100,
            }
        };

        const verticalLine: Line = {
            a: {
                x: 100,
                y: 100,
            },
            b: {
                x: 100,
                y: 150
            }
        };

        const ball: BallState = {
            angle: 90,
            color: "white",
            height: 10,
            width: 10,
            lastObject: undefined,
            left: 150,
            top: 120,
            velocity: 10,
        };

        // Act
        const hitLine = getHitLine(ball, horizantalLine, verticalLine);

        // Assert
        expect(hitLine).toBe(horizantalLine);
    });
});