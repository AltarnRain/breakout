import "jest";
import { paddleReducer } from "../Reducers/PaddleReducer";
import { GameActions } from "../State/GameActions";

describe("PaddleReducer tests", () => {
    it("initializes", () => {
        // Act
        const paddle = paddleReducer(undefined, { type: GameActions.initialize});

        // Arrange
        expect(paddle).toBeDefined();
    });
});