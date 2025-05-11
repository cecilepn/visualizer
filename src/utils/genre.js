const genreCategories = {
  Rock: [
    'Rock',
    'Hard Rock',
    'Punk Rock',
    'Garage Rock',
    'Indie Rock',
    'Alternative Rock',
    'Grunge',
    'Psychedelic Rock',
    'Progressive Rock',
    'Glam Rock',
    'Blues Rock',
    'Southern Rock'
  ],
  Pop: [
    'Pop',
    'Electropop',
    'Synthpop',
    'Indie Pop',
    'K-pop',
    'J-pop',
    'Teen Pop',
    'Dance Pop',
    'Bubblegum Pop',
    'Art Pop'
  ],
  Electronic: [
    'Electronic',
    'EDM',
    'House',
    'Techno',
    'Trance',
    'Dubstep',
    'Drum and Bass',
    'Electro',
    'Ambient',
    'Chillout',
    'Deep House',
    'Minimal',
    'Future Bass'
  ],
  Classical: [
    'Classical',
    'Opera',
    'Contemporary Classical',
    'Chamber Music',
    'Choral Music',
    'Neoclassical'
  ],
  HipHop: [
    'Hip-Hop',
    'Rap',
    'Trap',
    'Boom Bap',
    'Drill',
    'Cloud Rap',
    'Old School Hip-Hop',
    'Lo-fi Hip-Hop',
    'Freestyle Rap'
  ],
  Metal: [
    'Heavy Metal',
    'Death Metal',
    'Black Metal',
    'Thrash Metal',
    'Doom Metal',
    'Symphonic Metal',
    'Metalcore',
    'Nu Metal',
    'Groove Metal',
    'Progressive Metal'
  ],
  Jazz: [
    'Jazz',
    'Bebop',
    'Smooth Jazz',
    'Free Jazz',
    'Swing',
    'Fusion',
    'Blues',
    'Delta Blues',
    'Chicago Blues',
    'Electric Blues'
  ],
  Soul: [
    'Soul',
    'Funk',
    'R&B',
    'Neo-Soul',
    'Motown',
    'Quiet Storm',
    'New Jack Swing'
  ],
  Other: [
    'Reggaeton',
    'Ska',
    'Dancehall',
    'Gospel',
    'Disco',
    'Zouk',
    'Schlager',
    'Experimental Music',
    'Noise',
    'Spoken Word',
    'Film Music',
    'Video Game Music',
    'Religious Music',
    'Folk',
    'Country',
    'Bluegrass',
    'Americana',
    'French Chanson',
    'Flamenco',
    'Reggae',
    'Afrobeat',
    'Rai',
    'Celtic Music',
    'Traditional Music'
  ]
}

function getGenreCategory(genre) {
  for (const [category, genres] of Object.entries(genreCategories)) {
    if (genres.map(g => g.toLowerCase()).includes(genre.toLowerCase())) {
      console.log('category', category)
      return category
    }
  }
  return 'default'
}

export { genreCategories, getGenreCategory }
