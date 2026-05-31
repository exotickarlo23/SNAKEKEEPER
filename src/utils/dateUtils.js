const MS_PER_DAY = 1000 * 60 * 60 * 24

export function todayISO() {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d - tz).toISOString().slice(0, 10)
}

export function daysSince(isoDate) {
  if (!isoDate) return null
  const then = new Date(isoDate + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.floor((now - then) / MS_PER_DAY)
}

export function formatDate(isoDate) {
  if (!isoDate) return '—'
  const d = new Date(isoDate + 'T00:00:00')
  return d.toLocaleDateString('hr-HR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatRelative(isoDate) {
  const days = daysSince(isoDate)
  if (days === null) return 'nikad'
  if (days === 0) return 'danas'
  if (days === 1) return 'jučer'
  return `prije ${days} ${dayWord(days)}`
}

export function dayWord(n) {
  const abs = Math.abs(n)
  const mod10 = abs % 10
  const mod100 = abs % 100
  if (mod10 === 1 && mod100 !== 11) return 'dan'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'dana'
  return 'dana'
}
