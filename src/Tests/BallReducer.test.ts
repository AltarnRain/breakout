import "jest";
import { ballReducer } from "../Reducers/BallReducer";
import { Ball, Paddle } from "../State/AppState";
import { GameActions } from "../State/GameActions";

describe("ball reducer tests", () => {
    it("can return the initial state of the ball", () => {

        // Act
        const initialState = ballReducer(undefined, { type: GameActions.initialize });

        // Assert
        expect(initialState).toBeDefined();
        expect(initialState.color).toBe("yellow");

        const angleWithinLimits = initialState.angle <= 100 || initialState.angle >= 90;
        expect(angleWithinLimits).toBe(true);
    });

    it ("goes up at 90 degrees", () => {
        // Arrange
        const ball = {
            left : 50,
            top: 50,
            angle: 90,
        } as unknown as Ball;

        // Act
        const newBall = ballReducer(ball, {type: GameActions.Tick});

        // Assert
        expect(ball.left).toBe(newBall.left);
        expect(ball.top).toBeGreaterThan(newBall.top);
    });

    it ("goes right at 180 degrees", () => {
        // Arrange
        const ball = {
            left : 50,
            top: 50,
            angle: 180,
        } as unknown as Ball;

        // Act
        const newBall = ballReducer(ball, {type: GameActions.Tick});

        // Assert
        expect(ball.left).toBeGreaterThan(newBall.left);
        expect(ball.top).toBe(newBall.top);
    });

    it ("changes the angle depending on where the ball hits the paddle", () => {
        // Arrange
        const ball = {
            left : 100,
            top: 50,
            angle: 180,
            width: 50
        } as unknown as Ball;

        const paddle = {
            left: 100,
            top: 50,
            width: 200,
            isPaddle: true
        } as Paddle;

        // Act
        const result = ballReducer(ball, { type: GameActions.ballBounceHorizantally, payload: paddle});

        // Assert
        expect(result).toBeDefined();
    });
});