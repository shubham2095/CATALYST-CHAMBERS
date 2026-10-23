// Uploads one image (JPG, PNG or WebP) and returns { url }.
export async function uploadImage(file) {
  const body = new FormData()
  body.append('image', file)

  const res = await fetch('/api/admin/upload', { method: 'POST', body, credentials: 'same-origin' })
  const data = await res.json().catch(() => null)

  if (!res.ok) throw new Error(data?.error || 'Upload failed. Please try again.')
  return data
}
