import { useState } from 'react'
import useStore from '../../utils/store'
import s from './Queue.module.scss'
import { ChevronDown, ChevronUp } from 'lucide-react'

const Queue = () => {
  const queue = useStore(state => state.queue)
  const removeFromQueue = useStore(state => state.removeFromQueue)
  const [isOpen, setIsOpen] = useState(false)

  const handleRemove = index => {
    removeFromQueue(index)
  }

  const toggleQueue = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={s.queueContainer}>
      <div className={s.header} onClick={toggleQueue}>
        <p>Queue</p>
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
            queue.map((track, index) => (
              <div key={index} className={s.track}>
                <div>
                  <img
                    src={track.cover}
                    alt={track.title}
                    className={s.cover}
                  />
                  <div className={s.trackInfo}>
                    <span>{track.title}</span>
                    <span>{track.artist}</span>
                  </div>
                </div>
                <button
                  className={s.removeBtn}
                  onClick={() => handleRemove(index)}>
                  X
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Queue
