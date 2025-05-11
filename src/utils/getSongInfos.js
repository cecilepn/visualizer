import { getGenreCategory } from './genre'

export const getSongInfos = async (title, artist) => {
  const apiKey = import.meta.env.VITE_API_KEY
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(
        artist
      )}&track=${encodeURIComponent(title)}&format=json`
    )

    const data = await response.json()
    const trackName = data?.track?.name?.toLowerCase() || ''
    const artistName = data?.track?.artist?.name?.toLowerCase() || ''

    // Cas spécial pour "Thriller"
    if (artistName === 'michael jackson' && trackName.includes('thriller')) {
      return 'thriller'
    }

    // Autres cas spéciaux
    if (artistName === 'michael jackson') return 'mj'
    if (artistName === 'beyoncé') return 'queenB'

    // Récupération des tags de genre
    const tags = data?.track?.toptags?.tag || []
    const genreOfSong = tags[0]?.name?.toLowerCase()

    if (genreOfSong === 'myspotigrambot') return 'default'

    const genre = getGenreCategory(genreOfSong)
    return genre.toLowerCase()
  } catch (err) {
    console.error('Erreur Last.fm:', err)
    return 'default'
  }
}
