import { useState } from 'react'
import { todayISO } from '../../utils/dateUtils'

export function SheddingForm({ snakes, defaultSnakeId, onSubmit, onCancel }) {
  const [snakeId, setSnakeId] = useState(defaultSnakeId || snakes[0]?.id || '')
  const [blueStartDate, setBlueStartDate] = useState(todayISO())
  const [shedDate, setShedDate] = useState('')
  const [complete, setComplete] = useState(true)

  const submit = (e) => {
    e.preventDefault()
    if (!snakeId) return
    onSubmit(snakeId, {
      blueStartDate: blueStartDate || null,
      shedDate: shedDate || null,
      complete: shedDate ? complete : true,
    })
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
        <label className="label">Početak blue phase</label>
        <input
          type="date"
          className="input"
          value={blueStartDate}
          onChange={(e) => setBlueStartDate(e.target.value)}
        />
        <p className="text-xs text-reptile-200/60 mt-1">Datum kad si primijetio plavkasti sjaj.</p>
      </div>

      <div>
        <label className="label">Datum kompletnog sheda</label>
        <input
          type="date"
          className="input"
          value={shedDate}
          onChange={(e) => setShedDate(e.target.value)}
          placeholder="Ostavi prazno ako je još u shedu"
        />
        <p className="text-xs text-reptile-200/60 mt-1">
          Ostavi prazno ako zmija još nije završila shed.
        </p>
      </div>

      {shedDate && (
        <div>
          <label className="label">Kvaliteta sheda</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setComplete(true)}
              className={`py-3 rounded-xl font-semibold border transition ${
                complete
                  ? 'bg-reptile-500 text-reptile-50 border-reptile-400'
                  : 'bg-reptile-950/60 text-reptile-100 border-reptile-800'
              }`}
            >
              ✓ Kompletan
            </button>
            <button
              type="button"
              onClick={() => setComplete(false)}
              className={`py-3 rounded-xl font-semibold border transition ${
                !complete
                  ? 'bg-amber-600/80 text-white border-amber-500'
                  : 'bg-reptile-950/60 text-reptile-100 border-reptile-800'
              }`}
            >
              ⚠ Nekompletan
            </button>
          </div>
        </div>
      )}

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
