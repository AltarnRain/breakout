import "jest";
import { overlaps } from "./Lib";
import { Shape } from "./State/AppState";

describe("Lib tests", () => {
    it("returns true when a shape overlaps.", () => {

        // Shape
        const shape: Shape = {
            color: "white",
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
        const bigShape: Shape = {
            color: "white",
            left: 10,
            top: 10,
            height: 10,
            width: 20,
        };

        const smallShape: Shape = {
            color: "white",
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
        const shape1: Shape = {
            color: "white",
            left: 10,
            top: 10,
            height: 10,
            width: 20,
        };

        const shape2: Shape = {
            color: "white",
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
        const shape1: Shape = {
            color: "white",
            left: 10,
            top: 10,
            height: 10,
            width: 20,
        };

        const shape2: Shape = {
            color: "white",
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
});