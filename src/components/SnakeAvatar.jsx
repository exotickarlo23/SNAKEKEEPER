import { Icon } from './Icons'

export function SnakeAvatar({ snake, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl',
    xl: 'w-32 h-32 text-4xl',
  }
  const dim = sizes[size] || sizes.md
  const initial = (snake.name || '?').trim().charAt(0).toUpperCase()

  if (snake.image) {
    return (
      <img
        src={snake.image}
        alt={snake.name}
        className={`${dim} rounded-2xl object-cover border border-reptile-700 ${className}`}
      />
    )
  }
  return (
    <div
      className={`${dim} rounded-2xl bg-gradient-to-br from-reptile-700 to-reptile-900 border border-reptile-700 flex items-center justify-center font-bold text-reptile-50 ${className}`}
    >
      {initial !== '?' ? initial : <Icon.Snake className="w-1/2 h-1/2 text-reptile-300" />}
    </div>
  )
}
