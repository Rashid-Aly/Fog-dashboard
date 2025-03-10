"use client"

import { Clock } from "lucide-react"

interface TaskbarProps {
  activeWindow: string
  minimizedWindows: string[]
  onWindowSelect: (windowId: string) => void
}

export default function Taskbar({ activeWindow, minimizedWindows, onWindowSelect }: TaskbarProps) {
  const windows = [
    { id: "dashboard", title: "System Dashboard" },
    { id: "database", title: "Database Explorer" },
    { id: "terminal", title: "Terminal" },
    { id: "settings", title: "System Settings" },
  ]

  return (
    <div className="h-12 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 flex items-center px-4 justify-between">
      <div className="flex items-center gap-1">
        <button className="w-10 h-10 rounded flex items-center justify-center hover:bg-white/10">
          <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">F</span>
          </div>
        </button>

        <div className="h-6 mx-2 w-px bg-gray-700"></div>

        <div className="flex gap-1">
          {windows.map((window) => (
            <button
              key={window.id}
              className={`h-10 px-3 rounded flex items-center text-sm ${
                activeWindow === window.id
                  ? "bg-white/15 text-white"
                  : minimizedWindows.includes(window.id)
                    ? "text-gray-400 hover:bg-white/10 hover:text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => onWindowSelect(window.id)}
            >
              {window.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-300">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-xs">Connected</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span className="text-xs">15:45</span>
        </div>
      </div>
    </div>
  )
}

