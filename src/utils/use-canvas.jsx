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
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [cursor, setCursor] = useState("default")

  // Update cursor based on active tool
  useEffect(() => {
    switch (activeTool) {
      case "hand":
        setCursor(isPanning ? "grabbing" : "grab")
        break
      case "eraser":
        setCursor("crosshair")
        break
      case "select":
        setCursor("default")
        break
      case "draw":
        setCursor("crosshair")
        break
      default:
        setCursor("crosshair")
    }
  }, [activeTool, isPanning])

  const addElement = (element) => {
    setElements((prev) => [...prev, element])
  }

  const updateElement = (id, updates) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }

  const getElementAtPosition = (x, y, elements) => {
    return elements
      .slice()
      .reverse()
      .find((el) => {
        if (el.type === "pencil") {
          const point = el.points.find(p => 
            Math.abs(p.x - x) < 5 && Math.abs(p.y - y) < 5
          )
          return point !== undefined
        }

        const right = el.x + (el.width || 0)
        const bottom = el.y + (el.height || 0)
        return x >= el.x && x <= right && y >= el.y && y <= bottom
      })
  }

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent
    const adjustedX = offsetX - panOffset.x
    const adjustedY = offsetY - panOffset.y

    if (activeTool === "hand") {
      setIsPanning(true)
      setPanStart({ x: e.clientX, y: e.clientY })
      setCursor("grabbing")
      return
    }

    if (activeTool === "eraser") {
      const clickedElement = getElementAtPosition(adjustedX, adjustedY, elements)
      if (clickedElement) {
        setElements((prev) => prev.filter((e) => e.id !== clickedElement.id))
      }
      return
    }

    if (activeTool === "draw") {
      const newElement = {
        id: Date.now(),
        type: "pencil",
        points: [{ x: adjustedX, y: adjustedY }],
        color,
        locked: false
      }
      addElement(newElement)
      setSelectedElement(newElement)
      setIsDragging(true)
      return
    }

    if (activeTool === "select") {
      const clickedElement = getElementAtPosition(adjustedX, adjustedY, elements)
      if (clickedElement && !clickedElement.locked) {
        setSelectedElement(clickedElement)
        setIsDragging(true)
        setStartPosition({ 
          x: adjustedX - clickedElement.x, 
          y: adjustedY - clickedElement.y 
        })
      }
      return
    }

    // Handle shape creation
    if (["rectangle", "circle", "rhombus", "line", "triangle"].includes(activeTool)) {
      setStartPosition({ x: adjustedX, y: adjustedY })
      const newElement = {
        id: Date.now(),
        type: activeTool,
        x: adjustedX,
        y: adjustedY,
        width: 0,
        height: 0,
        color,
        locked: false,
      }
      addElement(newElement)
      setSelectedElement(newElement)
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent
    const adjustedX = offsetX - panOffset.x
    const adjustedY = offsetY - panOffset.y

    if (isPanning && activeTool === "hand") {
      const dx = e.clientX - panStart.x
      const dy = e.clientY - panStart.y
      setPanOffset((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }))
      setPanStart({ x: e.clientX, y: e.clientY })
      return
    }

    if (!isDragging || !selectedElement) return

    if (selectedElement.locked) {
      setIsDragging(false)
      setSelectedElement(null)
      return
    }

    if (selectedElement.type === "pencil") {
      updateElement(selectedElement.id, {
        points: [...selectedElement.points, { x: adjustedX, y: adjustedY }]
      })
      return
    }

    if (activeTool === "select") {
      updateElement(selectedElement.id, {
        x: adjustedX - startPosition.x,
        y: adjustedY - startPosition.y,
      })
    } else {
      const width = adjustedX - startPosition.x
      const height = adjustedY - startPosition.y

      updateElement(selectedElement.id, {
        width: Math.abs(width),
        height: Math.abs(height),
        x: width < 0 ? adjustedX : startPosition.x,
        y: height < 0 ? adjustedY : startPosition.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsPanning(false)
    setSelectedElement(null)
    setStartPosition(null)
    setCursor(activeTool === "hand" ? "grab" : "default")
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
    panOffset,
    cursor,
  }
}