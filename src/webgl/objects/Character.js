import * as THREE from 'three'
import audioController from '../../utils/AudioController'
import scene from '../Scene'

export default class Character {
  constructor() {
    this.group = null
    this.mixer = null

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff
    })

    scene.gltfLoader.load('/models/dancing.glb', gltf => {
      this.group = gltf.scene
      this.group.traverse(object => {
        if (object.isMesh || object.isSkinnedMesh) {
          object.material = this.material
        }
      })

      this.group.traverse(object => {
        if (object.type === 'Mesh' || object.type === 'SkinnedMesh') {
          object.material = this.material
        }
      })

      this.mixer = new THREE.AnimationMixer(this.group)
      const action = this.mixer.clipAction(gltf.animations[0])
      action.play()

      const box = new THREE.Box3().setFromObject(this.group)
      const center = new THREE.Vector3()
      box.getCenter(center)
      const size = new THREE.Vector3()
      box.getSize(size)

      this.group.position.y -= center.y
      this.group.position.x -= center.x
      this.group.position.z -= center.z
    })
  }

  update(time, deltaTime) {
    if (this.mixer) {
      this.mixer.update(deltaTime / 1000)
    }
  }
}
