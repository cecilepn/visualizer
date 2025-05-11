import { useState } from 'react'
import Track from '../Track/Track'
import useStore from '../../utils/store'
import fetchJsonp from 'fetch-jsonp'
import s from './Tracks.module.scss'
import NowPlaying from '../NowPlaying/NowPlaying'

const Tracks = () => {
  const [showTracks, setShowTracks] = useState(false)
  const { tracks, setTracks } = useStore()

  const onKeyDown = e => {
    if (e.keyCode === 13 && e.target.value !== '') {
      const userInput = e.target.value
      getSongs(userInput)
    }
  }

  const getSongs = async userInput => {
    let response = await fetchJsonp(
      `https://api.deezer.com/search?q=${userInput}&output=jsonp`
    )

    if (response.ok) {
      response = await response.json()
      const _tracks = [...tracks]
      response.data.forEach(result => {
        _tracks.push(result)
      })
      setTracks(_tracks)
    } else {
      // Handle errors
      console.error('Error fetching songs from the API')
    }
  }

  return (
    <>
      <NowPlaying />
      <div
        className={s.toggleTracks}
        onClick={() => setShowTracks(!showTracks)}>
        tracklist
      </div>

      <section
        className={`
      ${s.wrapper}
      ${showTracks ? s.wrapper_visible : ''}`}>
        <div className={s.tracks}>
          <div className={s.header}>
            <span className={s.order}>#</span>
            <span className={s.title}>Title</span>
            <span className={s.artist}>Artist</span>
            <span className={s.duration}>Duration</span>
          </div>

          {tracks.map((track, i) => (
            <Track
              key={track.title + i}
              title={track.title}
              duration={track.duration}
              cover={track.album.cover_xl}
              artist={track.artist.name}
              src={track.preview}
              index={i}
              onSelectTrack={() => setShowTracks(false)}
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Search for an artist or a track..."
          className={s.searchInput}
          onKeyDown={onKeyDown}
        />
      </section>
    </>
  )
}

export default Tracks
