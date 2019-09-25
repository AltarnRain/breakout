import React, { CSSProperties } from "react";
import { GameTick } from "./Constants";
import { Ball } from "./Definitions/Ball";
import { GameObject } from "./Definitions/GameObject";
import { getGameDimensions } from "./GameDimensions";
import { getBounceAction, overlaps } from "./Lib";
import { AppState } from "./State/AppState";
import { GameActions } from "./State/GameActions";
import { appState, appStore } from "./State/Store";
import { Walls } from "./WallConstants";

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
     * Initializes the Main component.
     */
    constructor(props: object) {
        super(props);

        this.onMouseMove = this.onMouseMove.bind(this);
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

            if (applicationState.gameDimensions !== this.state.gameDimensions) {
                this.setState(applicationState.gameDimensions);

                this.syncStateWithRedux();
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
        window.removeEventListener("mousemove", this.onMouseMove);

        if (this.subscription) {
            this.subscription();
            delete this.subscription;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e.code === "KeyW") {
            appStore().dispatch({type: GameActions.nextLevel});
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

        if (this.state.gameState.gameMode === "ended") {
            return;
        }

        const diff = tick - this.tickStart;

        // Redraw at 60 fps.
        if (diff > GameTick) {
            const ball = appState().ball;
            const blocks = appState().blocks;
            const paddle = appState().paddle;

            if (blocks.length === 0) {
                appStore().dispatch({ type: GameActions.nextLevel });
            }

            const paddleHit = overlaps(ball, paddle);

            if (paddleHit) {
                const paddleBounceAction = getBounceAction(ball, paddle);
                appStore().dispatch({ type: paddleBounceAction, payload: paddle });
            } else if (blocks) {

                const hitBlock = blocks.find((b) => overlaps(ball, b) && b.hit === false);
                if (hitBlock) {
                    appStore().dispatch({ type: GameActions.hitBlock, payload: { hitBlock }});

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

            appStore().dispatch({ type: GameActions.tick });

            this.syncStateWithRedux();
            this.tickStart = tick;
        }

        this.tickHandler = window.requestAnimationFrame(this.tick);
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
            borderColor: "white",
            borderStyle: "solid",
            display: "flex",
            justifyContent: "center"
        };
    }

    private gameScorebarStyle(): CSSProperties {
        return {
            position: "absolute",
            left: getGameDimensions().left,
            width: getGameDimensions().size,
            top: getGameDimensions().top - 25,
            height: 22,
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
     * Syncs this components state with the redux state.
     */
    private syncStateWithRedux(): void {
        const applicationState = appState();

        // Start with an empty 'state' object.
        // This component's state is the same definitation as the application state in redux
        const state: AppState = {} as AppState;

        Object.keys(applicationState).forEach((key: string) => {

            // Get the objects using the key values from the application state.
            const componentStateProperty = this.state[key];
            const applicationStatProperty = applicationState[key];

            // Check if the objects have the same reference, if not expand the state object
            if (componentStateProperty !== applicationStatProperty) {
                state[key] = applicationStatProperty;
            }
        });

        // The state object has keys meaning it was expected. SetState and let React figure out
        // the rest.
        if (Object.keys(state).length > 0) {
            this.setState(state);
        }
    }

    /**
     * Renders the component.
     */
    public render(): React.ReactNode {
        return (
            <div>
                <div style={this.gameScorebarStyle()}>
                    <div key={1} style={{ color: "white", justifyContent: "center", marginLeft: "10px" }}>Level: {this.state.gameState.level}</div>>
                <div key={2} style={{ color: "white", justifyContent: "center" }}>Score: {this.state.gameState.score}</div>>
            </div>
                <div>
                    {
                        this.state.blocks && this.state.paddle && this.state.ball ?
                            <div style={this.gameFieldStyle()}>
                                {
                                    this.state.blocks.map((b, index) => <div key={index} style={this.positionStyle(b)} />)
                                }
                                <div style={this.positionStyle(this.state.paddle)} />
                                <div style={this.ballStyle(this.state.ball)} />
                                {
                                    this.state.gameState.gameMode === "ended" ?
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                            <p style={{ alignSelf: "center", color: "white" }}>Game over</p>
                                            <button onClick={this.onPlayAgain} style={{ alignSelf: "center" }}>Play again</button>
                                        </div>
                                        : null
                                }

                            </div> : null
                    }
                </div>
            </div>
        );
    }
}

export default Main;
