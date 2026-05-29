function readEnvString(key, fallback) {
  const v = import.meta.env[key]
  if (typeof v === 'string' && v.trim() !== '') return v
  return fallback
}

export function getPlaces() {
  const raw = readEnvString('VITE_DATE_PLACES', '')
  const places = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  return places.length > 0 ? places : ['Other']
}

