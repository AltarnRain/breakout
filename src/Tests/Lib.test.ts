import "jest";
import { NumberOfBlockColumns, NumberOfBlockRows } from "../Constants";
import { angleRandomizer, getBounceAction, getInitialBlocks, overlaps } from "../Lib";
import { Ball, Block, Shape } from "../State/AppState";
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

    it("returns the verticle bounce action", () => {

        const ball = {
            left: 50,
            top: 39,
            width: 10,
        } as Ball;

        const block = {
            left: 30,
            top: 50,
            width: 20
        } as Block;

        // Act
        const result = getBounceAction(ball, block);

        // Assert
        expect(result).toBe(GameActions.ballBounceVertically);
    });

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

    it("return vertical when the ball bounces off the left side of a shape", ()  => {
        const ball = get
    });
});