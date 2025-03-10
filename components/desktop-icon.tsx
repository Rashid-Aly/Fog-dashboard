"use client"

import { Database, Folder, Settings, Terminal } from "lucide-react"

interface DesktopIconProps {
  icon: string
  label: string
  onClick: () => void
}

export default function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  const getIcon = () => {
    switch (icon) {
      case "database":
        return <Database className="h-8 w-8 text-cyan-400" />
      case "settings":
        return <Settings className="h-8 w-8 text-purple-400" />
      case "terminal":
        return <Terminal className="h-8 w-8 text-green-400" />
      case "folder":
        return <Folder className="h-8 w-8 text-yellow-400" />
      default:
        return <Folder className="h-8 w-8 text-blue-400" />
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={onClick}>
      <div className="p-2 rounded group-hover:bg-white/10 transition-colors">{getIcon()}</div>
      <span className="text-xs text-white bg-black/50 px-1.5 py-0.5 rounded group-hover:bg-black/70">{label}</span>
    </div>
  )
}

