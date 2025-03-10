"use client"

import { useState } from "react"
import Taskbar from "./taskbar"
import AppWindow from "./app-window"
import DesktopIcon from "./desktop-icon"

export default function WindowsDesktop() {
  const [activeWindow, setActiveWindow] = useState("dashboard")
  const [minimized, setMinimized] = useState<string[]>([])

  const toggleMinimize = (windowId: string) => {
    if (minimized.includes(windowId)) {
      setMinimized(minimized.filter((id) => id !== windowId))
      setActiveWindow(windowId)
    } else {
      setMinimized([...minimized, windowId])
    }
  }

  const openWindow = (windowId: string) => {
    setActiveWindow(windowId)
    setMinimized(minimized.filter((id) => id !== windowId))
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden flex flex-col">
      <div className="flex-1 relative p-4">
        {/* Desktop Icons */}
        <div className="grid grid-cols-1 gap-6 w-24">
          <DesktopIcon icon="database" label="Database" onClick={() => openWindow("database")} />
          <DesktopIcon icon="settings" label="Settings" onClick={() => openWindow("settings")} />
          <DesktopIcon icon="terminal" label="Terminal" onClick={() => openWindow("terminal")} />
          <DesktopIcon icon="folder" label="Projects" onClick={() => openWindow("projects")} />
        </div>

        {/* Windows */}
        {!minimized.includes("dashboard") && (
          <AppWindow
            id="dashboard"
            title="System Dashboard"
            isActive={activeWindow === "dashboard"}
            onClose={() => toggleMinimize("dashboard")}
            onMinimize={() => toggleMinimize("dashboard")}
            onMaximize={() => {}}
            onClick={() => setActiveWindow("dashboard")}
            initialPosition={{ x: 100, y: 50 }}
            initialSize={{ width: 800, height: 500 }}
          >
            <DashboardContent />
          </AppWindow>
        )}

        {!minimized.includes("database") && (
          <AppWindow
            id="database"
            title="Database Explorer"
            isActive={activeWindow === "database"}
            onClose={() => toggleMinimize("database")}
            onMinimize={() => toggleMinimize("database")}
            onMaximize={() => {}}
            onClick={() => setActiveWindow("database")}
            initialPosition={{ x: 150, y: 100 }}
            initialSize={{ width: 750, height: 480 }}
          >
            <DatabaseContent />
          </AppWindow>
        )}

        {!minimized.includes("terminal") && (
          <AppWindow
            id="terminal"
            title="Terminal"
            isActive={activeWindow === "terminal"}
            onClose={() => toggleMinimize("terminal")}
            onMinimize={() => toggleMinimize("terminal")}
            onMaximize={() => {}}
            onClick={() => setActiveWindow("terminal")}
            initialPosition={{ x: 200, y: 150 }}
            initialSize={{ width: 700, height: 400 }}
          >
            <TerminalContent />
          </AppWindow>
        )}

        {!minimized.includes("settings") && (
          <AppWindow
            id="settings"
            title="System Settings"
            isActive={activeWindow === "settings"}
            onClose={() => toggleMinimize("settings")}
            onMinimize={() => toggleMinimize("settings")}
            onMaximize={() => {}}
            onClick={() => setActiveWindow("settings")}
            initialPosition={{ x: 250, y: 120 }}
            initialSize={{ width: 650, height: 450 }}
          >
            <SettingsContent />
          </AppWindow>
        )}
      </div>

      {/* Taskbar */}
      <Taskbar activeWindow={activeWindow} minimizedWindows={minimized} onWindowSelect={openWindow} />
    </div>
  )
}

