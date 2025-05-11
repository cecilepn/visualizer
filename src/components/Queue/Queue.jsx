import { useState } from 'react'
import useStore from '../../utils/store'
import audioController from '../../utils/AudioController'
import scene from '../../webgl/Scene'
import { getSongInfos } from '../../utils/getSongInfos'
import s from './Queue.module.scss'
import { ChevronDown, ChevronUp } from 'lucide-react'

const Queue = () => {
  const queue = useStore(state => state.queue)
  const removeFromQueue = useStore(state => state.removeFromQueue)
  const setCurrentTrack = useStore(state => state.setCurrentTrack)
  const setIsPlaying = useStore(state => state.setIsPlaying)
  const currentTrack = useStore(state => state.currentTrack)

  const [isOpen, setIsOpen] = useState(false)

  const toggleQueue = () => setIsOpen(prev => !prev)

  const handleRemove = index => {
    removeFromQueue(index)
  }

  const handlePlayTrack = async track => {
    try {
      setCurrentTrack(track)
      setIsPlaying(true)
      audioController.play(track.src)
      scene.cover.setCover(track.cover)

      const genre = await getSongInfos(track.title, track.artist)
      scene.setCharacterGenre(genre)
    } catch (error) {
      console.error(
        'Erreur lors de la lecture de la piste depuis la file :',
        error
      )
    }
  }

  return (
    <div className={s.queueContainer}>
      <div className={s.header} onClick={toggleQueue}>
        {queue.length === 0 ? <p></p> : <p>Next songs</p>}
        {isOpen ? (
          <ChevronUp size={20} className={s.arrowIcon} />
        ) : (
          <ChevronDown size={20} className={s.arrowIcon} />
        )}
      </div>

      {isOpen && (
        <div className={s.queueList}>
          {queue.length === 0 ? (
            <p>No tracks in the queue</p>
          ) : (
            queue.map((track, index) => {
              const isActive = currentTrack?.index === track.index

              return (
                <div
                  key={index}
                  className={`${s.track} ${isActive ? s.active : ''}`}
                  onClick={() => handlePlayTrack(track)}>
                  <div className={s.trackContent}>
                    <img
                      src={track.cover}
                      alt={`Cover of ${track.title}`}
                      className={s.cover}
                    />
                    <div className={s.trackInfo}>
                      <span className={s.title}>{track.title}</span>
                      <span className={s.artist}>{track.artist}</span>
                    </div>
                  </div>
                  <button
                    className={s.removeBtn}
                    onClick={e => {
                      e.stopPropagation()
                      handleRemove(index)
                    }}>
                    ✕
                  </button>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default Queue
