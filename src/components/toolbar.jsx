"use client"

import { TextCursorIcon as Cursor, Square, Circle, Type, Pencil, Move, Minus, Lock, Hand, Share2, Library, Eraser, Triangle, Diamond } from "lucide-react"
import ColorPicker from "./color-picker"
import FontControls from "./font-controls"

export default function Toolbar({
  activeTool,
  setActiveTool,
  color,
  setColor,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
}) {
  const tools = [
    { icon: Lock, name: "lock" },
    { icon: Hand, name: "hand" },
    { icon: Cursor, name: "select" },
    { icon: Square, name: "rectangle" },
    { icon: Circle, name: "circle" },
    { icon: Diamond, name: "rhombus" },
    { icon: Triangle, name: "triangle" },
    { icon: Minus, name: "line" },
    { icon: Type, name: "text" },
    { icon: Pencil, name: "draw" },
    { icon: Eraser, name: "eraser" },
  ]

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 bg-neutral-900 rounded-lg px-2 py-2 flex items-center gap-2 shadow-xl border border-neutral-800">
      {tools.map((tool) => (
        <button
          key={tool.name}
          onClick={() => setActiveTool(tool.name)}
          className={`p-2 hover:bg-neutral-800 rounded-md transition-colors ${
            activeTool === tool.name ? "bg-neutral-800 text-purple-400" : "text-neutral-400"
          }`}
        >
          <tool.icon className="w-5 h-5" />
        </button>
      ))}

      <div className="w-px h-6 bg-neutral-800 mx-1" />

      <ColorPicker color={color} onChange={setColor} />

      <div className="w-px h-6 bg-neutral-800 mx-1" />

      <FontControls
        fontSize={fontSize}
        fontFamily={fontFamily}
        onFontSizeChange={setFontSize}
        onFontFamilyChange={setFontFamily}
      />

      <div className="w-px h-6 bg-neutral-800 mx-1" />

      <button className="p-2 hover:bg-neutral-800 rounded-md transition-colors text-neutral-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" className="size-5">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4371D4" />
              <stop offset="100%" stopColor="#E27873" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#gradient)" 
            fillRule="evenodd" 
            d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" 
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}