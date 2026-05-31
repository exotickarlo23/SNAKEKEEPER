import { useState } from 'react'
import { useSnakes } from './hooks/useSnakes'
import { Dashboard } from './components/Dashboard'
import { SnakeProfile } from './components/SnakeProfile'
import { Fab } from './components/Fab'
import { QuickLog } from './components/QuickLog'
import { Modal } from './components/Modal'
import { SnakeForm } from './components/forms/SnakeForm'

export default function App() {
  const { snakes, addSnake, updateSnake, deleteSnake, addLog, deleteLog } = useSnakes()
  const [view, setView] = useState({ name: 'dashboard' })
  const [quickLog, setQuickLog] = useState({ open: false, kind: 'feedings', snakeId: null })
  const [addSnakeOpen, setAddSnakeOpen] = useState(false)

  const openSnake = (id) => setView({ name: 'profile', id })
  const back = () => setView({ name: 'dashboard' })

  const openQuick = (kind = 'feedings', snakeId = null) => {
    if (snakes.length === 0) {
      setAddSnakeOpen(true)
      return
    }
    setQuickLog({ open: true, kind, snakeId })
  }

  const currentSnake = view.name === 'profile' ? snakes.find((s) => s.id === view.id) : null

  return (
    <div className="min-h-full">
      {view.name === 'dashboard' && (
        <Dashboard
          snakes={snakes}
          onOpenSnake={openSnake}
          onAddSnake={() => setAddSnakeOpen(true)}
        />
      )}

      {view.name === 'profile' && currentSnake && (
        <SnakeProfile
          snake={currentSnake}
          onBack={back}
          onUpdateSnake={updateSnake}
          onDeleteSnake={deleteSnake}
          onDeleteLog={deleteLog}
          onQuickAdd={(kind) => openQuick(kind, currentSnake.id)}
        />
      )}

      {view.name === 'profile' && !currentSnake && (
        <div className="p-8 text-center text-reptile-200">
          Zmija nije pronađena.
          <button onClick={back} className="block mx-auto mt-4 btn-secondary">
            Natrag
          </button>
        </div>
      )}

      <Fab onClick={() => openQuick('feedings', currentSnake?.id || null)} />

      <QuickLog
        open={quickLog.open}
        onClose={() => setQuickLog((q) => ({ ...q, open: false }))}
        snakes={snakes}
        defaultSnakeId={quickLog.snakeId}
        defaultKind={quickLog.kind}
        onAdd={addLog}
      />

      <Modal open={addSnakeOpen} onClose={() => setAddSnakeOpen(false)} title="Nova zmija">
        <SnakeForm
          onSubmit={(data) => {
            addSnake(data)
            setAddSnakeOpen(false)
          }}
          onCancel={() => setAddSnakeOpen(false)}
        />
      </Modal>
    </div>
  )
}
