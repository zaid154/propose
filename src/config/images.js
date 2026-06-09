// Get all gallery images from assets folder
export function getGalleryImages() {
  const modules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', {
    eager: true,
  })

  const imageList = []

  for (const path in modules) {
    imageList.push({
      path: path,
      src: modules[path].default,
    })
  }

  imageList.sort(function (a, b) {
    if (a.path < b.path) return -1
    if (a.path > b.path) return 1
    return 0
  })

  const result = []
  for (let i = 0; i < imageList.length; i++) {
    result.push(imageList[i].src)
  }

  return result
}
