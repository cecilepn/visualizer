import * as THREE from 'three'
import audioController from '../../utils/AudioController'
import scene from '../Scene'
import fragmentShader from '../shaders/cover/fragment.glsl'
import vertexShader from '../shaders/cover/vertex.glsl'

export default class Cover {
  constructor() {
    this.group = new THREE.Group()

    this.geometry = new THREE.PlaneGeometry(12, 12, 256, 256)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uMap: new THREE.Uniform(),
        uSize: new THREE.Uniform(4),
        uTime: new THREE.Uniform(0),
        uAudioFrequency: new THREE.Uniform(0)
      },
      side: THREE.DoubleSide,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader
    })

    this.mesh = new THREE.Points(this.geometry, this.material)
    this.group.add(this.mesh)

    this.renderNode = this.group

    this.addTweaks()
  }

  addTweaks() {
    this.folder = scene.gui.addFolder('Cover')

    this.folder
      .add(this.material.uniforms.uSize, 'value', 0, 10)
      .name('uSize')
      .onChange(value => {
        this.material.uniforms.uSize.value = value
      })
      .listen() // visually refreshes the GUI with the new value
  }

  setCover(src) {
    // Load the texture
    this.texture = scene.textureLoader.load(src)

    // console.log(this.material.uniforms)
    this.material.uniforms.uMap.value = this.texture

    // Force material recompilation
    this.material.needsUpdate = true
  }

  update(time) {
    // Update the time uniform
    this.material.uniforms.uTime.value = time
    this.material.uniforms.uAudioFrequency.value = audioController.fdata[0]
  }
}
