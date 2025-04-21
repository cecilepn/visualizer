import audioController from '../../utils/AudioController'
import scene from '../../webgl/Scene'
import { detectGenreWithAPI } from '../../utils/detectGenreWithAPI'
import s from './Track.module.scss'

const Track = ({ title, cover, src, duration, artist, index }) => {
  const getSeconds = () => {
    const minutes = Math.floor(duration / 60)
    let seconds = Math.round(duration - minutes * 60)

    if (seconds < 10) {
      seconds = '0' + seconds
    }

    return minutes + ':' + seconds
  }

  const onClick = async () => {
    try {
      const response = await fetch(src)
      const blob = await response.blob()
      const genre = await detectGenreWithAPI(blob)

      audioController.play(src)
      scene.cover.setCover(cover)
      scene.setCharacterGenre(genre)
    } catch (error) {
      console.error('Erreur lors du traitement du morceau :', error)
    }
  }

  return (
    <div className={s.track} onClick={onClick}>
      <span className={s.order}>{index + 1}</span>
      <div className={s.title}>
        <img src={cover} alt="" className={s.cover} />
        <div className={s.details}>
          <span className={s.trackName}>{title}</span>
        </div>
      </div>
      <span className={s.duration}>{getSeconds()}</span>
    </div>
  )
}

export default Track
