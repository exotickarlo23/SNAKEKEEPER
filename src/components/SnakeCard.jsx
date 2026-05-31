import { Icon } from './Icons'
import { SnakeAvatar } from './SnakeAvatar'
import { feedingStatus, lastWeight, shedStatus } from '../utils/derived'
import { formatRelative, dayWord } from '../utils/dateUtils'

export function SnakeCard({ snake, onOpen }) {
  const feeding = feedingStatus(snake)
  const shed = shedStatus(snake)
  const weight = lastWeight(snake)

  const feedTone =
    feeding.level === 'alert'
      ? 'bg-red-500/15 text-red-300 border-red-500/30'
      : feeding.level === 'warn'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : 'bg-reptile-700/40 text-reptile-100 border-reptile-700'

  const shedTone =
    shed.tone === 'warn'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : shed.tone === 'info'
      ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
      : 'bg-reptile-700/40 text-reptile-100 border-reptile-700'

  return (
    <button
      onClick={onOpen}
      className="card w-full text-left p-4 hover:border-accent/40 transition group"
    >
      <div className="flex items-center gap-4">
        <SnakeAvatar snake={snake} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-reptile-50 truncate">{snake.name}</h3>
            {feeding.level === 'alert' && (
              <Icon.Warning className="w-5 h-5 text-red-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-reptile-200/70 truncate">{snake.species || 'Vrsta —'}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="Zadnje jelo">
          <span className={`chip border ${feedTone}`}>
            <Icon.Food className="w-3 h-3" />
            {feeding.days == null
              ? 'nikad'
              : feeding.days === 0
              ? 'danas'
              : `${feeding.days}${feeding.days >= 10 ? '!' : ''}d`}
          </span>
        </Stat>
        <Stat label="Shed">
          <span className={`chip border ${shedTone}`}>
            <Icon.Shed className="w-3 h-3" />
            {shed.state === 'normal' ? 'OK' : shed.state === 'blue' ? 'Blue' : 'Loš'}
          </span>
        </Stat>
        <Stat label="Težina">
          <span className="chip border border-reptile-700 bg-reptile-700/40 text-reptile-100">
            <Icon.Weight className="w-3 h-3" />
            {weight ? `${weight.grams}g` : '—'}
          </span>
        </Stat>
      </div>

      {feeding.last && (
        <p
          className={`mt-3 text-sm font-medium ${
            feeding.level === 'alert' ? 'text-red-300' : 'text-reptile-100'
          }`}
        >
          {feeding.level === 'alert' && <span className="mr-1">⚠️</span>}
          Zadnje hranjenje: {formatRelative(feeding.last.date)}
          {feeding.level === 'alert' && (
            <span className="block text-xs text-red-400/80 mt-0.5">
              Više od 10 {dayWord(feeding.days)} — vrijeme za obrok!
            </span>
          )}
        </p>
      )}
    </button>
  )
}

function Stat({ label, children }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-reptile-200/60 mb-1">{label}</div>
      {children}
    </div>
  )
}
