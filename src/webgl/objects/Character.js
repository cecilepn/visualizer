import * as THREE from 'three'
import audioController from '../../utils/AudioController'
import scene from '../Scene'

const getGenreModelPath = genre => `/models/dancing/${genre}.glb`
export default class Character {
  constructor() {
    this.group = null
    this.mixer = null
    this.actions = {}
    this.currentAction = null

    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff })

    scene.gltfLoader.load('/models/dancing/default.glb', gltf => {
      this.group = gltf.scene
      this.group.position.y = -gltf.scene.position.y

      this.group.traverse(object => {
        if (object.type === 'Mesh' || object.type === 'SkinnedMesh') {
          object.material = this.material
        }
      })

      this.mixer = new THREE.AnimationMixer(this.group)

      gltf.animations.forEach(clip => {
        this.actions['default'] = this.mixer.clipAction(clip)
      })

      this.playAnimation('default')
    })
  }

  playAnimation(name) {
    if (this.currentAction) {
      this.currentAction.stop()
    }

    if (this.actions[name]) {
      this.currentAction = this.actions[name]
      this.currentAction.play()
    } else {
      const path = getGenreModelPath(name)
      scene.gltfLoader.load(path, gltf => {
        if (this.group) {
          scene.scene.remove(this.group)
        }

        this.group = gltf.scene
        this.group.position.y = -gltf.scene.position.y

        this.group.traverse(object => {
          if (object.type === 'Mesh' || object.type === 'SkinnedMesh') {
            object.material = this.material
          }
        })

        // scene.scene.add(this.group)

        this.mixer = new THREE.AnimationMixer(this.group)
        const clip = gltf.animations[0]
        const action = this.mixer.clipAction(clip)
        this.actions[name] = action
        this.currentAction = action
        action.play()
      })
    }
  }

  update(deltaTime) {
    if (this.mixer) {
      this.mixer.update(deltaTime / 10000)
    }
  }
}
