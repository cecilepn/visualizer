import audioController from '../../utils/AudioController'
import scene from '../../webgl/Scene'
import s from './Track.module.scss'
import { getSongInfos } from '../../utils/getSongInfos'
import useStore from '../../utils/store'
// import QueueBtn from '../QueueBtn/QueueBtn'

const Track = ({
  title,
  cover,
  src,
  duration,
  artist,
  index,
  onSelectTrack
}) => {
  const setCurrentTrack = useStore(state => state.setCurrentTrack)
  const currentTrack = useStore(state => state.currentTrack)
  const setIsPlaying = useStore(state => state.setIsPlaying)
  const isActive = currentTrack?.index === index

  const formatDuration = () => {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const handleClick = async () => {
    try {
      const track = { title, cover, src, duration, artist, index }

      setCurrentTrack(track)
      setIsPlaying(true)
      audioController.play(src)
      scene.cover.setCover(cover)

      const genre = await getSongInfos(title, artist)
      scene.setCharacterGenre(genre)

      if (onSelectTrack) onSelectTrack()
    } catch (error) {
      console.error('Erreur lors du traitement du morceau :', error)
    }
  }

  return (
    <div
      className={`${s.track} ${isActive ? s.active : ''}`}
      onClick={handleClick}>
      <span className={s.order}>{index + 1}</span>

      <div className={s.title}>
        <img src={cover} alt={`Cover of ${title}`} className={s.cover} />
        <div className={s.details}>
          <span className={s.trackName}>{title}</span>
        </div>
      </div>

      <span className={s.artistName}>{artist}</span>
      <span className={s.duration}>{formatDuration()}</span>

      {/* <QueueBtn track={{ title, cover, src, duration, artist, index }} /> */}
    </div>
  )
}

export default Track
