import { create } from 'zustand'
import audioController from './AudioController'

const useStore = create(set => ({
  tracks: [],
  setTracks: tracks => set({ tracks }),

  resetTracks: () => set({ tracks: [] }),

  currentTrack: null,
  setCurrentTrack: track => set({ currentTrack: track }),

  isPlaying: false,
  setIsPlaying: isPlaying => set({ isPlaying }),

  playlists: {},
  setPlaylists: playlists => set({ playlists }),

  queue: [],
  setQueue: queue => set({ queue }),

  addToQueue: track => set(state => ({ queue: [...state.queue, track] })),

  removeFromQueue: index =>
    set(state => {
      const updatedQueue = [...state.queue]
      updatedQueue.splice(index, 1)
      return { queue: updatedQueue }
    }),

  playNextInQueue: () =>
    set(state => {
      const [nextTrack, ...rest] = state.queue
      audioController.play(nextTrack.src)
      return {
        currentTrack: nextTrack,
        queue: rest,
        isPlaying: true
      }
    })
}))

export default useStore
