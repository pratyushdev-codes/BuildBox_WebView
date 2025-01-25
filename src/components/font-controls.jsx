"use client"

export default function FontControls({ fontSize, fontFamily, onFontSizeChange, onFontFamilyChange }) {
  const fonts = ["Arial", "Times New Roman", "Courier New", "Georgia", "Verdana", "Helvetica"]

  const sizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]

  return (
    <div className="flex gap-2">
      <select
        value={fontFamily}
        onChange={(e) => onFontFamilyChange(e.target.value)}
        className="bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-md px-2 py-1"
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      <select
        value={fontSize}
        onChange={(e) => onFontSizeChange(Number(e.target.value))}
        className="bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-md px-2 py-1"
      >
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  )
}

