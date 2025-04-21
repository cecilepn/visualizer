export const detectGenreWithAPI = async file => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_token', '0d1cb9502120715c53a1737f9d6fb09e')

  try {
    const res = await fetch('https://api.audd.io/', {
      method: 'POST',
      body: formData
    })
    const json = await res.json()
    console.log('Genre detection result:', json)

    const genre = json.result?.genre?.toLowerCase()

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
