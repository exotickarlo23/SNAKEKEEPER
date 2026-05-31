import { useState } from 'react'
import { Modal } from './Modal'
import { Icon } from './Icons'
import { FeedingForm } from './forms/FeedingForm'
import { SheddingForm } from './forms/SheddingForm'
import { WeightForm } from './forms/WeightForm'

const TABS = [
  { key: 'feedings', label: 'Hranjenje', icon: Icon.Food },
  { key: 'sheddings', label: 'Shed', icon: Icon.Shed },
  { key: 'weights', label: 'Težina', icon: Icon.Weight },
]

export function QuickLog({ open, onClose, snakes, defaultSnakeId, defaultKind = 'feedings', onAdd }) {
  const [kind, setKind] = useState(defaultKind)

  // Reset kind when modal opens with a new default
  const handleOpen = open
  if (!handleOpen) return null

  const submit = (snakeId, entry) => {
    onAdd(snakeId, kind, entry)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Brzi unos">
      <div className="grid grid-cols-3 gap-2 mb-5">
        {TABS.map((t) => {
          const I = t.icon
          const active = kind === t.key
          return (
            <button
              key={t.key}
              onClick={() => setKind(t.key)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl border transition ${
                active
                  ? 'bg-accent text-reptile-950 border-accent'
                  : 'bg-reptile-950/60 text-reptile-100 border-reptile-800 hover:border-accent/40'
              }`}
            >
              <I className="w-5 h-5" />
              <span className="text-xs font-semibold">{t.label}</span>
            </button>
          )
        })}
      </div>

      {kind === 'feedings' && (
        <FeedingForm snakes={snakes} defaultSnakeId={defaultSnakeId} onSubmit={submit} onCancel={onClose} />
      )}
      {kind === 'sheddings' && (
        <SheddingForm snakes={snakes} defaultSnakeId={defaultSnakeId} onSubmit={submit} onCancel={onClose} />
      )}
      {kind === 'weights' && (
        <WeightForm snakes={snakes} defaultSnakeId={defaultSnakeId} onSubmit={submit} onCancel={onClose} />
      )}
    </Modal>
  )
}
