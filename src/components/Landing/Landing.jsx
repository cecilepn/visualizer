import s from './Landing.module.scss'
import AudioController from '../../utils/AudioController'
import { useState } from 'react'
import Button from '../Button/Button'

const Landing = () => {
  const [hasClicked, setHasClicked] = useState(false)

  const onClick = () => {
    AudioController.setup()
    setHasClicked(true)
  }

  return (
    <section className={`${s.landing} ${hasClicked ? s.landingHidden : ''}`}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Music Visualizer</h1>
        <p>
          Project designed as part of the Interactive Devices course at the IUT
          of Champs-sur-Marne.
        </p>
        <p>
          Exploration and use of three.js, GSAP, React, and the Web Audio API.
        </p>
        <p>Click on TRACKLIST to search for a song.</p>

        <Button label={'Start'} onClick={onClick} />
      </div>
    </section>
  )
}

export default Landing
