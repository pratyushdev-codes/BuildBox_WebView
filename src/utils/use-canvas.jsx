"use client"

import { useState, useRef, useEffect } from "react"

export function useCanvas() {
  const canvasRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [elements, setElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [activeTool, setActiveTool] = useState("select")
  const [startPosition, setStartPosition] = useState(null)
  const [color, setColor] = useState("#000000")
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState("Arial")

  const addElement = (element) => {
    setElements((prev) => [...prev, element])
  }

  const updateElement = (id, updates) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent
    setStartPosition({ x: offsetX, y: offsetY })

    if (activeTool === "text") {
      const newElement = {
        id: Date.now(),
        type: "text",
        x: offsetX,
        y: offsetY,
        text: "Double click to edit",
        color,
        fontSize,
        fontFamily,
      }
      addElement(newElement)
    } else if (activeTool === "rectangle" || activeTool === "circle") {
      const newElement = {
        id: Date.now(),
        type: activeTool,
        x: offsetX,
        y: offsetY,
        width: 0,
        height: 0,
        color,
      }
      addElement(newElement)
      setSelectedElement(newElement)
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedElement || !startPosition) return

    const { offsetX, offsetY } = e.nativeEvent
    const width = offsetX - startPosition.x
    const height = offsetY - startPosition.y

    updateElement(selectedElement.id, {
      width: Math.abs(width),
      height: Math.abs(height),
      x: width < 0 ? offsetX : startPosition.x,
      y: height < 0 ? offsetY : startPosition.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setSelectedElement(null)
    setStartPosition(null)
  }

  return {
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
  }
}

