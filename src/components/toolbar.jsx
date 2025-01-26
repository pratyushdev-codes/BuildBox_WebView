"use client"
import { TextCursorIcon as Cursor, Square, Circle, Type, Pencil, Move, Minus, Lock, Hand, Share2, Library, Eraser, Triangle, Diamond } from "lucide-react"
import ColorPicker from "./color-picker"
import FontControls from "./font-controls"
import { useState } from "react"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

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
    <div className="fixed top-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 z-10 bg-neutral-900 md:rounded-lg py-2 shadow-xl border-b md:border border-neutral-800 overflow-x-auto md:overflow-visible md:top-4">
      <div className="flex items-center">
        {/* Main Toolbar Container */}
        <div className="flex items-center gap-1 px-2 md:px-0 flex-grow">
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
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden px-2">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-neutral-400 hover:bg-neutral-800 p-2 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Extended Controls - Desktop */}
        <div className="hidden md:flex items-center">
          <div className="w-px h-6 bg-neutral-800 mx-1" />
          {/* Color Picker */}
          <div className="px-2 relative">
            <button 
              onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
              className="p-2 hover:bg-neutral-800 rounded-md transition-colors"
              style={{ backgroundColor: color === '#FFFFFF' ? 'transparent' : color }}
            >
              <div 
                className="w-5 h-5 rounded-full border border-neutral-600"
                style={{ 
                  backgroundColor: color,
                  border: color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none'
                }} 
              />
            </button>
            {isColorDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 z-20">
                <ColorPicker color={color} onChange={(newColor) => {
                  setColor(newColor);
                  setIsColorDropdownOpen(false);
                }} />
              </div>
            )}
          </div>
          <div className="w-px h-6 bg-neutral-800 mx-1" />
          {/* Font Controls */}
          <div className="px-2 lg:flex hidden">
            <FontControls
              fontSize={fontSize}
              fontFamily={fontFamily}
              onFontSizeChange={setFontSize}
              onFontFamilyChange={setFontFamily}
            />
          </div>
          <div className="w-px h-6 bg-neutral-800 mx-1 lg:block hidden" />
          {/* Effects Button */}
          <div className="px-2">
            <button className="p-2 hover:bg-neutral-800 rounded-md transition-colors text-neutral-400 shadow-purple-800">
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
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-4 shadow-lg">
          <div className="flex flex-col gap-4">
            {/* Color Picker */}
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Color</span>
              <ColorPicker color={color} onChange={setColor} />
            </div>
            {/* Font Controls */}
            <div className="flex flex-col gap-2">
              <span className="text-neutral-400">Text</span>
              <FontControls
                fontSize={fontSize}
                fontFamily={fontFamily}
                onFontSizeChange={setFontSize}
                onFontFamilyChange={setFontFamily}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}