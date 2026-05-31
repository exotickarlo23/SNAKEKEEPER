import { useState } from 'react'
import { Icon } from '../Icons'
import { SnakeAvatar } from '../SnakeAvatar'

export function SnakeForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || '')
  const [species, setSpecies] = useState(initial?.species || '')
  const [acquiredDate, setAcquiredDate] = useState(initial?.acquiredDate || '')
  const [image, setImage] = useState(initial?.image || null)

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const max = 512
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        setImage(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(f)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({ name: name.trim(), species: species.trim(), acquiredDate, image })
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex flex-col items-center gap-3">
        <SnakeAvatar snake={{ name, image }} size="xl" />
        <label className="btn-secondary cursor-pointer">
          <Icon.Camera className="w-4 h-4" />
          {image ? 'Promijeni sliku' : 'Dodaj sliku'}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
        {image && (
          <button type="button" onClick={() => setImage(null)} className="text-xs text-reptile-200/70 hover:text-red-300">
            Ukloni sliku
          </button>
        )}
      </div>

      <div>
        <label className="label">Ime</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="npr. Loki"
          autoFocus
        />
      </div>

      <div>
        <label className="label">Vrsta</label>
        <input
          className="input"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder="npr. Ball Python (Python regius)"
        />
      </div>

      <div>
        <label className="label">Datum nabave</label>
        <input
          type="date"
          className="input"
          value={acquiredDate}
          onChange={(e) => setAcquiredDate(e.target.value)}
        />
      </div>

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
