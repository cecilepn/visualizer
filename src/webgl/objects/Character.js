import * as THREE from 'three'
import audioController from '../../utils/AudioController'
import scene from '../Scene'

const genreModels = {
  hiphop: ['hiphop_1', 'hiphop_2'],
  pop: ['pop_1', 'pop_2', 'pop_3'],
  rock: ['rock'],
  classic: ['classic_1', 'classic_2', 'classic_3'],
  default: [
    'default',
    'silly_1',
    'silly_2',
    'silly_3',
    'silly_4',
    'silly_5',
    'silly_6'
  ]
}

const normalizeGenre = genre => genre.toLowerCase().replace(/\s+/g, '')

const getGenreModelPath = (genre, excludeModelName = null) => {
  const key = normalizeGenre(genre)
  const models = genreModels[key] || genreModels.default

  let selected
  if (models.length === 1) {
    selected = models[0]
  } else {
    do {
      selected = models[Math.floor(Math.random() * models.length)]
    } while (selected === excludeModelName)
  }

  return `/models/dancing/${selected}.glb`
}

export default class Character {
  constructor() {
    this.container = new THREE.Group()
    this.group = null
    this.mixer = null
    this.actions = {}
    this.currentAction = null
    this.count = 0
    this.switchTimer = 0
    this.switchInterval = 10
    this.availableModels = []
    this.currentModelName = ''
    this.genre = 'default'

    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff })

    this.loadInitialModel()
  }

  loadInitialModel() {
    const path = getGenreModelPath(this.genre)
    console.log('path', path)
    this.currentModelName = path.split('/').pop().replace('.glb', '')
    console.log('currentModelName', this.currentModelName)

    scene.gltfLoader.load(path, gltf => {
      this.group = gltf.scene
      this.centerGroup(this.group)

      this.applyMaterial(this.group)

      this.mixer = new THREE.AnimationMixer(this.group)
      if (gltf.animations && gltf.animations.length > 0) {
        const action = this.mixer.clipAction(gltf.animations[0])
        action.play()
        this.currentAction = action
      }

      this.container.add(this.group)
    })
  }

  centerGroup(group) {
    const box = new THREE.Box3().setFromObject(group)
    const center = new THREE.Vector3()
    box.getCenter(center)
    group.position.y -= center.y
  }

  applyMaterial(group) {
    group.traverse(object => {
      if (object.type === 'Mesh' || object.type === 'SkinnedMesh') {
        object.material = this.material
      }
    })
  }

  playAnimation(genre) {
    const normalized = normalizeGenre(genre)
    if (this.genre !== normalized) {
      this.genre = normalized
      this.availableModels = genreModels[this.genre] || genreModels.default
      this.currentModelName = ''
      this.switchTimer = 0
      this.changeModel()
    }
  }

  changeModel() {
    const path = getGenreModelPath(this.genre, this.currentModelName)
    this.currentModelName = path.split('/').pop().replace('.glb', '')
    console.log('change currentModelName', this.currentModelName)

    scene.gltfLoader.load(path, gltf => {
      // Supprimer le modèle précédent
      if (this.group) {
        this.container.remove(this.group)
      }

      this.group = gltf.scene
      this.centerGroup(this.group)
      this.applyMaterial(this.group)
      this.container.add(this.group)

      console.log('this.group', this.group)

      // Gestion des animations
      this.mixer = new THREE.AnimationMixer(this.group)
      if (gltf.animations && gltf.animations.length > 0) {
        const action = this.mixer.clipAction(gltf.animations[0])
        action.play()
        this.currentAction = action
      }
    })
  }

  update(deltaTime) {
    if (this.mixer) {
      this.mixer.update(deltaTime * 0.001)
    }

    this.switchTimer += deltaTime * 0.001
    if (this.switchTimer >= this.switchInterval) {
      this.switchTimer = 0
      this.changeModel()
    }

    if (audioController.bpm) {
      this.count += deltaTime * 0.001
      if (this.count > 60 / audioController.bpm) {
        this.material.color.setRGB(Math.random(), Math.random(), Math.random())
        this.count = 0
      }
    }
  }
}
