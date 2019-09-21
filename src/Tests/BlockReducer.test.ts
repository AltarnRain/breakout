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
        const blocks = blockReducer(undefined, { type : GameActions.initialize});

        // Assert
        expect(blocks.length).toBe(expectedState.length);
    });

    it("removes a block from the state when it is hit", () => {
        // Arrange
        const state: Block[] = [
            {
                color: "white",
                height: 0,
                left: 0,
                top: 0,
                width: 0,
                x: 0,
                y: 0
            },
            {
                color: "white",
                height: 0,
                left: 0,
                top: 0,
                width: 0,
                x: 0,
                y: 0
            }
        ];

        // Act
        const newState = blockReducer(state, { type: GameActions.hitBlock, payload: state[0] });

        // Assert
        expect(newState.length).toBe(1);
        expect(newState[0]).toBe(state[1]);
    });
});