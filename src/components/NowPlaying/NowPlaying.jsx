import useStore from '../../utils/store'
import s from './NowPlaying.module.scss'
import audioController from '../../utils/AudioController'
import { Play, Pause } from 'lucide-react'

const NowPlaying = () => {
  const currentTrack = useStore(state => state.currentTrack)
  const isPlaying = useStore(state => state.isPlaying)
  const setIsPlaying = useStore(state => state.setIsPlaying)

  if (!currentTrack) return null

  const togglePlay = () => {
    if (isPlaying) {
      audioController.pause()
      setIsPlaying(false)
    } else {
      audioController.resume()
      setIsPlaying(true)
    }
  }

  return (
    <div className={s.nowPlaying}>
      <div className={s.container}>
        <img src={currentTrack.cover} alt="" className={s.cover} />
        <div className={s.info}>
          <div className={s.title}>{currentTrack.title}</div>
          <div className={s.artist}>{currentTrack.artist}</div>
        </div>
      </div>
      <button className={s.playPause} onClick={togglePlay}>
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  )
}

export default NowPlaying
