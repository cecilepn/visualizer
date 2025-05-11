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
    console.log('Last.fm response:', data)

    const tags = data?.track?.toptags?.tag || []
    const genreOfSong = tags[0]?.name?.toLowerCase()
    if (genreOfSong === 'myspotigrambot') return 'default'

    const genre = getGenreCategory(genreOfSong)
    console.log(genre)
    return genre
  } catch (err) {
    console.error('Erreur Last.fm:', err)
    return 'default'
  }
}
