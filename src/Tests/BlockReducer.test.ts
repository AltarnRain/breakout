import "jest";
import { Blocks } from "../Definitions/Blocks";
import { getBlocks } from "../Lib";
import { blockReducer } from "../Reducers/BlockReducer";
import { GameActions } from "../State/GameActions";

describe("Block reduder tests", () => {

    it("initializes the blocks", () => {
        // Arrange
        const expectedState = getBlocks(1, 1);

        // Act
        const blocks = blockReducer(undefined, { type: GameActions.reset });

        // Assert
        expect(blocks.remainingBlocks).toBe(expectedState.length);
    });

    it("marks a block as hit when it is hit", () => {
        // Arrange
        const block: Blocks = {
            level: 1,
            remainingBlocks: [
                {
                    color: "white",
                    height: 0,
                    left: 0,
                    top: 0,
                    width: 0,
                    x: 0,
                    y: 0,
                    hit: false
                }
            ]
        };

        // Act
        const newState = blockReducer(block, { type: GameActions.hitBlock, payload: block.remainingBlocks[0] }).remainingBlocks[0];

        // Assert
        expect(newState.hit).toBe(true);
    });

    it("reduces the size of a hit block", () => {
        // Arrange
        const block: Blocks = {
            level: 1,
            remainingBlocks: [
                {
                    color: "white",
                    height: 0,
                    left: 0,
                    top: 0,
                    width: 0,
                    x: 0,
                    y: 0,
                    hit: true
                }
            ]
        };

        // Act
        const result = blockReducer(block, { type: GameActions.tick }).remainingBlocks[0];

        // Assert
        expect(result.width).toBeLessThan(block.remainingBlocks[0].width);
        expect(result.height).toBeLessThan(block.remainingBlocks[0].height);
    });

    it("removes a block once it reaces 0 size", () => {
        // Arrange
        const block: Blocks = {
            level: 1,
            remainingBlocks: [
                {
                    color: "white",
                    height: 0,
                    left: 0,
                    top: 0,
                    width: 0,
                    x: 0,
                    y: 0,
                    hit: true

                }
            ]
        };

        // Act
        const result = blockReducer(block, { type: GameActions.tick }).remainingBlocks[0];

        // Assert
        expect(result).toBe(undefined);
    });
});