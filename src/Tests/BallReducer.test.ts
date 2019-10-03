import "jest";
import ballReducer from "../Reducers/BallReducer";
import BallState from "../State/Definition/BallState";
import PaddleState from "../State/Definition/PaddleState";
import GameActions from "../State/GameActions";

describe("ball reducer tests", () => {
    it("can reset the state of the ball", () => {

        // Act
        const initialState = ballReducer(undefined, { type: GameActions.reset });

        // Assert
        expect(initialState).toBeDefined();
        expect(initialState.color).toBeDefined();

        const angleWithinLimits = initialState.angle <= 100 || initialState.angle >= 90;
        expect(angleWithinLimits).toBe(true);
    });

    it("goes up at 90 degrees", () => {
        // Arrange
        const ball: BallState = {
            left: 50,
            top: 50,
            angle: 180,
            velocity: 1,
        } as BallState;

        ball.angle = 90;

        // Act
        const newBall = ballReducer(ball, { type: GameActions.tick });

        // Assert
        expect(ball.left).toBe(newBall.left);
        expect(ball.top).toBeGreaterThan(newBall.top);
    });

    it("goes right at 180 degrees", () => {
        // Arrange
        const ball: BallState = {
            left: 50,
            top: 50,
            angle: 180,
            velocity: 10,
        } as BallState;

        // Act
        const newBall = ballReducer(ball, { type: GameActions.tick });

        // Assert
        expect(ball.left).toBeGreaterThan(newBall.left);
        expect(ball.top).toBe(newBall.top);
    });

    it("changes the angle depending on where the ball hits the paddle", () => {
        // Arrange
        const ball = {
            left: 100,
            top: 50,
            angle: 180,
            width: 50
        } as unknown as BallState;

        const paddle = {
            left: 100,
            top: 50,
            width: 200,
            isPaddle: true
        } as PaddleState;

        // Act
        const result = ballReducer(ball, { type: GameActions.ballBounceHorizantally, payload: { object: paddle }} );

        // Assert
        expect(result).toBeDefined();
    });
});
