import { daysSince } from './dateUtils'

export function sortByDateDesc(list) {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function lastFeeding(snake) {
  return sortByDateDesc(snake.feedings)[0] || null
}

export function lastWeight(snake) {
  return sortByDateDesc(snake.weights)[0] || null
}

export function shedStatus(snake) {
  if (!snake.sheddings.length) return { state: 'normal', label: 'Normalno', tone: 'neutral' }
  const latest = [...snake.sheddings].sort((a, b) => {
    const ka = a.shedDate || a.blueStartDate || ''
    const kb = b.shedDate || b.blueStartDate || ''
    return ka < kb ? 1 : ka > kb ? -1 : 0
  })[0]
  if (!latest.shedDate) {
    const days = daysSince(latest.blueStartDate)
    return {
      state: 'blue',
      label: days != null ? `Blue phase (${days}d)` : 'Blue phase',
      tone: 'info',
    }
  }
  if (latest.complete === false) {
    return { state: 'incomplete', label: 'Nekompletan shed', tone: 'warn' }
  }
  return { state: 'normal', label: 'Normalno', tone: 'neutral' }
}

export function feedingStatus(snake) {
  const last = lastFeeding(snake)
  if (!last) return { days: null, level: 'unknown' }
  const days = daysSince(last.date)
  let level = 'ok'
  if (days >= 10) level = 'alert'
  else if (days >= 7) level = 'warn'
  return { days, level, last }
}
