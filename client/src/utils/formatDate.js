// "2026-09-19" -> "September 19, 2026" (UTC, so the day never shifts with the visitor's timezone)
export function formatPostDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
