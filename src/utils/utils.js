import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js'
import fetchJsonp from 'fetch-jsonp'

const mapDeezerGenre = genreId => {
  const genreMap = {
    85: 'energetic', // Electro
    116: 'dark', // Rap/Hip Hop
    165: 'chill', // R&B
    129: 'chill', // Pop
    113: 'energetic', // Rock
    106: 'chill', // Soul & Funk
    144: 'dark', // Reggae
    197: 'energetic', // House
    173: 'default' // Film/TV
  }
  console.log(genreId)
  return genreMap[genreId] || 'default'
}

const getGenreFromDeezer = async (title, artist) => {
  try {
    const query = `${title} ${artist}`.trim()
    const response = await fetchJsonp(
      `https://api.deezer.com/search?q=${encodeURIComponent(
        query
      )}&output=jsonp`
    )
    const data = await response.json()

    if (data.data && data.data.length > 0) {
      const trackId = data.data[0]?.id
      console.log('trackId:', trackId)

      if (!trackId) return 'default'

      const trackDetailsResponse = await fetchJsonp(
        `https://api.deezer.com/track/${trackId}?output=jsonp`
      )
      const trackDetails = await trackDetailsResponse.json()
      console.log('Track details:', trackDetails)

      const genreId = trackDetails?.genre_id || trackDetails?.album?.genre_id
      console.log('Track genreId:', genreId)

      return mapDeezerGenre(genreId)
    }
  } catch (err) {
    console.error('Erreur JSONP Deezer:', err)
  }
  return 'default'
}

export const fetchMetadata = async (TRACKS, tracks, setTracks) => {
  const promises = TRACKS.map(
    track =>
      new Promise((resolve, reject) => {
        const audio = new Audio(track.path)

        audio.addEventListener('loadedmetadata', () => {
          fetch(track.path)
            .then(response => {
              if (!response.ok) throw new Error(`Failed to fetch ${track.path}`)
              return response.blob()
            })
            .then(blob => {
              jsmediatags.read(blob, {
                onSuccess: async tag => {
                  const { title, artist, album, picture } = tag.tags
                  let cover = 'https://placehold.co/600x400'
                  if (picture) {
                    const base64String = btoa(
                      picture.data
                        .map(char => String.fromCharCode(char))
                        .join('')
                    )
                    cover = `data:${picture.format};base64,${base64String}`
                  }

                  let _artist = artist ? artist.split(',') : []
                  const genre = await getGenreFromDeezer(
                    title || track.name,
                    artist || ''
                  )

                  resolve({
                    index: track.id,
                    name: track.name,
                    title: title || track.name,
                    duration: audio.duration,
                    artist: _artist,
                    genre,
                    album: {
                      cover_xl: cover,
                      title: album || 'Unknown Album'
                    },
                    preview: track.path
                  })
                },
                onError: async error => {
                  console.error(
                    `Error reading metadata for ${track.name}:`,
                    error
                  )
                  const genre = await getGenreFromDeezer(track.name, '')
                  resolve({
                    index: track.id,
                    name: track.name,
                    title: track.name,
                    genre,
                    duration: audio.duration,
                    artist: [],
                    album: {
                      cover_xl: 'https://placehold.co/600x400',
                      title: 'Unknown Album'
                    },
                    preview: track.path
                  })
                }
              })
            })
            .catch(error => {
              console.error(`Failed to fetch ${track.name}:`, error)
              reject(error)
            })
        })
      })
  )

  try {
    const results = await Promise.all(promises)
    const _tracks = [...tracks]
    results.forEach(result => _tracks.push(result))
    setTracks(_tracks)
  } catch (error) {
    console.error('Error fetching metadata:', error)
  }
}
