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
    panOffset,
    cursor,
  } = useCanvas()

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Grid background with lowest z-index */}
      <div className="absolute inset-0 bg-[radial-gradient(#666_1px,transparent_1px)] [background-size:16px_16px] opacity-25 z-[1]" />

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

      {/* Canvas area with middle z-index */}
      <div className="w-full h-screen overflow-hidden relative z-[2]">
        <div
          ref={canvasRef}
          className="w-full h-full relative"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
            cursor: cursor,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {elements.map((element) => {
            if (element.type === "pencil") {
              return (
                <svg
                  key={element.id}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 2 }}
                >
                  <polyline
                    points={element.points.map(p => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke={element.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )
            }

            if (element.type === "triangle") {
              const points = `${element.x + element.width/2},${element.y} ${element.x},${element.y + element.height} ${element.x + element.width},${element.y + element.height}`
              return (
                <svg
                  key={element.id}
                  className="absolute"
                  style={{
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 2,
                    cursor: activeTool === "select" && !element.locked ? "move" : "default",
                  }}
                >
                  <polygon
                    points={points}
                    fill="none"
                    stroke={element.color}
                    strokeWidth="2"
                  />
                </svg>
              )
            }

            if (element.type === "text") {
              return (
                <div
                  key={element.id}
                  className="absolute cursor-move"
                  style={{
                    left: element.x,
                    top: element.y,
                    zIndex: 3,
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
                    zIndex: 2,
                    cursor: activeTool === "select" && !element.locked ? "move" : "default",
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
                    zIndex: 2,
                    cursor: activeTool === "select" && !element.locked ? "move" : "default",
                  }}
                />
              )
            }

            if (element.type === "rhombus") {
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
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    zIndex: 2,
                    cursor: activeTool === "select" && !element.locked ? "move" : "default",
                  }}
                />
              )
            }

            if (element.type === "line") {
              return (
                <div
                  key={element.id}
                  className="absolute"
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    zIndex: 2,
                    cursor: activeTool === "select" && !element.locked ? "move" : "default",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "2px",
                      backgroundColor: element.color,
                      transform: `rotate(${Math.atan2(element.height, element.width) * (180 / Math.PI)}deg)`,
                      transformOrigin: "0 0",
                    }}
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>

      {/* Zoom controls with highest z-index */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-neutral-900 rounded-lg px-2 py-1 flex items-center gap-2 shadow-xl border border-neutral-800 z-[10]">
        <button className="p-1 text-neutral-400 hover:text-neutral-200">-</button>
        <span className="text-sm text-neutral-400">100%</span>
        <button className="p-1 text-neutral-400 hover:text-neutral-200">+</button>
      </div>
    </div>
  )
}