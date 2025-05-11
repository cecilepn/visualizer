import audioController from '../../utils/AudioController'
import scene from '../../webgl/Scene'
import s from './Track.module.scss'
import { getSongInfos } from '../../utils/getSongInfos'
import useStore from '../../utils/store'
import QueueBtn from '../QueueBtn/queueBtn'

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

  const getSeconds = () => {
    const minutes = Math.floor(duration / 60)
    let seconds = Math.round(duration - minutes * 60)

    if (seconds < 10) {
      seconds = '0' + seconds
    }

    return minutes + ':' + seconds
  }

  const currentTrack = useStore(state => state.currentTrack)
  const setIsPlaying = useStore(state => state.setIsPlaying)
  const isActive = currentTrack?.index === index

  const addToQueue = useStore(state => state.addToQueue)

  const onAddToQueue = e => {
    addToQueue({
      title,
      cover,
      src,
      duration,
      artist,
      index
    })
  }

  const onClick = async () => {
    try {
      setCurrentTrack({
        title,
        cover,
        src,
        duration,
        artist,
        index
      })
      setIsPlaying(true)
      audioController.play(src)
      scene.cover.setCover(cover)
      const genre = await getSongInfos(title, artist)
      scene.setCharacterGenre(genre)

      onSelectTrack?.()
    } catch (error) {
      console.error('Erreur lors du traitement du morceau :', error)
    }
  }

  return (
    <div className={`${s.track} ${isActive ? s.active : ''}`} onClick={onClick}>
      <span className={s.order}>{index + 1}</span>
      <div className={s.title}>
        <img src={cover} alt="" className={s.cover} />
        <div className={s.details}>
          <span className={s.trackName}>{title}</span>
        </div>
      </div>
      <span className={s.artistName}>{artist}</span>
      <span className={s.duration}>{getSeconds()}</span>
      <QueueBtn track={{ title, cover, src, duration, artist, index }} />
    </div>
  )
}

export default Track
