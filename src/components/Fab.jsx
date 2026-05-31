import { Icon } from './Icons'

export function Fab({ onClick, label = 'Brzi unos' }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-accent text-reptile-950 shadow-glow flex items-center justify-center active:scale-95 transition hover:bg-accent-400 safe-bottom"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <Icon.Plus className="w-7 h-7" />
    </button>
  )
}
