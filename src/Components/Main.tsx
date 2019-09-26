import { Howl } from "howler";
import React, { CSSProperties } from "react";
import { Bounce, HitBlock } from "../Constants/Base64Audio";
import { GameFieldBorderColor, GameTick } from "../Constants/Constants";
import { Walls } from "../Constants/WallConstants";
import { Ball } from "../Definitions/Ball";
import { GameObject } from "../Definitions/GameObject";
import { getGameDimensions } from "../GameDimensions";
import { getBounceAction, getUpdatedOjbect, overlaps } from "../Lib";
import { AppState } from "../State/AppState";
import { GameActions } from "../State/GameActions";
import { appState, appStore } from "../State/Store";

const gameDimensions = getGameDimensions();

/**
 * Main game component.
 */
export class Main extends React.Component<{}, AppState> {

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
     * The bounce sound.
     */
    private bounceSound!: Howl;

    /**
     * The sound when the ball hits a block
     */
    private hitBlockSound!: Howl;

    /**
     * Initializes the Main component.
     */
    constructor(props: object) {
        super(props);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.tick = this.tick.bind(this);
        this.onPlayAgain = this.onPlayAgain.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        // Sync the redux state with the component state.
        this.state = appState();
    }

    /**
     * Called when the component mounted.
     */
    public componentDidMount(): void {
        this.tickHandler = this.tickHandler = window.requestAnimationFrame(this.tick);

        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("click", this.onMouseClick);
        window.addEventListener("keyup", this.onKeyUp);

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

        this.bounceSound = new Howl({ src: ["data:audio/wav;base64," + Bounce] });
        this.hitBlockSound = new Howl({ src: ["data:audio/wav;base64," + HitBlock] });
    }

    /**
     * Called before the component unmounts.
     */
    public componentWillUnmount(): void {
        if (this.tickHandler) {
            window.cancelAnimationFrame(this.tickHandler);
        }

        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("click", this.onMouseClick);

        if (this.subscription) {
            this.subscription();
            delete this.subscription;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e.code === "KeyW") {
            appStore().dispatch({ type: GameActions.nextLevel });
        }
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

    private onMouseClick(): void {
        appStore().dispatch({ type: GameActions.resume });
        this.tickHandler = this.tickHandler = window.requestAnimationFrame(this.tick);
    }

    /**
     * Handles a play again click.
     */
    private onPlayAgain(): void {
        // Reset game state.
        appStore().dispatch({ type: GameActions.reset });
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

        if (this.state.gameState.gameMode !== "running") {
            return;
        }

        const diff = tick - this.tickStart;

        // Redraw at 60 fps.
        if (diff > GameTick) {
            const ball = appState().ball;
            const blocks = appState().blockState.blocks;
            const paddle = appState().paddle;

            if (blocks.length === 0) {
                appStore().dispatch({ type: GameActions.nextLevel });
            }

            const paddleHit = overlaps(ball, paddle);

            if (paddleHit) {
                const paddleBounceAction = getBounceAction(ball, paddle);
                appStore().dispatch({ type: paddleBounceAction, payload: paddle });

                this.playBounce();

            } else if (blocks) {

                const hitBlock = blocks.find((b) => overlaps(ball, b) && b.hit === false);
                if (hitBlock) {

                    this.playHitBlock();
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
                    this.playBounce();

                } else if (ball.left <= 0) {
                    // Hit the left wall
                    appStore().dispatch({ type: GameActions.ballBounceVertically, payload: Walls.leftWall });
                    this.playBounce();

                } else if (ball.left + ball.width >= gameDimensions.size) {
                    // Hit the right wall

                    appStore().dispatch({ type: GameActions.ballBounceVertically, payload: Walls.rightWall });
                    this.playBounce();
                } else if (ball.top + ball.width >= gameDimensions.size) {
                    // Hit bottom wall.
                    appStore().dispatch({ type: GameActions.gameLost });
                }
            }

            appStore().dispatch({ type: GameActions.tick });

            const updatedState = getUpdatedOjbect(appState(), this.state);
            if (updatedState) {
                this.setState(updatedState);
            }
            this.tickStart = tick;
        }

        this.tickHandler = window.requestAnimationFrame(this.tick);
    }
    private playHitBlock(): void {
        this.hitBlockSound.play();
    }

    private playBounce(): void {

        this.bounceSound.play();
    }

    /**
     * Returns the styling for the game field.
     * @returns {CSSProperties}. CSSProperties for the gamefield.
     */
    private gameFieldStyle(): CSSProperties | undefined {

        return {
            position: "absolute",
            left: getGameDimensions().left,
            top: getGameDimensions().top,
            width: getGameDimensions().size,
            height: getGameDimensions().size,
            borderColor: GameFieldBorderColor,
            borderStyle: "solid",
            display: "flex",
            justifyContent: "center"
        };
    }

    /**
     * Game score style
     * @returns {CSSProperties}. A style that will draw a rectangle above the game field.
     */
    private gameScorebarStyle(): CSSProperties {
        return {
            position: "absolute",
            left: getGameDimensions().left,
            width: getGameDimensions().size,
            top: getGameDimensions().top - 25,
            height: 22,
            borderColor: GameFieldBorderColor,
            borderStyle: "solid",
            display: "flex",
            flexDirection: "row",
        };
    }

    /**
     * Returns css properties for positioning a shape.
     * @param {ScreenObject} shape. A shape object.
     * @returns {CSSProperties}. CSS properties for a shape.
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
        newPosition.backgroundImage = ball.color;
        return newPosition;
    }

    /**
     * Renders the component.
     */
    public render(): React.ReactNode {
        return (
            <div>
                <div style={this.gameScorebarStyle()} >
                    <div key={1} style={{ color: "white", justifyContent: "center", marginLeft: "10px" }}>Level: {this.state.gameState.level}</div>>
                    <div key={2} style={{ color: "white", justifyContent: "center" }}>Score: {this.state.gameState.score}</div>>
                </div>
                <>
                    {
                        this.state.blockState && this.state.paddle && this.state.ball ?
                            <div style={this.gameFieldStyle()}>
                                {
                                    this.state.blockState.blocks.map((b, index) => <div key={index} style={this.positionStyle(b)} />)
                                }
                                <div style={this.positionStyle(this.state.paddle)} />
                                <div style={this.ballStyle(this.state.ball)} />
                                {
                                    this.state.gameState.gameMode === "ended" ?
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                            <p style={{ alignSelf: "center", color: "white" }}>Game over</p>
                                            <button onClick={this.onPlayAgain} style={{ alignSelf: "center" }}>Play again</button>
                                        </div> :
                                        this.state.gameState.gameMode === "paused" ?
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <p style={{ alignSelf: "center", color: "white" }}>Click the left mouse button to start the game</p>
                                            </div> : null
                        }

                            </div> : null
                    }
                </>
            </div>
        );
    }
}

export default Main;
