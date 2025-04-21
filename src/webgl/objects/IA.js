import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function AudioVisualizer3D() {
  const mountRef = useRef(null)
  const [audioContext, setAudioContext] = useState(null)
  const [analyser, setAnalyser] = useState(null)
  const [preset, setPreset] = useState('default')

  const getVisualPreset = averageVolume => {
    if (averageVolume < 30) return 'chill'
    if (averageVolume < 80) return 'energetic'
    return 'dark'
  }

  const detectGenreWithAPI = async file => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_token', 'YOUR_AUDD_API_KEY') // Replace with your actual key

    try {
      const res = await fetch('https://api.audd.io/', {
        method: 'POST',
        body: formData
      })
      const json = await res.json()
      console.log('Genre detection result:', json)
      const genre = json.result?.genre?.toLowerCase()

      // Simple mapping from genre to preset
      if (genre?.includes('lofi') || genre?.includes('chill')) return 'chill'
      if (
        genre?.includes('techno') ||
        genre?.includes('electro') ||
        genre?.includes('dance')
      )
        return 'energetic'
      if (
        genre?.includes('hip hop') ||
        genre?.includes('trap') ||
        genre?.includes('rap')
      )
        return 'dark'
      return 'default'
    } catch (error) {
      console.error('Genre detection failed', error)
      return 'default'
    }
  }

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.PlaneGeometry(20, 20, 64, 64)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    })
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)
    camera.position.z = 30

    const animate = () => {
      requestAnimationFrame(animate)

      if (analyser) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(dataArray)

        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
        const selectedPreset = getVisualPreset(avg)
        if (selectedPreset !== preset) setPreset(selectedPreset)

        for (let i = 0; i < geometry.attributes.position.count; i++) {
          const z = (dataArray[i % dataArray.length] / 255) * 5
          geometry.attributes.position.setZ(i, z)
        }
        geometry.attributes.position.needsUpdate = true

        // Apply visual style based on preset
        switch (preset) {
          case 'chill':
            material.color.set('#88ccff')
            plane.rotation.z += 0.001
            break
          case 'energetic':
            material.color.set('#ff00ff')
            plane.rotation.z += 0.01
            break
          case 'dark':
            material.color.set('#330033')
            plane.rotation.z += 0.005
            break
          default:
            material.color.set('#ffffff')
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [analyser, preset])

  const handleAudioUpload = async event => {
    const file = event.target.files[0]
    if (file) {
      const genrePreset = await detectGenreWithAPI(file)
      setPreset(genrePreset)

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const source = audioCtx.createBufferSource()
      const analyserNode = audioCtx.createAnalyser()
      analyserNode.fftSize = 256

      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = async () => {
        const audioBuffer = await audioCtx.decodeAudioData(reader.result)
        source.buffer = audioBuffer
        source.connect(analyserNode)
        analyserNode.connect(audioCtx.destination)
        source.start()

        setAudioContext(audioCtx)
        setAnalyser(analyserNode)
      }
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
        className="absolute z-10 p-2 m-4 bg-white rounded shadow"
      />
      <div className="absolute z-10 top-2 right-4 p-2 bg-black text-white rounded text-sm">
        Preset: {preset}
      </div>
      <div ref={mountRef} className="w-full h-screen" />
    </div>
  )
}
