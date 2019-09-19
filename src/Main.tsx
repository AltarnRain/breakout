import React, { CSSProperties } from "react";
import { GameTick } from "./Constants";
import { Ball } from "./Definitions/Ball";
import { GameObject } from "./Definitions/GameObject";
import { getGameDimensions } from "./GameDimensions";
import { getBounceAction, overlaps } from "./Lib";
import { State } from "./State";
import { GameActions } from "./State/GameActions";
import { appState, appStore } from "./Store";
import { Walls } from "./WallConstants";
import { whileStatement } from "@babel/types";

const gameDimensions = getGameDimensions();

/**
 * Main game component.
 */
export class Main extends React.Component<{}, State> {

    /**
     * Stores a reference to the animation that draws the game.
     */
    private tickHandler?: number;

    /**
     * Used to store the beginning of a game tick.
     */
    private tickStart?: number;

    /**
     * Refux subscription
     */
    private subscription?: () => void;

    /**
     * Initializes the Main component.
     */
    constructor(props: object) {
        super(props);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.tick = this.tick.bind(this);
        this.onPlayAgain = this.onPlayAgain.bind(this);

        this.state = { gameState: { gameMode: "running", level: 1, score: 0 } };
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
     * Handles a play again click.
     */
    private onPlayAgain(): void {
        // Reset game state.

        appStore().dispatch({ type: GameActions.initialize });
        this.tickHandler = this.tickHandler = window.requestAnimationFrame(this.tick);
    }

    /**
     * Handles a game tick.
     * @param {number} tick. Current tick count.
     */
    public tick(tick: number): void {

        if (!this.tickStart) {
            this.tickStart = tick;
        }

        if (appState().gameState.gameMode === "ended") {
            return;
        }

        const diff = tick - this.tickStart;

        const ball = appState().ball;
        const blocks = appState().blocks;
        const paddle = appState().paddle;

        const paddleHit = overlaps(ball, paddle);

        if (paddleHit) {
            const paddleBounceAction = getBounceAction(ball, paddle);
            appStore().dispatch({ type: paddleBounceAction, payload: paddle });
        } else if (blocks) {

            const hitBlock = blocks.find((b) => overlaps(ball, b));
            if (hitBlock) {
                appStore().dispatch({ type: GameActions.hitBlock, payload: hitBlock });

                const action = getBounceAction(ball, hitBlock);

                if (typeof (action) !== "undefined") {
                    appStore().dispatch({ type: action, payload: hitBlock });
                }

            } else if (ball.top <= 0) {
                // The ball's top and left are inside the game field.
                // Use the game dimension object to store a wall hit.
                // Hit the top  wall
                appStore().dispatch({ type: GameActions.ballBounceHorizantally, payload: Walls.topWall });

            } else if (ball.left <= 0) {
                // Hit the left wall
                appStore().dispatch({ type: GameActions.ballBounceVertically, payload: Walls.leftWall });

            } else if (ball.left + ball.width >= gameDimensions.size) {
                // Hit the right wall

                appStore().dispatch({ type: GameActions.ballBounceVertically, payload: Walls.rightWall });
            } else if (ball.top + ball.width >= gameDimensions.size) {
                // Hit bottom wall.
                appStore().dispatch({ type: GameActions.gameLost });
            }
        }

        appStore().dispatch({ type: GameActions.tick, payload: diff });

        // Redraw at 60 fps.
        if (diff > GameTick) {
            this.setState({ ball: appState().ball, blocks: appState().blocks, paddle: appState().paddle });
            this.tickStart = tick;
        }

        this.tickHandler = window.requestAnimationFrame(this.tick);
    }

    /**
     * Called when the component mounted.
     */
    public componentDidMount(): void {

        appStore().dispatch({ type: GameActions.initialize });
        this.tickHandler = this.tickHandler = window.requestAnimationFrame(this.tick);

        window.addEventListener("mousemove", this.onMouseMove);

        this.subscription = appStore().subscribe(() => {
            const applicationState = appState();

            if (applicationState.gameState !== this.state.gameState) {
                this.setState({ gameState: applicationState.gameState });

                if (applicationState.gameState.gameMode === "ended") {
                    if (this.tickHandler) {
                        window.cancelAnimationFrame(this.tickHandler);
                    }
                }
            }
        });
    }

    /**
     * Called before the component unmounts.
     */
    public componentWillUnmount(): void {
        if (this.tickHandler) {
            window.cancelAnimationFrame(this.tickHandler);
        }

        window.removeEventListener("mousemove", this.onMouseMove);

        if (this.subscription) {
            this.subscription();
            delete this.subscription;
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
            borderStyle: "solid",
            display: "flex",
            justifyContent: "center"
        };
    }

    private gameScorebarStyle(): CSSProperties {
        return {
            position: "absolute",
            left: gameDimensions.left,
            width: gameDimensions.size,
            top: gameDimensions.top - 22,
            height: 25,
            borderColor: "white",
            borderStyle: "solid",
            display: "flex",
            flexDirection: "row",
        };
    }

    /**
     * Returns css properties for positioning a shape.
     * @param {ScreenObject} shape. A shape object.
     * @returns {CSSProperties}.
     */
    private positionStyle(shape: GameObject): CSSProperties {
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
    public render(): React.ReactNode[] {
        return [
            <div style={this.gameScorebarStyle()}>
                <div style={{color : "white", justifyContent: "center", marginLeft: "10px"}}>Level: {this.state.gameState.level}</div>>
                <div style={{color : "white", justifyContent: "center"}}>Score: {this.state.gameState.score}</div>>
            </div>,
            <div style={this.gameFieldStyle()}>
                {
                    this.state.blocks ? this.state.blocks.map((b, index) => <div key={index} style={this.positionStyle(b)} />) : null
                }
                {
                    this.state.paddle ? <div style={this.positionStyle(this.state.paddle)} /> : null
                }
                {
                    this.state.ball ? <div style={this.ballStyle(this.state.ball)} /> : null
                }
                {
                    this.state.gameState.gameMode === "ended" ?
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p style={{ alignSelf: "center", color: "white" }}>Game over</p>
                            <button onClick={this.onPlayAgain} style={{ alignSelf: "center" }}>Play again</button>
                        </div>
                        : null
                }
            </div>
        ];
    }
}

export default Main;
