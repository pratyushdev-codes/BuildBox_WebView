"use client"

export default function ColorPicker({ color, onChange }) {
  const colors = [
    '#FFFFFF',
    '#A855F7',
    '#EC4899',
    '#EAB308',
    '#EF4444',
    '#6366F1',
    '#F97316',
  ]

  return (
    <div className="flex gap-1 p-2 bg-neutral-900 rounded-lg border border-neutral-800">
      {colors.map((c) => (
        <button
          key={c}
          className={`w-6 h-6 rounded-full border-2 ${color === c ? "border-purple-400" : "border-transparent"}`}
          style={{ backgroundColor: c }}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  )
}

