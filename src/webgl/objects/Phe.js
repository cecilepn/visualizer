import * as THREE from 'three'
import audioController from '../../utils/AudioController'
import scene from '../Scene'

export default class Phe {
  constructor() {
    this.group = new THREE.Group()

    this.matcap = scene.textureLoader.load('/textures/matcap-logo.png')

    this.material = new THREE.MeshMatcapMaterial({
      matcap: this.matcap
    })

    this.testMaterial = new THREE.MeshNormalMaterial()

    this.left = null
    this.right = null
    this.top = null
    this.bottom = null

    this.sphere = null

    scene.gltfLoader.load('/models/logo.glb', gltf => {
      this.group = gltf.scene
      this.group.traverse(object => {
        if (object.type === 'Mesh') {
          object.material = this.material
        }
      })
      console.log(gltf.scene)

      this.sphere = this.group.getObjectByName('ImageToStlcom_logo')
      this.sphere.material = this.material

      //   this.group.rotation.x = Math.PI / 2
    })
  }
  //
  update() {
    // this.group.rotation.y += 0.001
    // this.group.rotation.z += 0.002
    // const remappedFrequency = audioController.fdata[0] / 255 // va environ de 0 à 1
    // const scale = 0.75 + remappedFrequency
    // const scale2 = 1 + remappedFrequency / 2
    // this.sphere.scale.set(scale, scale, scale)
    // this.left.scale.set(scale2, scale2, scale2)
    // this.right.scale.set(scale2, scale2, scale2)
    // this.bottom.scale.set(scale2, scale2, scale2)
    // this.top.scale.set(scale2, scale2, scale2)
    // this.left.position.x = -1 + remappedFrequency
    // this.right.position.x = 1 - remappedFrequency
    // this.top.position.z = -1 + remappedFrequency
    // this.bottom.position.z = 1 - remappedFrequency
  }
}
