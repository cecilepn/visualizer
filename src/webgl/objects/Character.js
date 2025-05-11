import * as THREE from 'three'
import audioController from '../../utils/AudioController'
import scene from '../Scene'

const genreModels = {
  hiphop: ['hiphop_1', 'hiphop_2', 'hiphop_3'],
  pop: ['pop_1', 'pop_2', 'pop_3', 'pop_4'],
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
  ],
  queenB: ['beyonce'],
  mj: ['michael'],
  thriller: ['thriller_1', 'thriller_2']
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
    this.renderNode = this.container

    this.loadInitialModel()
  }

  loadInitialModel() {
    const path = getGenreModelPath(this.genre)
    this.currentModelName = path.split('/').pop().replace('.glb', '')

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
    scene.gltfLoader.load(path, gltf => {
      if (this.group) {
        this.container.remove(this.group)
      }

      this.group = gltf.scene
      this.centerGroup(this.group)
      this.applyMaterial(this.group)
      this.container.add(this.group)

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
      this.mixer.update(1 / 60)
    }

    this.switchTimer += 1 / 60
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
