import { Block, GameDimensions } from "./State/AppState";

export const getInitialBlocks = (): Block[] => {

    const blocks: Block[] = [];

    let index = 0;
    for (let r = 0; r < 5; r++) {
        index++;
        for (let c = 0; c < 12; c++) {
            const block: Block = {
                color: index % 2 === 0 ? "red" : "blue",
                x: c,
                y: r,
                left: 0,
                top: 0,
                height: 0,
                width: 0
            };

            index++;
            blocks.push(block);
        }
    }

    return blocks;
};

export const getDimentions = (): GameDimensions => {
    let size = 0;

    if (window.innerHeight > window.innerWidth) {
        size = window.innerWidth * 0.9;
    } else {
        size = window.innerHeight * 0.9;
    }

    const left = (window.innerWidth / 2) - (size / 2);
    const top = (window.innerHeight / 2) - (size / 2);
    const blockHeight = size / 24;
    const blockWidth = size / 12;

    return { left, top, size, blockHeight, blockWidth };
};

export const alteredDimensions = (valueA: GameDimensions, valueB: GameDimensions) => {

    return valueA.left !== valueB.left ||
        valueA.top !== valueB.top ||
        valueA.size !== valueB.size ||
        valueA.blockHeight !== valueB.blockHeight ||
        valueA.blockWidth !== valueB.blockWidth;
};

export const setStateWhenChanged = <T>(f: (value: T) => void, oldValue: T, newValue: T): void => {
    if (oldValue !== newValue) {
        f(newValue);
    }
};