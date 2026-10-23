export async function fetchPublicContent() {
  const res = await fetch('/api/content', { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error('Could not load content')
  return res.json()
}
