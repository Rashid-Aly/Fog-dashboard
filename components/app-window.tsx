"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { Maximize2, Minimize2, X } from "lucide-react"

interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

interface AppWindowProps {
  id: string
  title: string
  children: ReactNode
  isActive: boolean
  initialPosition: Position
  initialSize: Size
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onClick: () => void
}

export default function AppWindow({
  id,
  title,
  children,
  isActive,
  initialPosition,
  initialSize,
  onClose,
  onMinimize,
  onMaximize,
  onClick,
}: AppWindowProps) {
  const [position, setPosition] = useState<Position>(initialPosition)
  const [size, setSize] = useState<Size>(initialSize)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })

  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={windowRef}
      className={`absolute rounded-lg overflow-hidden shadow-2xl transition-shadow ${
        isActive ? "shadow-cyan-500/20 ring-1 ring-cyan-500/30" : "shadow-black/20"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isActive ? 10 : 5,
      }}
      onClick={onClick}
    >
      {/* Window Title Bar */}
      <div
        className={`h-9 flex items-center justify-between px-3 ${isActive ? "bg-gray-800" : "bg-gray-800/70"}`}
        onMouseDown={handleMouseDown}
      >
        <div className="text-sm font-medium text-gray-200 truncate">{title}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="text-gray-400 hover:text-gray-200"
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            className="text-gray-400 hover:text-gray-200"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="text-gray-400 hover:text-red-400"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className={`h-[calc(100%-2.25rem)] ${isActive ? "bg-gray-900/95" : "bg-gray-900/80"} backdrop-blur-sm`}>
        {children}
      </div>
    </div>
  )
}

