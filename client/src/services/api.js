// Small fetch wrapper for the JSON API. Errors carry the server's message and HTTP status.
export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    const error = new Error(data?.error || 'Something went wrong. Please try again.')
    error.status = res.status
    throw error
  }

  return data
}
