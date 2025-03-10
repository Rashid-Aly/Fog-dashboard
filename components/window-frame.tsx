"use client"

import type { ReactNode } from "react"
import { Maximize2, Minimize2, X, Shield, Cog, BarChart3, Play, CheckCircle } from "lucide-react"

interface WindowFrameProps {
  title: string
  children: ReactNode
  currentScreen: string
  onNavigate: (screen: "dashboard" | "settings" | "processing" | "completion") => void
}

export default function WindowFrame({ title, children, currentScreen, onNavigate }: WindowFrameProps) {
  return (
    <div className="w-full h-full bg-[#1e1e1e] overflow-hidden border border-[#333333] shadow-2xl shadow-black/30 flex flex-col">
      {/* Title bar */}
      <div className="h-10 bg-[#2d2d2d] flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-[#0078d7]" />
          <span className="text-gray-200 text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center">
          <button className="w-10 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200 hover:bg-[#333333]">
            <Minimize2 size={16} />
          </button>
          <button className="w-10 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200 hover:bg-[#333333]">
            <Maximize2 size={16} />
          </button>
          <button className="w-10 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200 hover:bg-[#E81123]">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - only show when not in loading screen */}
        {currentScreen !== "loading" && (
          <div className="w-[240px] bg-[#252526] border-r border-[#333333] flex flex-col py-2">
            <div className="px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider">Navigation</div>

            <button
              className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                currentScreen === "dashboard" ? "bg-[#0078d7] text-white" : "text-gray-300 hover:bg-[#2a2d2e]"
              }`}
              onClick={() => onNavigate("dashboard")}
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </button>

            <button
              className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                currentScreen === "settings" ? "bg-[#0078d7] text-white" : "text-gray-300 hover:bg-[#2a2d2e]"
              }`}
              onClick={() => onNavigate("settings")}
            >
              <Cog size={18} />
              <span>Settings</span>
            </button>

            <button
              className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                currentScreen === "processing" ? "bg-[#0078d7] text-white" : "text-gray-300 hover:bg-[#2a2d2e]"
              }`}
              onClick={() => onNavigate("processing")}
            >
              <Play size={18} />
              <span>Run Scan</span>
            </button>

            <button
              className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                currentScreen === "completion" ? "bg-[#0078d7] text-white" : "text-gray-300 hover:bg-[#2a2d2e]"
              }`}
              onClick={() => onNavigate("completion")}
            >
              <CheckCircle size={18} />
              <span>Results</span>
            </button>

            <div className="mt-6 px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Recent Scans
            </div>

            {[
              { date: "Today, 10:45 AM", result: "Clean" },
              { date: "Yesterday, 8:30 PM", result: "2 Threats" },
              { date: "Mar 8, 2024, 2:15 PM", result: "Clean" },
            ].map((scan, index) => (
              <div key={index} className="px-4 py-2 hover:bg-[#2a2d2e] cursor-pointer">
                <div className="text-gray-300 text-sm">{scan.date}</div>
                <div className={`text-xs ${scan.result === "Clean" ? "text-green-400" : "text-yellow-400"}`}>
                  {scan.result}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className={`flex-1 ${currentScreen !== "loading" ? "overflow-auto" : ""} bg-[#1e1e1e]`}>{children}</div>
      </div>

      {/* Status bar - only show when not in loading screen */}
      {currentScreen !== "loading" && (
        <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Protected</span>
          </div>
          <div>FOG Security Suite v3.5.2</div>
          <div>Last update: Today, 8:15 AM</div>
        </div>
      )}
    </div>
  )
}

