const KEY = 'snakekeeper.v1'

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save state', e)
  }
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

export const initialState = {
  snakes: [
    {
      id: uid(),
      name: 'Zmija 1',
      species: 'Ball Python',
      acquiredDate: '',
      image: null,
      feedings: [],
      sheddings: [],
      weights: [],
    },
    {
      id: uid(),
      name: 'Zmija 2',
      species: 'Corn Snake',
      acquiredDate: '',
      image: null,
      feedings: [],
      sheddings: [],
      weights: [],
    },
  ],
}
