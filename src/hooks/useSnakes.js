import { useCallback, useEffect, useState } from 'react'
import { initialState, loadState, saveState, uid } from '../utils/storage'

export function useSnakes() {
  const [state, setState] = useState(() => loadState() ?? initialState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const addSnake = useCallback((data) => {
    setState((s) => ({
      ...s,
      snakes: [
        ...s.snakes,
        {
          id: uid(),
          name: data.name || 'Bez imena',
          species: data.species || '',
          acquiredDate: data.acquiredDate || '',
          image: data.image || null,
          feedings: [],
          sheddings: [],
          weights: [],
        },
      ],
    }))
  }, [])

  const updateSnake = useCallback((id, patch) => {
    setState((s) => ({
      ...s,
      snakes: s.snakes.map((sn) => (sn.id === id ? { ...sn, ...patch } : sn)),
    }))
  }, [])

  const deleteSnake = useCallback((id) => {
    setState((s) => ({ ...s, snakes: s.snakes.filter((sn) => sn.id !== id) }))
  }, [])

  const addLog = useCallback((snakeId, kind, entry) => {
    setState((s) => ({
      ...s,
      snakes: s.snakes.map((sn) =>
        sn.id === snakeId ? { ...sn, [kind]: [...sn[kind], { id: uid(), ...entry }] } : sn,
      ),
    }))
  }, [])

  const deleteLog = useCallback((snakeId, kind, logId) => {
    setState((s) => ({
      ...s,
      snakes: s.snakes.map((sn) =>
        sn.id === snakeId ? { ...sn, [kind]: sn[kind].filter((e) => e.id !== logId) } : sn,
      ),
    }))
  }, [])

  return { snakes: state.snakes, addSnake, updateSnake, deleteSnake, addLog, deleteLog }
}
