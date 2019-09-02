
import React, { CSSProperties, useEffect, useState } from "react";
import { setStateWhenChanged } from "../Lib";
import { Block, GameDimensions } from "../State/AppState";
import { appState, appStore } from "../Store";

export const Main: React.FC = () => {

    const [gameDimensions, setGameDimensions] = useState<GameDimensions | undefined>(appState().gameDimensions);
    const [blocks, setBlocks] = useState<Block[] | undefined>(appState().blocks);

    useEffect(() => {
        appStore().subscribe(() => {
            setStateWhenChanged(setGameDimensions, gameDimensions, appState().gameDimensions);
            setStateWhenChanged(setBlocks, blocks, appState().blocks);
        });
    });

    const gameFieldStyle = (): CSSProperties | undefined => {
        if (gameDimensions) {
            return {
                position: "absolute",
                left: gameDimensions.left,
                top: gameDimensions.top,
                width: gameDimensions.size,
                height: gameDimensions.size,
                borderColor: "white",
                borderStyle: "solid"
            };
        }
    };

    const blockStyle = (block: Block): CSSProperties => {

        return {
            position: "absolute",
            left: block.left,
            top: block.top,
            height: block.height,
            width: block.width,
            backgroundColor: block.color,
        };
    };

    return (
        <div style={gameFieldStyle()}>
            {
                blocks ? blocks.map((b) => <div style={blockStyle(b)} />) : null
            }
        </div>
    );
};

export default Main;
