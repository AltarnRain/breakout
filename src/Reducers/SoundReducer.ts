import { Howl } from "howler";
import { Action } from "redux";
import { Bounce, HitBlock } from "../Constants/Base64Audio";
import { SoundState } from "../State/Definition/SoundState";
import { GameActions } from "../State/GameActions";

export const soundReducer = (state: SoundState = getNewState(), action: Action): SoundState => {
    switch (action.type) {
        case GameActions.hitBlock:
            state.hitBlock.play();
            break;
        case GameActions.ballBounceHorizantally:
        case GameActions.ballBounceVertically:
            state.bounce.play();
            break;
    }

    return state;
};

const getNewState = (): SoundState => {
    const bounceSound = new Howl({ src: ["data:audio/wav;base64," + Bounce] });
    const hitBlockSound = new Howl({ src: ["data:audio/wav;base64," + HitBlock] });

    return {
        bounce: bounceSound,
        hitBlock: hitBlockSound
    };
};