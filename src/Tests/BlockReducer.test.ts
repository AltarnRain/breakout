import "jest";
import { Block } from "../Definitions/Block";
import { getInitialBlocks } from "../Lib";
import { blockReducer } from "../Reducers/BlockReducer";
import { GameActions } from "../State/GameActions";

describe("Block reduder tests", () => {

    it("initializes the blocks", () => {
        // Arrange
        const expectedState = getInitialBlocks();

        // Act
        const blocks = blockReducer(undefined, { type: GameActions.initialize });

        // Assert
        expect(blocks.length).toBe(expectedState.length);
    });

    it("marks a block as hit when it is hit", () => {
        // Arrange
        const state: Block[] = [
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
        ];

        // Act
        const newState = blockReducer(state, { type: GameActions.hitBlock, payload: state[0] })[0];

        // Assert
        expect(newState.hit).toBe(true);
    });

    it("reduces the size of a hit block", () => {
        // Arrange
        const block: Block = {
            color: "white",
            height: 50,
            left: 0,
            top: 0,
            width: 100,
            x: 0,
            y: 0,
            hit: true
        }
            ;

        // Act
        const result = blockReducer([block], { type: GameActions.tick })[0];

        // Assert
        expect(result.width).toBeLessThan(block.width);
        expect(result.height).toBeLessThan(block.height);
    });

    it("removes a block once it reaces 0 size", () => {
        // Arrange
        const block: Block = {
            color: "white",
            height: 0,
            left: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
            hit: true
        }
            ;

        // Act
        const result = blockReducer([block], { type: GameActions.tick })[0];

        // Assert
        expect(result).toBe(undefined);
    });
});