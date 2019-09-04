import React, { CSSProperties } from "react";
import { gameTick } from "./Constants";
import { Ball, Shape } from "./State/AppState";
import { GameActions } from "./State/GameActions";
import { appState, appStore } from "./Store";
import { overlaps } from "./Lib";

export class Main extends React.Component {
    private tickHandler?: number;
    private tickStart?: number;

    constructor(props: object) {
        super(props);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.tick = this.tick.bind(this);
    }

    private onMouseMove(e: MouseEvent): void {
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
        if (diff > gameTick) {

            const ball = appState().ball;
            const blocks = appState().blocks;
            const paddle = appState().paddle;

            if (blocks) {
                const hitBlock = blocks.find((b) => overlaps(b, ball));

                if (hitBlock) {
                    appStore().dispatch({ type: GameActions.hitBlock, payload: hitBlock });
                    appStore().dispatch({ type: GameActions.ballBounce, payload: undefined });
                }
            }

            const paddleHit = overlaps(paddle, ball);
            if (paddleHit) {
                appStore().dispatch({ type: GameActions.ballBounce, payload: undefined });
            }

            const gameDimensions = appState().gameDimensions;
            if (gameDimensions) {
                const hitWall = ball.top < 0 ||
                ball.left < 0 ||
                ball.left > gameDimensions.size;

                if (hitWall) {
                    appStore().dispatch({ type: GameActions.ballBounce, payload: undefined });
                }
            }

            this.forceUpdate();
            appStore().dispatch({ type: GameActions.Tick, payload: diff });
            this.tickStart = tick;
        } else {
            appStore().dispatch({ type: GameActions.Tick, payload: diff });
        }

        this.tickHandler = window.requestAnimationFrame(this.tick);
    }

    public componentDidMount(): void {
        this.tickHandler = window.requestAnimationFrame(this.tick);

        window.addEventListener("mousemove", this.onMouseMove);
    }

    public componentWillUnmount(): void {
        if (this.tickHandler) {
            window.cancelAnimationFrame(this.tickHandler);
        }
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
            <div style={this.gameFieldStyle()}>
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
