import * as THREE from 'three'
import audioController from '../../utils/AudioController'
import scene from '../Scene'
import vertexShader from '../shaders/phe/vertex.glsl'
import fragmentShader from '../shaders/phe/fragment.glsl'

export default class Phe {
  constructor() {
    this.group = new THREE.Group()

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uAudioFrequency: { value: 0 },
        uTime: { value: 0 }
      },
      vertexShader,
      fragmentShader
    })

    this.object = null

    scene.gltfLoader.load('/models/logo.glb', gltf => {
      this.group = gltf.scene
      this.group.traverse(object => {
        if (object.isMesh) {
          object.material = this.material
          object.geometry.computeVertexNormals()
        }
      })

      this.object = this.group.getObjectByName('ImageToStlcom_logo')
    })

    scene.scene.add(this.group)
  }

  update() {
    if (!this.object) return
    if (!audioController.fdata || audioController.fdata.length === 0) return

    const remappedFrequency = (audioController.fdata[0] || 0) / 255
    const geometry = this.object.geometry

    if (geometry) {
      const positionAttribute = geometry.attributes.position
      if (!positionAttribute) return

      const vertexCount = positionAttribute.count
      for (let i = 0; i < vertexCount; i++) {
        let z = positionAttribute.getZ(i)
        let variation = (Math.random() * 0.2 - 0.1) * remappedFrequency
        positionAttribute.setZ(i, z + variation)
      }
      positionAttribute.needsUpdate = true
    }
  }
}
