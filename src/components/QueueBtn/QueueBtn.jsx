import { useEffect, useState } from 'react'
import s from './queueBtn.module.scss'
import useStore from '../../utils/store'

const QueueBtn = ({ track }) => {
  const queue = useStore(state => state.queue)
  const addToQueue = useStore(state => state.addToQueue)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const isInQueue = queue.some(t => t.index === track.index)
    setAdded(isInQueue)
  }, [queue, track])

  const handleClick = e => {
    e.stopPropagation()
    if (!added) {
      addToQueue(track)
      setAdded(true)
    }
  }

  return (
    <button className={`${s.queueBtn}`} onClick={handleClick}>
      {added ? '✓' : '+'}
    </button>
  )
}

export default QueueBtn
