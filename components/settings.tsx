"use client"

import { useState } from "react"
import { Shield, Bell, Clock, Lock, Eye, Database, Zap, Wifi, Monitor, HardDrive, X } from "lucide-react"

interface SettingsProps {
  onNavigate: (screen: "dashboard" | "terminal" | "settings") => void
}

export default function Settings({ onNavigate }: SettingsProps) {
  const [activeTab, setActiveTab] = useState("security")

  return (
    <div className="h-full bg-gray-950 flex">
      {/* Settings sidebar */}
      <div className="w-56 bg-gray-900 border-r border-gray-800 p-4">
        <h2 className="text-gray-300 font-medium mb-4">Settings</h2>

        <div className="space-y-1">
          {[
            { id: "security", label: "Security", icon: Shield },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "scanning", label: "Scanning", icon: Clock },
            { id: "privacy", label: "Privacy", icon: Eye },
            { id: "firewall", label: "Firewall", icon: Lock },
            { id: "database", label: "Database", icon: Database },
            { id: "performance", label: "Performance", icon: Zap },
            { id: "network", label: "Network", icon: Wifi },
            { id: "display", label: "Display", icon: Monitor },
            { id: "storage", label: "Storage", icon: HardDrive },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "security" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-200 mb-1">Security Settings</h1>
            <p className="text-gray-500 mb-6">Configure your security preferences</p>

            <div className="space-y-6">
              {/* Protection Level */}
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <h3 className="text-gray-200 font-medium mb-4">Protection Level</h3>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "standard", label: "Standard", description: "Balanced protection for everyday use" },
                    { id: "high", label: "High", description: "Enhanced protection with additional scanning" },
                    { id: "maximum", label: "Maximum", description: "Maximum security with performance impact" },
                  ].map((level) => (
                    <div
                      key={level.id}
                      className={`border rounded-lg p-4 cursor-pointer ${
                        level.id === "high" ? "border-cyan-500 bg-cyan-500/10" : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 border-2 ${
                            level.id === "high" ? "border-cyan-500 bg-cyan-500" : "border-gray-600"
                          }`}
                        >
                          {level.id === "high" && <div className="w-2 h-2 bg-gray-900 rounded-full m-0.5"></div>}
                        </div>
                        <span className={`font-medium ${level.id === "high" ? "text-cyan-400" : "text-gray-300"}`}>
                          {level.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{level.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <h3 className="text-gray-200 font-medium mb-4">Security Features</h3>

                <div className="space-y-4">
                  {[
                    {
                      id: "realtime",
                      label: "Real-time Protection",
                      description: "Continuously monitor for threats",
                      enabled: true,
                    },
                    {
                      id: "behavior",
                      label: "Behavior Analysis",
                      description: "Detect threats based on behavior patterns",
                      enabled: true,
                    },
                    {
                      id: "ransomware",
                      label: "Ransomware Protection",
                      description: "Prevent ransomware file encryption",
                      enabled: true,
                    },
                    {
                      id: "exploit",
                      label: "Exploit Protection",
                      description: "Block exploit attempts on applications",
                      enabled: false,
                    },
                    {
                      id: "webcam",
                      label: "Webcam Protection",
                      description: "Control access to your webcam",
                      enabled: false,
                    },
                  ].map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between">
                      <div>
                        <div className="text-gray-200 text-sm font-medium">{feature.label}</div>
                        <div className="text-gray-500 text-xs">{feature.description}</div>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 ${feature.enabled ? "bg-cyan-500" : "bg-gray-700"}`}>
                        <div
                          className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                            feature.enabled ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <h3 className="text-gray-200 font-medium mb-4">Scan Exclusions</h3>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Excluded Files and Folders</div>
                  <div className="space-y-2">
                    {["C:\\Program Files\\Development\\cache", "D:\\Backups\\system_backup.img"].map((path, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                        <span className="text-gray-300 text-sm font-mono">{path}</span>
                        <button className="text-gray-500 hover:text-red-400">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded flex items-center gap-1">
                  <span>Add Exclusion</span>
                </button>
              </div>

              {/* Advanced Settings */}
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <h3 className="text-gray-200 font-medium mb-4">Advanced Settings</h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Scan Archive Files</div>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-gray-300">
                      <option>Always</option>
                      <option>Only small archives</option>
                      <option>Never</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">Threat Detection Level</div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Standard</span>
                      <span>Moderate</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-200 text-sm font-medium">Cloud-based Detection</div>
                      <div className="text-gray-500 text-xs">Use cloud services to improve detection</div>
                    </div>
                    <div className="w-12 h-6 rounded-full p-1 bg-cyan-500">
                      <div className="w-4 h-4 rounded-full bg-white transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "security" && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl text-gray-400 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
              </h2>
              <p className="text-gray-600">This settings panel is not implemented in the demo.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

