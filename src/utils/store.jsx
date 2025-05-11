import { create } from 'zustand'

const useStore = create(set => ({
  tracks: [],
  setTracks: tracks => set({ tracks }),

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
      if (state.queue.length === 0) return state
      const [nextTrack, ...rest] = state.queue
      return {
        currentTrack: nextTrack,
        queue: rest
      }
    })

  // addPlaylist: name =>
  //   set(state => ({ playlists: { ...state.playlists, [name]: [] } })),

  // addToPlaylist: (name, track) =>
  //   set(state => ({
  //     playlists: {
  //       ...state.playlists,
  //       [name]: [...state.playlists[name], track]
  //     }
  //   }))
}))

export default useStore
