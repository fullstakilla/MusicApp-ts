import { useContext, useState, useEffect } from "react"
import { AudioContext } from "../../context/AudioContext"
import styles from './playbar.module.scss'
import { Slider, IconButton } from "@mui/material"
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material'
import secondsToMMSS from "../../utils/secondsToMMSS"
import type { ITrack } from '../../types/Track';
import type { IAudioContext } from '../../types/AudioContext';
import { useMediaQuery } from 'react-responsive';

const TimeControls = () => {
    const { audio, currentTrack } = useContext<IAudioContext>(AudioContext)
    const { duration }: ITrack = currentTrack
    const [currentTime, setCurrentTime] = useState<number>(0)
    const formatedCurrentTime:string = secondsToMMSS(currentTime)

    const handleChangeCurrentTime = (_:Event, value:number | number[]) => {
        if (typeof value === 'number') {
            setCurrentTime(value);
            audio.currentTime = value;
        }
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime)
        }, 1000)

        return () => {
            clearInterval(timeInterval)
        }
    }, [])

    return (
        <>
            <p>{formatedCurrentTime}</p>
            <Slider
                step={1}
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleChangeCurrentTime}
            />
        </>
    )
}

const Playbar = () => {
    const { currentTrack, isPlaying, handlePreviousAudio, handleToggleAudio, handleNextAudio } = useContext<IAudioContext>(AudioContext)
    const { title, artists, preview, duration }: ITrack = currentTrack
    const formatedDuration:string = secondsToMMSS(duration)

    const is850px = useMediaQuery({ maxWidth: 850 });

    return (
        <div className={styles.playbar}>
            <IconButton onClick={() => handlePreviousAudio(currentTrack)}>
                <SkipPrevious />
            </IconButton>
            <IconButton onClick={() => handleToggleAudio(currentTrack)}>
                {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={() => handleNextAudio(currentTrack)}>
                <SkipNext />
            </IconButton>
            {is850px
                ? <></> 
                : <>
                    <img className={styles.preview} src={preview} alt="" />
                    <div className={styles.credits}>
                        <h4>{title}</h4>
                        <p>{artists}</p>
                    </div>
                </>}
            <div className={styles.slider}>
                <TimeControls />
                <p>{formatedDuration}</p>
            </div>
        </div>
    )
}

export default Playbar