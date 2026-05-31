import { useState } from 'react'
import { todayISO } from '../../utils/dateUtils'

const SIZES = ['S', 'M', 'L', 'XL']
const TYPES = [
  { value: 'frozen', label: 'Smrznuto' },
  { value: 'live', label: 'Živo' },
]

export function FeedingForm({ snakes, defaultSnakeId, onSubmit, onCancel }) {
  const [snakeId, setSnakeId] = useState(defaultSnakeId || snakes[0]?.id || '')
  const [date, setDate] = useState(todayISO())
  const [preySize, setPreySize] = useState('M')
  const [preyType, setPreyType] = useState('frozen')
  const [eaten, setEaten] = useState(true)

  const submit = (e) => {
    e.preventDefault()
    if (!snakeId) return
    onSubmit(snakeId, { date, preySize, preyType, eaten })
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
        <label className="label">Veličina plijena</label>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setPreySize(s)}
              className={`py-3 rounded-xl font-semibold border transition ${
                preySize === s
                  ? 'bg-accent text-reptile-950 border-accent'
                  : 'bg-reptile-950/60 text-reptile-100 border-reptile-800 hover:border-accent/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Tip</label>
        <div className="grid grid-cols-2 gap-2">
          {TYPES.map((t) => (
            <button
              type="button"
              key={t.value}
              onClick={() => setPreyType(t.value)}
              className={`py-3 rounded-xl font-semibold border transition ${
                preyType === t.value
                  ? 'bg-accent text-reptile-950 border-accent'
                  : 'bg-reptile-950/60 text-reptile-100 border-reptile-800 hover:border-accent/40'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Status</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setEaten(true)}
            className={`py-3 rounded-xl font-semibold border transition ${
              eaten
                ? 'bg-reptile-500 text-reptile-50 border-reptile-400'
                : 'bg-reptile-950/60 text-reptile-100 border-reptile-800'
            }`}
          >
            ✓ Pojela
          </button>
          <button
            type="button"
            onClick={() => setEaten(false)}
            className={`py-3 rounded-xl font-semibold border transition ${
              !eaten
                ? 'bg-red-600/80 text-white border-red-500'
                : 'bg-reptile-950/60 text-reptile-100 border-reptile-800'
            }`}
          >
            ✗ Odbila
          </button>
        </div>
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