function DashboardContent() {
  return (
    <div className="p-4 h-full">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h3 className="text-cyan-400 font-medium mb-2">System Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">CPU Usage</span>
              <div className="w-32 bg-gray-700 rounded-full h-2.5">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Memory</span>
              <div className="w-32 bg-gray-700 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Storage</span>
              <div className="w-32 bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h3 className="text-cyan-400 font-medium mb-2">Network Activity</h3>
          <div className="h-24 flex items-end justify-between gap-1">
            {[35, 45, 25, 60, 75, 50, 40, 55, 70, 65].map((value, i) => (
              <div key={i} className="bg-cyan-500/70 w-full rounded-t" style={{ height: `${value}%` }}></div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h3 className="text-cyan-400 font-medium mb-2">Recent Alerts</h3>
        <div className="space-y-2">
          {[
            { time: "09:45", message: "System update available", level: "info" },
            { time: "08:30", message: "Unusual network activity detected", level: "warning" },
            { time: "07:15", message: "Backup completed successfully", level: "success" },
            { time: "Yesterday", message: "Firewall blocked suspicious connection", level: "error" },
          ].map((alert, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  alert.level === "info"
                    ? "bg-blue-400"
                    : alert.level === "warning"
                      ? "bg-yellow-400"
                      : alert.level === "success"
                        ? "bg-green-400"
                        : "bg-red-400"
                }`}
              ></span>
              <span className="text-gray-400">{alert.time}</span>
              <span className="text-gray-200">{alert.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DatabaseContent() {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <div className="bg-gray-800/70 px-3 py-1.5 rounded text-sm text-cyan-400 border border-gray-700">Connect</div>
        <div className="bg-gray-800/70 px-3 py-1.5 rounded text-sm text-gray-300 border border-gray-700">Query</div>
        <div className="bg-gray-800/70 px-3 py-1.5 rounded text-sm text-gray-300 border border-gray-700">Export</div>
      </div>

      <div className="flex flex-1">
        <div className="w-48 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-2">
          <div className="text-xs text-gray-400 mb-2 px-2">CONNECTIONS</div>
          {["Production DB", "Development DB", "Testing DB", "Analytics DB"].map((db, i) => (
            <div
              key={i}
              className={`px-2 py-1 rounded text-sm mb-1 ${i === 0 ? "bg-cyan-500/20 text-cyan-300" : "text-gray-300 hover:bg-gray-700/50"}`}
            >
              {db}
            </div>
          ))}

          <div className="text-xs text-gray-400 mt-4 mb-2 px-2">TABLES</div>
          {["users", "products", "orders", "analytics", "logs", "settings"].map((table, i) => (
            <div key={i} className="px-2 py-1 rounded text-sm mb-1 text-gray-300 hover:bg-gray-700/50">
              {table}
            </div>
          ))}
        </div>

        <div className="flex-1 ml-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-3">
          <div className="text-xs text-gray-400 mb-2">QUERY RESULTS</div>
          <div className="bg-gray-900/80 rounded border border-gray-700 p-2 h-[calc(100%-2rem)] overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-2 px-3">ID</th>
                  <th className="text-left py-2 px-3">Name</th>
                  <th className="text-left py-2 px-3">Email</th>
                  <th className="text-left py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
                  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
                  { id: 3, name: "Robert Johnson", email: "robert@example.com", status: "Active" },
                  { id: 4, name: "Emily Davis", email: "emily@example.com", status: "Pending" },
                  { id: 5, name: "Michael Wilson", email: "michael@example.com", status: "Active" },
                ].map((user) => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-2 px-3 text-gray-300">{user.id}</td>
                    <td className="py-2 px-3 text-gray-300">{user.name}</td>
                    <td className="py-2 px-3 text-gray-300">{user.email}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          user.status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : user.status === "Inactive"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function TerminalContent() {
  return (
    <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm h-full overflow-auto">
      <div>$ system --version</div>
      <div className="text-gray-400">FOG OS v3.5.2 (build 20240309)</div>
      <div className="mt-2">$ network status</div>
      <div className="text-gray-400">Connected: Ethernet (1 Gbps)</div>
      <div className="text-gray-400">IP: 192.168.1.105</div>
      <div className="text-gray-400">Gateway: 192.168.1.1</div>
      <div className="mt-2">$ process list</div>
      <div className="text-gray-400">PID 1024: system_core (Running)</div>
      <div className="text-gray-400">PID 1045: network_service (Running)</div>
      <div className="text-gray-400">PID 1102: user_interface (Running)</div>
      <div className="text-gray-400">PID 1156: security_monitor (Running)</div>
      <div className="mt-2">$ scan vulnerabilities</div>
      <div className="text-gray-400">Scanning system for vulnerabilities...</div>
      <div className="text-gray-400">Progress: ████████████████████ 100%</div>
      <div className="text-gray-400">No critical vulnerabilities found.</div>
      <div className="text-yellow-400">Warning: 2 low-severity issues detected.</div>
      <div className="text-gray-400">Run 'patch --auto' to resolve.</div>
      <div className="mt-2">$ _</div>
      <div className="animate-pulse">|</div>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="p-4 h-full flex">
      <div className="w-48 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-2">
        <div className="text-xs text-gray-400 mb-2 px-2">SETTINGS</div>
        {[
          "System",
          "Security",
          "Network",
          "Display",
          "Sound",
          "Power",
          "Storage",
          "Updates",
          "Accounts",
          "Privacy",
        ].map((setting, i) => (
          <div
            key={i}
            className={`px-2 py-1 rounded text-sm mb-1 ${i === 0 ? "bg-cyan-500/20 text-cyan-300" : "text-gray-300 hover:bg-gray-700/50"}`}
          >
            {setting}
          </div>
        ))}
      </div>

      <div className="flex-1 ml-4">
        <h2 className="text-lg font-medium text-cyan-400 mb-4">System Settings</h2>

        <div className="space-y-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-200 font-medium">System Theme</h3>
                <p className="text-gray-400 text-sm">Change the appearance of your system</p>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-900 border-2 border-cyan-400 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-cyan-400"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-transparent"></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-200 font-medium">System Sounds</h3>
                <p className="text-gray-400 text-sm">Enable or disable system sound effects</p>
              </div>
              <div className="h-6 w-12 bg-cyan-500 rounded-full flex items-center p-1">
                <div className="h-4 w-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-200 font-medium">Automatic Updates</h3>
                <p className="text-gray-400 text-sm">Keep your system up to date automatically</p>
              </div>
              <div className="h-6 w-12 bg-cyan-500 rounded-full flex items-center p-1">
                <div className="h-4 w-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <div>
              <h3 className="text-gray-200 font-medium mb-2">System Performance</h3>
              <p className="text-gray-400 text-sm mb-3">Adjust for better performance or appearance</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Performance</span>
                <span>Balanced</span>
                <span>Appearance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

