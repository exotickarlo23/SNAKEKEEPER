import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export function WeightChart({ weights }) {
  if (!weights.length) {
    return (
      <div className="card p-6 text-center text-reptile-200/60 text-sm">
        Još nema unosa težine. Dodaj prvi unos da vidiš graf.
      </div>
    )
  }

  const data = [...weights]
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((w) => ({ date: w.date.slice(5), grams: w.grams, full: w.date }))

  const min = Math.min(...data.map((d) => d.grams))
  const max = Math.max(...data.map((d) => d.grams))
  const pad = Math.max(10, Math.round((max - min) * 0.15))

  return (
    <div className="card p-4">
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#164824" />
            <XAxis dataKey="date" stroke="#9dc9a8" tick={{ fill: '#9dc9a8', fontSize: 11 }} />
            <YAxis
              stroke="#9dc9a8"
              tick={{ fill: '#9dc9a8', fontSize: 11 }}
              domain={[Math.max(0, min - pad), max + pad]}
              width={48}
            />
            <Tooltip
              contentStyle={{
                background: '#0a2113',
                border: '1px solid #1d5d2f',
                borderRadius: 12,
                color: '#eaf4ec',
              }}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.full || ''}
              formatter={(v) => [`${v} g`, 'Težina']}
            />
            <Line
              type="monotone"
              dataKey="grams"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
