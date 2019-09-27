import "jest";
import { getBlocks } from "../Lib";
import { blockReducer } from "../Reducers/BlockReducer";
import { BlockState } from "../State/Definition/BlockState";
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
        } as BlockState;

        // Act
        const newState = blockReducer(blockState, { type: GameActions.hitBlock, payload: blockState.blocks[0] }).blocks[0];

        // Assert
        expect(newState.hit).toBe(true);
    });

    it("reduces the size of a hit block", () => {
        // Arrange
        const blockState: BlockState = {
            blocks: [
                {
                    color: "white",
                    height: 100,
                    width: 100,
                    hit: true,
                    left: 0,
                    top: 0,
                    x: 0,
                    y: 0,
                }
            ],
            width: 100,
            height: 100,
            rows: 1,
            columns: 1
        };

        // Act
        const result = blockReducer(blockState, { type: GameActions.tick }).blocks[0];

        // Assert
        expect(result.width).toBeLessThan(blockState.blocks[0].width);
        expect(result.height).toBeLessThan(blockState.blocks[0].height);
    });

    it("removes a block once it reaces 0 size", () => {
        // Arrange
        const block: BlockState = {
            blocks: [
                {
                    color: "white",
                    height: 0,
                    left: 0,
                    top: 0,
                    width: 0,
                    x: 0,
                    y: 0,
                    hit: true,
                }
            ],
            columns: 1,
            rows: 1,
            height: 10,
            width: 10
        };

        // Act
        const result = blockReducer(block, { type: GameActions.tick }).blocks[0];

        // Assert
        expect(result).toBe(undefined);
    });
});