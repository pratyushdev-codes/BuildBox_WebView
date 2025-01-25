"use client"

import { useState } from "react"
import Toolbar from "./toolbar"
import Sidebar from "./sidebar"
import { useCanvas } from "@/utils/use-canvas"

export default function Whiteboard() {
  const {
    canvasRef,
    elements,
    activeTool,
    setActiveTool,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    color,
    setColor,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    selectedElement,
  } = useCanvas()

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-hidden">
      <Sidebar />
      <Toolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        color={color}
        setColor={setColor}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
      />

      <div className="w-full h-screen overflow-hidden">
        <div
          ref={canvasRef}
          className="w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {elements.map((element) => {
            if (element.type === "text") {
              return (
                <div
                  key={element.id}
                  className="absolute cursor-move"
                  style={{
                    left: element.x,
                    top: element.y,
                  }}
                >
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="min-w-[50px] min-h-[20px] outline-none"
                    style={{
                      color: element.color,
                      fontSize: `${element.fontSize}px`,
                      fontFamily: element.fontFamily,
                    }}
                  >
                    {element.text}
                  </div>
                </div>
              )
            }

            if (element.type === "rectangle") {
              return (
                <div
                  key={element.id}
                  className="absolute border-2"
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    borderColor: element.color,
                  }}
                />
              )
            }

            if (element.type === "circle") {
              return (
                <div
                  key={element.id}
                  className="absolute border-2 rounded-full"
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    borderColor: element.color,
                  }}
                />
              )
            }

            return null
          })}
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-neutral-900 rounded-lg px-2 py-1 flex items-center gap-2 shadow-xl border border-neutral-800">
        <button className="p-1 text-neutral-400 hover:text-neutral-200">-</button>
        <span className="text-sm text-neutral-400">100%</span>
        <button className="p-1 text-neutral-400 hover:text-neutral-200">+</button>
      </div>
    </div>
  )
}

