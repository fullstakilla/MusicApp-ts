import styles from './track.module.scss'
import { IconButton } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import secondsToMMSS from '../../utils/secondsToMMSS'
import { useContext } from 'react'
import { AudioContext } from '../../context/AudioContext'
import cn from 'classnames'
import type { ITrack } from '../../types/Track';
import type { IAudioContext } from '../../types/AudioContext';

const Track = (track : ITrack) => {
    const {preview, duration, title, artists} = track
    const { handleToggleAudio, currentTrack, isPlaying } = useContext<IAudioContext>(AudioContext)
    const formatedDuration:string = secondsToMMSS(duration)

    const isCurrentTrack:boolean = currentTrack.id === track.id

    return (
        <div className={cn(styles.track, isCurrentTrack && styles.playing)}>
            <div className={styles.left}>
                <IconButton onClick={() => handleToggleAudio(track)}>
                    {isCurrentTrack && isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <img className={styles.preview} src={preview} alt="" />
                <div className={styles.credits}>
                    <b>{title}</b>
                    <p>{artists}</p>
                </div>
            </div>
            <p>{formatedDuration}</p>
        </div>
    )
}

export default Track