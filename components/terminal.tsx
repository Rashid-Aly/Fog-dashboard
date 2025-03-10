"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, X, Save, Copy, Download } from "lucide-react"

interface TerminalProps {
  onNavigate: (screen: "dashboard" | "terminal" | "settings") => void
}

export default function Terminal({ onNavigate }: TerminalProps) {
  const [logs, setLogs] = useState<
    { timestamp: string; message: string; type: "input" | "output" | "error" | "warning" | "success" }[]
  >([
    { timestamp: "15:30:05", message: "FOG Security Terminal v3.5.2", type: "output" },
    { timestamp: "15:30:05", message: 'Type "help" for available commands', type: "output" },
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when logs update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  // Handle command input
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user input to logs
    const newLogs = [...logs, { timestamp: getCurrentTime(), message: input, type: "input" }]
    setLogs(newLogs)

    // Process command
    processCommand(input, newLogs)

    // Clear input
    setInput("")
  }

  // Get current time in HH:MM:SS format
  const getCurrentTime = () => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
  }

  // Process command and add response to logs
  const processCommand = (cmd: string, currentLogs: typeof logs) => {
    const command = cmd.trim().toLowerCase()
    const time = getCurrentTime()

    switch (command) {
      case "help":
        setLogs([
          ...currentLogs,
          { timestamp: time, message: "Available commands:", type: "output" },
          { timestamp: time, message: "  help - Show this help message", type: "output" },
          { timestamp: time, message: "  scan - Run security scan", type: "output" },
          { timestamp: time, message: "  status - Show system status", type: "output" },
          { timestamp: time, message: "  clear - Clear terminal", type: "output" },
          { timestamp: time, message: "  threats - List recent threats", type: "output" },
          { timestamp: time, message: "  firewall - Firewall status", type: "output" },
          { timestamp: time, message: "  exit - Return to dashboard", type: "output" },
        ])
        break

      case "scan":
        setLogs([...currentLogs, { timestamp: time, message: "Initiating security scan...", type: "output" }])

        // Simulate scan progress
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          if (progress <= 100) {
            setLogs((prev) => [
              ...prev,
              {
                timestamp: getCurrentTime(),
                message: `Scanning system... ${progress}%`,
                type: "output",
              },
            ])
          }

          if (progress === 100) {
            clearInterval(interval)
            setLogs((prev) => [
              ...prev,
              { timestamp: getCurrentTime(), message: "Scan complete.", type: "output" },
              { timestamp: getCurrentTime(), message: "Results: 0 critical, 1 warning, 0 errors", type: "warning" },
              {
                timestamp: getCurrentTime(),
                message: "Warning: Outdated security definitions (last updated 3 days ago)",
                type: "warning",
              },
            ])
          }
        }, 500)
        break

      case "status":
        setLogs([
          ...currentLogs,
          { timestamp: time, message: "System Status:", type: "output" },
          { timestamp: time, message: "  Security Level: High", type: "success" },
          { timestamp: time, message: "  Firewall: Active", type: "success" },
          { timestamp: time, message: "  Malware Protection: Active", type: "success" },
          { timestamp: time, message: "  Network Monitor: Active", type: "success" },
          { timestamp: time, message: "  Last Scan: 2 hours ago", type: "output" },
          { timestamp: time, message: "  Threats Detected (24h): 3", type: "warning" },
          { timestamp: time, message: "  System Load: 42%", type: "output" },
        ])
        break

      case "clear":
        setLogs([{ timestamp: time, message: "Terminal cleared.", type: "output" }])
        break

      case "threats":
        setLogs([
          ...currentLogs,
          { timestamp: time, message: "Recent Threats (Last 24h):", type: "output" },
          { timestamp: time, message: "  [15:42] Malware detected from 192.168.1.105 - BLOCKED", type: "error" },
          {
            timestamp: time,
            message: "  [13:27] Suspicious login attempt from admin@company.com - FLAGGED",
            type: "warning",
          },
          { timestamp: time, message: "  [09:15] Port scan from 45.33.102.67 - BLOCKED", type: "error" },
        ])
        break

      case "firewall":
        setLogs([
          ...currentLogs,
          { timestamp: time, message: "Firewall Status: ACTIVE", type: "success" },
          { timestamp: time, message: "Mode: Intelligent Filtering", type: "output" },
          { timestamp: time, message: "Blocked Connections (24h): 47", type: "output" },
          { timestamp: time, message: "Last Rule Update: Today, 09:15", type: "output" },
        ])
        break

      case "exit":
        onNavigate("dashboard")
        break

      default:
        setLogs([
          ...currentLogs,
          {
            timestamp: time,
            message: `Unknown command: ${command}. Type "help" for available commands.`,
            type: "error",
          },
        ])
    }
  }

  return (
    <div className="h-full bg-gray-950 flex flex-col">
      {/* Terminal header */}
      <div className="bg-gray-900 border-b border-gray-800 p-3 flex justify-between items-center">
        <div className="text-gray-300 font-medium">Security Terminal</div>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-200 p-1">
            <Save size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-1">
            <Copy size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-1">
            <Download size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-200 p-1">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Terminal output */}
      <div className="flex-1 bg-gray-950 p-4 font-mono text-sm overflow-auto">
        {logs.map((log, index) => (
          <div key={index} className="mb-1 flex">
            <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
            {log.type === "input" ? (
              <span className="text-cyan-400">$ {log.message}</span>
            ) : log.type === "error" ? (
              <span className="text-red-400">{log.message}</span>
            ) : log.type === "warning" ? (
              <span className="text-yellow-400">{log.message}</span>
            ) : log.type === "success" ? (
              <span className="text-green-400">{log.message}</span>
            ) : (
              <span className="text-gray-300">{log.message}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal input */}
      <form onSubmit={handleCommand} className="border-t border-gray-800 p-2 flex">
        <span className="text-cyan-400 font-mono mr-2 pt-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-gray-300 font-mono"
          placeholder="Type command..."
          autoFocus
        />
        <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded">
          <Play size={14} />
        </button>
      </form>
    </div>
  )
}

