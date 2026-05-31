import { useState } from 'react'
import { todayISO } from '../../utils/dateUtils'

export function WeightForm({ snakes, defaultSnakeId, onSubmit, onCancel }) {
  const [snakeId, setSnakeId] = useState(defaultSnakeId || snakes[0]?.id || '')
  const [date, setDate] = useState(todayISO())
  const [grams, setGrams] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!snakeId) return
    const g = parseInt(grams, 10)
    if (!g || g <= 0) return
    onSubmit(snakeId, { date, grams: g })
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {!defaultSnakeId && (
        <div>
          <label className="label">Zmija</label>
          <select className="input" value={snakeId} onChange={(e) => setSnakeId(e.target.value)}>
            {snakes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="label">Datum</label>
        <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label className="label">Težina (g)</label>
        <input
          type="number"
          inputMode="numeric"
          min="1"
          step="1"
          className="input text-2xl font-bold"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          placeholder="450"
          autoFocus
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Odustani
        </button>
        <button type="submit" className="btn-primary flex-1">
          Spremi
        </button>
      </div>
    </form>
  )
}
