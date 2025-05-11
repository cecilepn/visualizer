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
  Électronique: [
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
  Classique: [
    'Musique Classique',
    'Opéra',
    'Musique Contemporaine',
    'Musique de Chambre',
    'Musique Chorale',
    'Néoclassique'
  ],
  'Hip-Hop / Rap': [
    'Rap',
    'Hip-Hop',
    'Trap',
    'Boom Bap',
    'Drill',
    'Cloud Rap',
    'Old School',
    'Lo-fi Hip-Hop',
    'Freestyle Rap'
  ],
  Métal: [
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
  'Folk / World / Country': [
    'Folk',
    'Country',
    'Bluegrass',
    'Americana',
    'Chanson française',
    'Flamenco',
    'Reggae',
    'Afrobeat',
    'Rai',
    'Musique Celtique',
    'Musiques Traditionnelles'
  ],
  'Jazz / Blues': [
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
  'Soul / Funk / R&B': [
    'Soul',
    'Funk',
    'R&B',
    'Neo-Soul',
    'Motown',
    'Quiet Storm',
    'New Jack Swing'
  ],
  Autres: [
    'Reggaeton',
    'Ska',
    'Dancehall',
    'Gospel',
    'Disco',
    'Zouk',
    'Schlager',
    'Musique Expérimentale',
    'Noise',
    'Spoken Word',
    'Musique de film',
    'Musique de jeux vidéo',
    'Musique religieuse'
  ]
}

function getGenreCategory(genre) {
  for (const [category, genres] of Object.entries(genreCategories)) {
    if (genres.map(g => g.toLowerCase()).includes(genre.toLowerCase())) {
      return category
    }
  }
  return 'default'
}

export { genreCategories, getGenreCategory }
