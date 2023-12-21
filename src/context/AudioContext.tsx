import { ReactNode, createContext, useState } from "react";
import trackList from "../assets/trackList";
import type { ITrack } from '../types/Track';
import type { IAudioContext } from '../types/AudioContext';

const defaultTrack: ITrack = trackList[0];
const audio: HTMLAudioElement = new Audio(defaultTrack.src);

export const AudioContext = createContext<IAudioContext>({ audio: new Audio(), currentTrack: defaultTrack, isPlaying: false, handlePreviousAudio: () => {},  handleToggleAudio: () => {},  handleNextAudio: () => {}});

const AudioProvider = ({children}: {children: ReactNode}) => {
    const [currentTrack, setCurrentTrack] = useState<ITrack>(defaultTrack);
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const handleToggleAudio = (track: ITrack) => {
        if (currentTrack.id !== track.id) {
            setCurrentTrack(track)
            setIsPlaying(true)

            audio.src = track.src
            audio.currentTime = 0
            audio.play()

            return
        }

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play()
            setIsPlaying(true)
        }
    }

    const handlePreviousAudio = (track: ITrack) => {
        let previousTrackId:number
        if (track.id === 1) {
            previousTrackId = trackList.length
        } else {
            previousTrackId = track.id - 1
        }

        const previousTrack:ITrack = trackList.find((track) => track.id === previousTrackId)!
        setCurrentTrack(previousTrack)
        setIsPlaying(true)

        audio.src = previousTrack.src
        audio.currentTime = 0
        audio.play()

        return
    }

    const handleNextAudio = (track: ITrack) => {
        let nextTrackId:number
        if (track.id + 1 > trackList.length) {
            nextTrackId = 1
        } else {
            nextTrackId = track.id + 1
        }

        const nextTrack:ITrack = trackList.find((track) => track.id === nextTrackId)!
        setCurrentTrack(nextTrack)
        setIsPlaying(true)

        audio.src = nextTrack.src
        audio.currentTime = 0
        audio.play()

        return
    }

    const value:IAudioContext = {audio, currentTrack, isPlaying, handlePreviousAudio,  handleToggleAudio, handleNextAudio}

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export default AudioProvider