import "jest";
import { GameState } from "../Definitions/GameState";
import { gameStateReducer } from "../Reducers/GameStateReducer";
import { GameActions } from "../State/GameActions";

describe("game reducer tests", () => {
    it("resets", () => {
        // Act
        const result = gameStateReducer(undefined, { type: GameActions.reset});

        // Assert
        expect(result).toBeDefined();
        expect(result.level).toBe(1);
        expect(result.score).toBe(0);
    });

    it ("sets the game mode to ended", () => {
        // Arrange
        const state = gameStateReducer(undefined, { type: GameActions.reset});

        // Act
        const result = gameStateReducer(state, { type: GameActions.gameLost});

        // Assert
        expect(result.gameMode).toBe("ended");
    });

    it("inceases the score", () => {
        // Arrange
        const gameState: GameState = {
            gameMode: "running",
            level: 1,
            score: 1
        };

        // Act
        const result = gameStateReducer(gameState, { type: GameActions.hitBlock });

        // Assert
        expect(result.score).toBe(2);
    });

    it("inceases the level", () => {
        // Arrange
        const gameState: GameState = {
            gameMode: "running",
            level: 1,
            score: 1
        };

        // Act
        const result = gameStateReducer(gameState, { type: GameActions.nextLevel });

        // Assert
        expect(result.level).toBe(2);
    });

    it("inceases the level", () => {
        // Arrange
        const gameState: GameState = {
            gameMode: "running",
            level: 1,
            score: 1
        };

        // Act
        const result = gameStateReducer(gameState, { type: GameActions.nextLevel });

        // Assert
        expect(result.level).toBe(2);
    });
});