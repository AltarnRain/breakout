import "jest";
import { BlockState } from "../Definitions/BlockState";
import { getBlocks } from "../Lib";
import { blockReducer } from "../Reducers/BlockReducer";
import { GameActions } from "../State/GameActions";

describe("Block reduder tests", () => {

    it("gets the blocks", () => {
        // Arrange
        const expectedState = {
            blocks: getBlocks(1, 1),
        } as BlockState;

        // Act
        const blocks = blockReducer(expectedState, { type: GameActions.reset });

        // Assert
        expect(blocks.blocks.length).toBe(5 * 12);
    });

    it("marks a block as hit when it is hit", () => {
        // Arrange
        const blockState = {
            blocks: [
                {
                    color: "white",
                    height: 0,
                    left: 0,
                    top: 0,
                    width: 0,
                    x: 0,
                    y: 0,
                    hit: false,
                }
            ],
        } as BlockState ;

        // Act
        const newState = blockReducer(blockState, { type: GameActions.hitBlock, payload: blockState.blocks[0] }).blocks[0];

        // Assert
        expect(newState.hit).toBe(true);
    });

    it("reduces the size of a hit block", () => {
        // Arrange
        const blockState  = {
            blocks: [
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
        } as BlockState;

        // Act
        const result = blockReducer(blockState, { type: GameActions.tick }).blocks[0];

        // Assert
        expect(result.width).toBeLessThan(blockState.blocks[0].width);
        expect(result.height).toBeLessThan(blockState.blocks[0].height);
    });

    it("removes a block once it reaces 0 size", () => {
        // Arrange
        const block = {
            blocks: [
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
        } as BlockState;

        // Act
        const result = blockReducer(block, { type: GameActions.tick }).blocks[0];

        // Assert
        expect(result).toBe(undefined);
    });
});