import "jest";
import { NumberOfBlockColumns, NumberOfBlockRows } from "../Constants";
import { Blocks } from "../Definitions/Blocks";
import { getBlocks } from "../Lib";
import { blockReducer } from "../Reducers/BlockReducer";
import { GameActions } from "../State/GameActions";

describe("Block reduder tests", () => {

    it("gets the blocks", () => {
        // Arrange
        const expectedState: Blocks = {
            remainingBlocks: getBlocks(1, 1),
            level: 2
        };

        // Act
        const blocks = blockReducer(expectedState, { type: GameActions.reset });

        // Assert
        expect(blocks.remainingBlocks.length).toBe(NumberOfBlockRows * NumberOfBlockColumns);
        expect(blocks.level).toBe(1);
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
                    height: 10,
                    left: 0,
                    top: 0,
                    width: 10,
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