import React, { CSSProperties } from "react";
import { GameTick } from "./Constants";
import { getGameDimensions } from "./GameDimensions";
import { getBounceAction, overlaps } from "./Lib";
import { Ball, Shape } from "./State/AppState";
import { GameActions } from "./State/GameActions";
import { appState, appStore } from "./Store";
import { Walls } from "./WallConstants";

const gameDimensions = getGameDimensions();

/**
 * Main game component.
 */
export class Main extends React.Component {

    /**
     * Stores a reference to the animation that draws the game.
     */
    private tickHandler?: number;

    /**
     * Used to store the beginning of a game tick.
     */
    private tickStart?: number;

    /**
     * Initializes the Main component.
     */
    constructor(props: object) {
        super(props);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.tick = this.tick.bind(this);
    }

    /**
     * Handles mouse movement. Used to move the paddle.
     * @param {MouseEvent} e. MouseEvent.
     */
    private onMouseMove(e: MouseEvent): void {
        if (e) {
            const x = e.clientX - gameDimensions.left;
            appStore().dispatch({ type: GameActions.paddleMove, payload: x });
        }
    }

    /**
     * Handles a game tick.
     * @param {number} tick. Current tick count.
     */
    public tick(tick: number): void {

        if (!this.tickStart) {
            this.tickStart = tick;
        }

        const diff = tick - this.tickStart;

        // Redraw at 60 fps.
        if (diff > GameTick) {

            const ball = appState().ball;
            const blocks = appState().blocks;
            const paddle = appState().paddle;

            const paddleHit = overlaps(paddle, ball);

            if (paddleHit) {
                const action = getBounceAction(ball, paddle);

                if (typeof (action) !== "undefined") {
                    appStore().dispatch({ type: action, payload: paddle });
                }
            } else if (blocks) {
                const hitBlock = blocks.find((b) => overlaps(b, ball));

                if (hitBlock) {
                    appStore().dispatch({ type: GameActions.hitBlock, payload: hitBlock });

                    const action = getBounceAction(ball, hitBlock);

                    if (typeof (action) !== "undefined") {
                        appStore().dispatch({ type: action, payload: hitBlock });
                    }
                }
            }

            // The ball's top and left are inside the game field.
            // Use the game dimension object to store a wall hit.
            if (ball.top <= 0) {
                // Hit the top  wall
                appStore().dispatch({ type: GameActions.ballBounceHorizantally, payload: Walls.topWall });

            } else if (ball.left <= 0) {
                // Hit the left wall
                appStore().dispatch({ type: GameActions.ballBounceVertically, payload: Walls.leftWall });

            } else if (ball.top + ball.width >= gameDimensions.size) {
                // Hit bottom wall.

                appStore().dispatch({ type: GameActions.ballBounceHorizantally, payload: Walls.bottomWall });

            } else if (ball.left + ball.width >= gameDimensions.size) {
                // Hit the right wall

                appStore().dispatch({ type: GameActions.ballBounceVertically, payload: Walls.rightWall });
            }



            this.forceUpdate();
            appStore().dispatch({ type: GameActions.Tick, payload: diff });
            this.tickStart = tick;
        } else {
            appStore().dispatch({ type: GameActions.Tick, payload: diff });
        }

        this.tickHandler = window.requestAnimationFrame(this.tick);
    }

    /**
     * Called when the component mounted.
     */
    public componentDidMount(): void {
        this.tickHandler = window.requestAnimationFrame(this.tick);

        window.addEventListener("mousemove", this.onMouseMove);
    }

    /**
     * Called before the component unmounts.
     */
    public componentWillUnmount(): void {
        if (this.tickHandler) {
            window.cancelAnimationFrame(this.tickHandler);
        }
    }

    /**
     * Returns the styling for the game field.
     * @returns {CSSProperties}. CSSProperties for the gamefield.
     */
    private gameFieldStyle(): CSSProperties | undefined {

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

    /**
     * Returns css properties for positioning a shape.
     * @param {Shape} shape. A shape object.
     * @returns {CSSProperties}.
     */
    private positionStyle(shape: Shape): CSSProperties {
        return {
            position: "absolute",
            left: shape.left,
            top: shape.top,
            height: shape.height,
            width: shape.width,
            backgroundColor: shape.color,
        };
    }

    /**
     * Returns css properties for positioning and drawing the ball.
     * @param {Ball} ball.
     * @returns {CSSProperties}.
     */
    private ballStyle(ball: Ball): CSSProperties {
        const newPosition = this.positionStyle(ball);
        newPosition.borderRadius = "50%";

        return newPosition;
    }

    /**
     * Renders the component.
     */
    public render(): React.ReactNode {
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
