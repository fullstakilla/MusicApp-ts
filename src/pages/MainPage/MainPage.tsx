import { useState } from 'react'
import trackList from '../../assets/trackList'
import Track from '../../components/Track/Track'
import styles from './mainPage.module.scss'
import { Input } from '@mui/material'
import type { ITrack } from '../../types/Track';

const runSearch = (query:string) => {
    if (!query) return trackList

    const lowerCaseQuery:string = query.toLowerCase()

    return trackList.filter((track) =>
        track.title.toLowerCase().includes(lowerCaseQuery) ||
        track.artists.toLowerCase().includes(lowerCaseQuery))
}

const MainPage = () => {
    const [tracks, setTracks] = useState<ITrack[]>(trackList)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const foundTracks: ITrack[] | null = runSearch(event.target.value)
        setTracks(foundTracks)
    }

    return (
        <div className={styles.container}>
            <Input className={styles.input} placeholder='Поиск треков' onChange={handleChange}/>
            <div className={styles.list}>
                {tracks.length
                    ? tracks.map((track) => (
                        <Track key={track.id} {...track} />
                    ))
                    : <span style={{textAlign: 'center'}}>Ничего не найдено!</span>}
            </div>
        </div>
    )
}

export default MainPage