import { useState } from 'react'
import { Icon } from './Icons'
import { SnakeAvatar } from './SnakeAvatar'
import { WeightChart } from './WeightChart'
import { FeedingList, SheddingList, WeightList } from './LogList'
import { Modal } from './Modal'
import { SnakeForm } from './forms/SnakeForm'
import { feedingStatus, lastWeight, shedStatus } from '../utils/derived'
import { formatDate, formatRelative, dayWord } from '../utils/dateUtils'

const TABS = [
  { key: 'feedings', label: 'Hranjenje', icon: Icon.Food },
  { key: 'sheddings', label: 'Shed', icon: Icon.Shed },
  { key: 'weights', label: 'Težina', icon: Icon.Weight },
]

export function SnakeProfile({
  snake,
  onBack,
  onUpdateSnake,
  onDeleteSnake,
  onDeleteLog,
  onQuickAdd,
}) {
  const [tab, setTab] = useState('feedings')
  const [editOpen, setEditOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const feeding = feedingStatus(snake)
  const shed = shedStatus(snake)
  const weight = lastWeight(snake)

  return (
    <div className="max-w-2xl mx-auto px-4 pt-4 pb-32">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="btn-ghost !px-2">
          <Icon.Back className="w-5 h-5" /> Natrag
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => setEditOpen(true)} className="btn-ghost !p-2" aria-label="Uredi">
            <Icon.Edit className="w-5 h-5" />
          </button>
          <button onClick={() => setConfirmDelete(true)} className="btn-ghost !p-2 text-red-300/80 hover:text-red-300" aria-label="Obriši">
            <Icon.Trash className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-4">
          <SnakeAvatar snake={snake} size="xl" />
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold text-reptile-50 truncate">{snake.name}</h2>
            <p className="text-sm text-reptile-200/80 truncate">{snake.species || 'Vrsta —'}</p>
            {snake.acquiredDate && (
              <p className="text-xs text-reptile-200/60 mt-1">U vlasništvu od {formatDate(snake.acquiredDate)}</p>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3">
          <div
            className={`rounded-xl p-4 border ${
              feeding.level === 'alert'
                ? 'bg-red-500/10 border-red-500/30'
                : feeding.level === 'warn'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-reptile-950/60 border-reptile-800'
            }`}
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-reptile-200/70 font-semibold">
              <Icon.Food className="w-4 h-4" /> Zadnje hranjenje
            </div>
            <div
              className={`mt-1 text-xl font-bold ${
                feeding.level === 'alert' ? 'text-red-300' : 'text-reptile-50'
              }`}
            >
              {feeding.last ? formatRelative(feeding.last.date) : 'Još nema'}
            </div>
            {feeding.level === 'alert' && (
              <div className="text-sm text-red-300/90 mt-1">
                ⚠️ Više od 10 {dayWord(feeding.days)} bez obroka — provjeri zmiju.
              </div>
            )}
            {feeding.last && (
              <div className="text-xs text-reptile-200/70 mt-1">
                {feeding.last.preySize} · {feeding.last.preyType === 'frozen' ? 'Smrznuto' : 'Živo'} ·{' '}
                {feeding.last.eaten ? 'pojela' : 'odbila'}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div
              className={`rounded-xl p-4 border ${
                shed.tone === 'info'
                  ? 'bg-sky-500/10 border-sky-500/30'
                  : shed.tone === 'warn'
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : 'bg-reptile-950/60 border-reptile-800'
              }`}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-reptile-200/70 font-semibold">
                <Icon.Shed className="w-4 h-4" /> Shed status
              </div>
              <div className="mt-1 text-base font-bold text-reptile-50">{shed.label}</div>
            </div>
            <div className="rounded-xl p-4 border bg-reptile-950/60 border-reptile-800">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-reptile-200/70 font-semibold">
                <Icon.Weight className="w-4 h-4" /> Težina
              </div>
              <div className="mt-1 text-base font-bold text-reptile-50">
                {weight ? `${weight.grams} g` : '—'}
              </div>
              {weight && (
                <div className="text-xs text-reptile-200/60">{formatRelative(weight.date)}</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {TABS.map((t) => {
            const I = t.icon
            return (
              <button
                key={t.key}
                onClick={() => onQuickAdd(t.key)}
                className="btn-secondary !py-2.5 text-sm"
              >
                <I className="w-4 h-4" />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {snake.weights.length > 0 && (
        <section className="mt-6">
          <h3 className="text-sm uppercase tracking-wider text-reptile-200/70 font-semibold mb-2 px-1">
            Povijest težine
          </h3>
          <WeightChart weights={snake.weights} />
        </section>
      )}

      <section className="mt-6">
        <div className="flex gap-2 mb-3">
          {TABS.map((t) => {
            const I = t.icon
            const active = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border font-medium text-sm transition ${
                  active
                    ? 'bg-reptile-700 text-reptile-50 border-reptile-600'
                    : 'bg-reptile-950/60 text-reptile-200/80 border-reptile-800'
                }`}
              >
                <I className="w-4 h-4" />
                <span>{t.label}</span>
                <span className="text-xs text-reptile-200/60">({snake[t.key].length})</span>
              </button>
            )
          })}
        </div>

        {tab === 'feedings' && (
          <FeedingList feedings={snake.feedings} onDelete={(id) => onDeleteLog(snake.id, 'feedings', id)} />
        )}
        {tab === 'sheddings' && (
          <SheddingList sheddings={snake.sheddings} onDelete={(id) => onDeleteLog(snake.id, 'sheddings', id)} />
        )}
        {tab === 'weights' && (
          <WeightList weights={snake.weights} onDelete={(id) => onDeleteLog(snake.id, 'weights', id)} />
        )}
      </section>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Uredi zmiju">
        <SnakeForm
          initial={snake}
          onSubmit={(data) => {
            onUpdateSnake(snake.id, data)
            setEditOpen(false)
          }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Obrisati zmiju?">
        <p className="text-reptile-100">
          Sigurno želiš obrisati <b>{snake.name}</b>? Svi logovi (hranjenje, shed, težina) bit će izgubljeni.
        </p>
        <div className="flex gap-2 mt-5">
          <button onClick={() => setConfirmDelete(false)} className="btn-secondary flex-1">
            Odustani
          </button>
          <button
            onClick={() => {
              onDeleteSnake(snake.id)
              setConfirmDelete(false)
              onBack()
            }}
            className="btn flex-1 bg-red-600 hover:bg-red-500 text-white"
          >
            Obriši
          </button>
        </div>
      </Modal>
    </div>
  )
}
