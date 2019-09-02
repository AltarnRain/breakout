import React, { CSSProperties } from "react";
import { Ball, Shape } from "../State/AppState";
import { GameActions } from "../State/GameActions";
import { appState, appStore } from "../Store";

export class Main extends React.Component {
    private tickHandler?: number;
    private tickStart?: number;
    private fps: number = 0;

    /**
     *
     */
    constructor(props: object) {
        super(props);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.tick = this.tick.bind(this);
    }

    private onMouseMove(e: React.MouseEvent): void {
        if (e) {
            const gameDimensions = appState().gameDimensions;
            if (gameDimensions) {
                const x = e.clientX - gameDimensions.left;
                appStore().dispatch({ type: GameActions.paddleMove, payload: x });
            }
        }
    }

    public tick(tick: number): void {
        if (!this.tickStart) {
            this.tickStart = tick;
        }

        const diff = tick - this.tickStart;

        // Redraw at 60 fps.
        if (diff > (1000 / 60)) {
            this.forceUpdate();
            this.tickHandler = window.requestAnimationFrame(this.tick);
        } else {
            this.tickHandler = window.requestAnimationFrame(this.tick);
        }
    }

    public componentDidMount(): void {
        this.tickHandler = window.requestAnimationFrame(this.tick);
    }

    private gameFieldStyle(): CSSProperties | undefined {
        const gameDimensions = appState().gameDimensions;
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
    }

    private positionStyle(block: Shape): CSSProperties {
        return {
            position: "absolute",
            left: block.left,
            top: block.top,
            height: block.height,
            width: block.width,
            backgroundColor: block.color,
        };
    }

    private ballStyle(ball: Ball): CSSProperties {
        const newPosition = this.positionStyle(ball);
        newPosition.borderRadius = "50%";

        return newPosition;
    }

    public render() {
        const blocks = appState().blocks ? appState().blocks : undefined;
        const paddle = appState().paddle ? appState().paddle : undefined;
        const ball = appState().ball ? appState().ball : undefined;

        return (
            <div style={this.gameFieldStyle()} onMouseMove={this.onMouseMove} >
                {
                    blocks ? blocks.map((b, index) => <div key={index} style={this.positionStyle(b)} />) : null
                }
                {
                    paddle ? <div style={this.positionStyle(paddle)} /> : null
                }
                {
                    ball ? <div style={this.ballStyle(ball)} /> : null
                }
            </div>
        );
    }
}

export default Main;
