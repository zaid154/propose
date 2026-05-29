export function getGalleryImages() {
  const modules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', {
    eager: true,
  })

  return Object.entries(modules)
    .map(([path, mod]) => ({ path, src: mod.default }))
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((x) => x.src)
}

