import gsap from 'gsap'
import detect from 'bpm-detective'

class AudioController {
  constructor() {
    this.isPlaying = false
  }

  setup() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    this.audio = new Audio()
    this.audio.crossOrigin = 'anonymous'
    this.bpm = null
    this.audio.volume = 0.1

    this.audioSource = this.ctx.createMediaElementSource(this.audio)
    this.analyserNode = new AnalyserNode(this.ctx, {
      fftSize: 1024,
      smoothingTimeConstant: 0.8
    })

    this.fdata = new Uint8Array(this.analyserNode.frequencyBinCount)

    this.audioSource.connect(this.analyserNode)
    this.audioSource.connect(this.ctx.destination)

    gsap.ticker.add(this.tick)

    this.audio.addEventListener('loadeddata', async () => {
      await this.detectBPM()
    })

    this.audio.addEventListener('play', () => {
      this.isPlaying = true
    })

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false
    })
  }

  detectBPM = async () => {
    const offlineCtx = new OfflineAudioContext(
      1,
      this.audio.duration * this.ctx.sampleRate,
      this.ctx.sampleRate
    )
    const response = await fetch(this.audio.src)
    const buffer = await response.arrayBuffer()
    const audioBuffer = await offlineCtx.decodeAudioData(buffer)
    this.bpm = detect(audioBuffer)
    return bpm
  }

  play = src => {
    this.audio.src = src
    this.audio.play()
  }

  pause = () => {
    this.audio.pause()
  }

  resume = () => {
    this.audio.play()
  }

  tick = () => {
    this.analyserNode.getByteFrequencyData(this.fdata)
  }
}

const audioController = new AudioController()
export default audioController
