import type { ITrack } from './Track'

export interface IAudioContext {
    audio: HTMLAudioElement;
    currentTrack: ITrack;
    isPlaying: boolean;
    handlePreviousAudio: (track: ITrack) => void;
    handleToggleAudio: (track: ITrack) => void;
    handleNextAudio: (track: ITrack) => void;
}