import * as THREE from 'three'
import audioController from '../../utils/AudioController'
import scene from '../Scene'

export default class Character {
  constructor() {
    this.group = null

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff
    })

    scene.gltfLoader.load('/models/dancing.glb', gltf => {
      this.group = gltf.scene

      console.log(gltf.scene)

      this.group.traverse(object => {
        if (object.type === 'Mesh' || object.type === 'SkinnedMesh') {
          object.material = this.material
        }
      })
    })
  }

  update() {}
}
