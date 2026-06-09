// Get env value or use default
function getEnvValue(key, defaultValue) {
  const value = import.meta.env[key]
  if (typeof value === 'string' && value.trim() !== '') {
    return value
  }
  return defaultValue
}

// Get list of date places from env
export function getPlaces() {
  const raw = getEnvValue('VITE_DATE_PLACES', '')
  const parts = raw.split(',')
  const places = []

  for (let i = 0; i < parts.length; i++) {
    const place = parts[i].trim()
    if (place !== '') {
      places.push(place)
    }
  }

  if (places.length > 0) {
    return places
  }

  return ['Other']
}
