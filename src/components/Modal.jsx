import { useEffect } from 'react'
import { Icon } from './Icons'

export function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md card border-reptile-700 shadow-2xl rounded-b-none sm:rounded-2xl max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-reptile-800">
          <h2 className="text-lg font-semibold text-reptile-50">{title}</h2>
          <button onClick={onClose} className="btn-ghost !p-2" aria-label="Zatvori">
            <Icon.Close className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">{children}</div>
        {footer && <div className="p-4 border-t border-reptile-800 safe-bottom">{footer}</div>}
      </div>
    </div>
  )
}
