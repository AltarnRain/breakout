import "jest";
import { Paddle } from "../Definitions/Paddle";
import { paddleReducer } from "../Reducers/PaddleReducer";
import { GameActions } from "../State/GameActions";

describe("PaddleReducer tests", () => {
    it("resets", () => {
        // Act
        const paddle = paddleReducer(undefined, { type: GameActions.reset });

        // Arrange
        expect(paddle).toBeDefined();
    });

    it("can move", () => {
        // Arrange
        const paddle: Paddle = {
            color: "white",
            height: 10,
            isPaddle: true,
            left: 50,
            top: 10,
            width: 50
        };

        const mouseXPosition = 60;

        // Act
        const result = paddleReducer(paddle, { type: GameActions.paddleMove, payload: mouseXPosition });

        // Assert
        const expectedResult = mouseXPosition - (paddle.width / 2);
        expect(result.left).toBe(expectedResult);
    });

    it("wont set the paddle beyond the game left sizd", () => {
        // Arrange
        const paddle: Paddle = {
            color: "white",
            height: 10,
            isPaddle: true,
            left: 50,
            top: 10,
            width: 50
        };

        const mouseXPosition = 0;

        // Act
        const result = paddleReducer(paddle, { type: GameActions.paddleMove, payload: mouseXPosition });

        // Assert
        expect(result.left).toBe(0);
    });

    it("wont set the paddle beyond the game right side", () => {
        // Arrange
        const paddle: Paddle = {
            color: "white",
            height: 10,
            isPaddle: true,
            left: 50,
            top: 10,
            width: 50
        };

        const mouseXPosition = 5000;

        // Act
        const result = paddleReducer(paddle, { type: GameActions.paddleMove, payload: mouseXPosition });

        const expectedValue = paddle.left - paddle.width;

        // Assert
        expect(result.left).not.toBe(expectedValue);
    });
});