import { Icon } from './Icons'
import { formatDate } from '../utils/dateUtils'
import { sortByDateDesc } from '../utils/derived'

export function FeedingList({ feedings, onDelete }) {
  if (!feedings.length) return <Empty text="Još nema unosa hranjenja." />
  const sorted = sortByDateDesc(feedings)
  return (
    <ul className="space-y-2">
      {sorted.map((f) => (
        <Row key={f.id} onDelete={() => onDelete(f.id)}>
          <div className="flex items-center gap-3">
            <Pill ok={f.eaten}>{f.eaten ? '✓' : '✗'}</Pill>
            <div>
              <div className="font-semibold text-reptile-50">
                {f.preySize} · {f.preyType === 'frozen' ? 'Smrznuto' : 'Živo'}
              </div>
              <div className="text-xs text-reptile-200/70">{formatDate(f.date)}</div>
            </div>
          </div>
        </Row>
      ))}
    </ul>
  )
}

export function SheddingList({ sheddings, onDelete }) {
  if (!sheddings.length) return <Empty text="Još nema sheddinga." />
  const sorted = [...sheddings].sort((a, b) => {
    const ka = a.shedDate || a.blueStartDate || ''
    const kb = b.shedDate || b.blueStartDate || ''
    return ka < kb ? 1 : ka > kb ? -1 : 0
  })
  return (
    <ul className="space-y-2">
      {sorted.map((s) => (
        <Row key={s.id} onDelete={() => onDelete(s.id)}>
          <div className="flex items-center gap-3">
            <Pill ok={s.shedDate && s.complete !== false} tone={!s.shedDate ? 'info' : s.complete === false ? 'warn' : 'ok'}>
              <Icon.Shed className="w-4 h-4" />
            </Pill>
            <div>
              <div className="font-semibold text-reptile-50">
                {s.shedDate
                  ? s.complete === false
                    ? 'Nekompletan shed'
                    : 'Kompletan shed'
                  : 'U blue phase'}
              </div>
              <div className="text-xs text-reptile-200/70">
                Blue: {formatDate(s.blueStartDate)} · Shed: {formatDate(s.shedDate)}
              </div>
            </div>
          </div>
        </Row>
      ))}
    </ul>
  )
}

export function WeightList({ weights, onDelete }) {
  if (!weights.length) return <Empty text="Još nema unosa težine." />
  const sorted = sortByDateDesc(weights)
  return (
    <ul className="space-y-2">
      {sorted.map((w, i) => {
        const prev = sorted[i + 1]
        const delta = prev ? w.grams - prev.grams : null
        return (
          <Row key={w.id} onDelete={() => onDelete(w.id)}>
            <div className="flex items-center gap-3">
              <Pill tone="neutral">
                <Icon.Weight className="w-4 h-4" />
              </Pill>
              <div>
                <div className="font-semibold text-reptile-50">{w.grams} g</div>
                <div className="text-xs text-reptile-200/70">
                  {formatDate(w.date)}
                  {delta != null && (
                    <span className={`ml-2 font-medium ${delta > 0 ? 'text-reptile-300' : delta < 0 ? 'text-amber-400' : ''}`}>
                      {delta > 0 ? '+' : ''}
                      {delta} g
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Row>
        )
      })}
    </ul>
  )
}

function Row({ children, onDelete }) {
  return (
    <li className="card p-3 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">{children}</div>
      <button onClick={onDelete} className="btn-ghost !p-2 text-reptile-200/60 hover:text-red-300" aria-label="Obriši">
        <Icon.Trash className="w-4 h-4" />
      </button>
    </li>
  )
}

function Pill({ children, ok, tone }) {
  const cls =
    tone === 'info'
      ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
      : tone === 'warn'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : tone === 'neutral'
      ? 'bg-reptile-700/40 text-reptile-100 border-reptile-700'
      : ok
      ? 'bg-reptile-500/20 text-reptile-200 border-reptile-500/40'
      : 'bg-red-500/15 text-red-300 border-red-500/30'
  return (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border ${cls}`}>{children}</div>
  )
}

function Empty({ text }) {
  return <div className="card p-6 text-center text-reptile-200/60 text-sm">{text}</div>
}
