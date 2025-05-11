import { useState } from 'react'
import s from './queueBtn.module.scss'

const QueueBtn = ({ onAdd }) => {
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    if (!added) {
      onAdd?.()
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    }
  }

  return (
    <button className={`${s.queueBtn}`} onClick={handleClick}>
      {added ? '✓' : '+'}
    </button>
  )
}

export default QueueBtn
