import { Icon } from './Icons'
import { SnakeCard } from './SnakeCard'

export function Dashboard({ snakes, onOpenSnake, onAddSnake }) {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-reptile-50 tracking-tight">
            Snake<span className="text-accent">Keeper</span>
          </h1>
          <p className="text-sm text-reptile-200/70">
            {snakes.length} {snakes.length === 1 ? 'zmija' : 'zmije'} · pregled stanja
          </p>
        </div>
        <button onClick={onAddSnake} className="btn-secondary !px-3" aria-label="Dodaj zmiju">
          <Icon.Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Zmija</span>
        </button>
      </header>

      {snakes.length === 0 ? (
        <div className="card p-8 text-center">
          <Icon.Snake className="w-12 h-12 text-reptile-400 mx-auto mb-3" />
          <p className="text-reptile-100 font-semibold mb-1">Još nema zmija</p>
          <p className="text-sm text-reptile-200/70 mb-4">Dodaj prvu zmiju da krenemo.</p>
          <button onClick={onAddSnake} className="btn-primary">
            <Icon.Plus className="w-4 h-4" /> Dodaj zmiju
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {snakes.map((s) => (
            <SnakeCard key={s.id} snake={s} onOpen={() => onOpenSnake(s.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
