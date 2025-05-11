import { useEffect, useState } from 'react'
import s from './QueueButton.module.scss'
import useStore from '../../utils/store'

const QueueButton = ({ track }) => {
  const queue = useStore(state => state.queue)
  const addToQueue = useStore(state => state.addToQueue)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!track) return
    const isInQueue = queue.some(t => t.index === track.index)
    setAdded(isInQueue)
  }, [queue, track.index])

  const handleClick = e => {
    e.stopPropagation()
    if (!added) {
      addToQueue(track)
      setAdded(true)
    }
  }

  return (
    <button
      className={s.queueBtn}
      onClick={handleClick}
      aria-label={added ? 'Track already in queue' : 'Add track to queue'}>
      {added ? '✓' : '+'}
    </button>
  )
}

export default QueueButton
