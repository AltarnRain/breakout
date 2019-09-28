export interface SoundState {
    /**
     * Contains the hit block sound
     */
    hitBlock: Howl;

    /**
     * Contains the bounce sound.
     */
    bounce: Howl;

    /**
     * Play sounds
     */
    sounds: boolean;
}