import { create } from 'zustand'

const useStore = create(set => ({
  tracks: [],
  setTracks: _tracks =>
    set(() => ({
      tracks: _tracks
    })),

  currentTrack: null,
  setCurrentTrack: track => set({ currentTrack: track }),

  isPlaying: false,
  setIsPlaying: isPlaying => set({ isPlaying })
}))

export default useStore
